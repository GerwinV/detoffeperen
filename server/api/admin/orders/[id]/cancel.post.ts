import { db } from '../../../../database'
import { orders, orderItems, varietyStock, stockMovements } from '../../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')
  const user = event.context.user

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldige ID'
    })
  }

  // Get current order
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1)

  if (!order) {
    throw createError({
      statusCode: 404,
      message: 'Bestelling niet gevonden'
    })
  }

  if (order.status !== 'pending') {
    throw createError({
      statusCode: 400,
      message: 'Alleen bestellingen in afwachting kunnen geannuleerd worden'
    })
  }

  // Get order items
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, id))

  // Use transaction to restore stock and cancel order
  await db.transaction(async (tx) => {
    // Restore stock for each item
    for (const item of items) {
      // Get current stock
      const [currentStock] = await tx
        .select()
        .from(varietyStock)
        .where(eq(varietyStock.id, item.varietyStockId))
        .limit(1)

      if (currentStock) {
        // Restore stock quantity
        await tx
          .update(varietyStock)
          .set({
            stockQuantity: (currentStock.stockQuantity || 0) + item.quantity,
            updatedAt: new Date()
          })
          .where(eq(varietyStock.id, item.varietyStockId))

        // Create stock movement for return
        await tx.insert(stockMovements).values({
          varietyStockId: item.varietyStockId,
          quantityChange: item.quantity,
          movementType: 'return',
          notes: `Geannuleerde bestelling ${order.orderNumber}`,
          createdBy: user?.id || null
        })
      }
    }

    // Update order status
    await tx
      .update(orders)
      .set({
        status: 'cancelled',
        cancelledAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(orders.id, id))
  })

  return {
    success: true,
    message: `Bestelling ${order.orderNumber} geannuleerd en voorraad hersteld`
  }
})
