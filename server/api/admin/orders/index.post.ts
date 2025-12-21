import { db } from '../../../database'
import { orders, orderItems, varietyStock, stockMovements, varieties, rootstocks, sizes, categories, categoryPrices } from '../../../database/schema'
import { eq, and } from 'drizzle-orm'
import { generateOrderNumber } from '../../../utils/orderNumber'

interface OrderItemInput {
  varietyStockId: number
  quantity: number
}

interface OrderInput {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  paymentType: 'cash' | 'invoice'
  discount?: number
  notes?: string
  items: OrderItemInput[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<OrderInput>(event)
  const user = event.context.user

  // Validate input
  if (!body.customerName?.trim()) {
    throw createError({
      statusCode: 400,
      message: 'Klantnaam is verplicht'
    })
  }

  if (!body.items || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Minimaal één artikel is verplicht'
    })
  }

  // Validate payment type
  if (!['cash', 'invoice'].includes(body.paymentType)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldige betaalwijze'
    })
  }

  // Generate order number
  const orderNumber = await generateOrderNumber()

  // Use transaction for atomicity
  return await db.transaction(async (tx) => {
    let subtotal = 0
    let totalItems = 0
    const orderItemsToInsert: Array<{
      orderId: number
      varietyStockId: number
      varietyId: number
      rootstockId: number
      sizeId: number
      varietyName: string
      rootstockName: string
      sizeName: string
      quantity: number
      unitPrice: string
      lineTotal: string
    }> = []

    // Process each item - validate stock and calculate prices
    for (const item of body.items) {
      // Get stock with all related data including price
      const [stockItem] = await tx
        .select({
          id: varietyStock.id,
          stockQuantity: varietyStock.stockQuantity,
          isAvailable: varietyStock.isAvailable,
          varietyId: varietyStock.varietyId,
          rootstockId: varietyStock.rootstockId,
          sizeId: varietyStock.sizeId,
          varietyName: varieties.name,
          rootstockName: rootstocks.name,
          sizeName: sizes.name,
          categoryId: varieties.categoryId,
          price: categoryPrices.price
        })
        .from(varietyStock)
        .innerJoin(varieties, eq(varietyStock.varietyId, varieties.id))
        .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
        .innerJoin(sizes, eq(varietyStock.sizeId, sizes.id))
        .leftJoin(categoryPrices, and(
          eq(categoryPrices.categoryId, varieties.categoryId),
          eq(categoryPrices.sizeId, varietyStock.sizeId)
        ))
        .where(eq(varietyStock.id, item.varietyStockId))
        .limit(1)

      if (!stockItem) {
        throw createError({
          statusCode: 400,
          message: `Voorraad item niet gevonden (ID: ${item.varietyStockId})`
        })
      }

      if (!stockItem.isAvailable) {
        throw createError({
          statusCode: 400,
          message: `${stockItem.varietyName} is niet beschikbaar`
        })
      }

      const currentStock = stockItem.stockQuantity || 0
      if (currentStock < item.quantity) {
        throw createError({
          statusCode: 400,
          message: `Onvoldoende voorraad voor ${stockItem.varietyName} (${stockItem.rootstockName}, ${stockItem.sizeName}). Beschikbaar: ${currentStock}, gevraagd: ${item.quantity}`
        })
      }

      const unitPrice = parseFloat(stockItem.price || '0')
      const lineTotal = unitPrice * item.quantity

      subtotal += lineTotal
      totalItems += item.quantity

      orderItemsToInsert.push({
        orderId: 0, // Will be set after order creation
        varietyStockId: stockItem.id,
        varietyId: stockItem.varietyId,
        rootstockId: stockItem.rootstockId,
        sizeId: stockItem.sizeId,
        varietyName: stockItem.varietyName,
        rootstockName: stockItem.rootstockName,
        sizeName: stockItem.sizeName,
        quantity: item.quantity,
        unitPrice: unitPrice.toFixed(2),
        lineTotal: lineTotal.toFixed(2)
      })
    }

    // Calculate discount and total
    const discount = body.discount || 0
    const totalAmount = Math.max(0, subtotal - discount)

    // Create order
    const [createdOrder] = await tx
      .insert(orders)
      .values({
        orderNumber,
        customerName: body.customerName.trim(),
        customerEmail: body.customerEmail?.trim() || null,
        customerPhone: body.customerPhone?.trim() || null,
        status: 'pending',
        paymentType: body.paymentType,
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalItems,
        notes: body.notes?.trim() || null,
        createdBy: user?.id || null
      })
      .returning()

    // Create order items and update stock
    for (const itemData of orderItemsToInsert) {
      // Insert order item
      await tx.insert(orderItems).values({
        ...itemData,
        orderId: createdOrder.id
      })

      // Deduct stock
      await tx
        .update(varietyStock)
        .set({
          stockQuantity: (await tx
            .select({ quantity: varietyStock.stockQuantity })
            .from(varietyStock)
            .where(eq(varietyStock.id, itemData.varietyStockId))
            .limit(1)
          )[0].quantity! - itemData.quantity,
          updatedAt: new Date()
        })
        .where(eq(varietyStock.id, itemData.varietyStockId))

      // Create stock movement
      await tx.insert(stockMovements).values({
        varietyStockId: itemData.varietyStockId,
        quantityChange: -itemData.quantity,
        movementType: 'sale',
        notes: `Bestelling ${orderNumber}`,
        createdBy: user?.id || null
      })
    }

    return {
      success: true,
      order: createdOrder,
      message: `Bestelling ${orderNumber} aangemaakt`
    }
  })
})
