import { db } from '../../../database'
import { orders, orderItems, users } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldige ID'
    })
  }

  // Get order with creator info
  const [order] = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      customerName: orders.customerName,
      customerEmail: orders.customerEmail,
      customerPhone: orders.customerPhone,
      status: orders.status,
      paymentType: orders.paymentType,
      subtotal: orders.subtotal,
      discount: orders.discount,
      totalAmount: orders.totalAmount,
      totalItems: orders.totalItems,
      notes: orders.notes,
      completedAt: orders.completedAt,
      cancelledAt: orders.cancelledAt,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      createdBy: {
        id: users.id,
        name: users.name,
        email: users.email
      }
    })
    .from(orders)
    .leftJoin(users, eq(orders.createdBy, users.id))
    .where(eq(orders.id, id))
    .limit(1)

  if (!order) {
    throw createError({
      statusCode: 404,
      message: 'Bestelling niet gevonden'
    })
  }

  // Get order items
  const items = await db
    .select({
      id: orderItems.id,
      varietyStockId: orderItems.varietyStockId,
      varietyId: orderItems.varietyId,
      rootstockId: orderItems.rootstockId,
      sizeId: orderItems.sizeId,
      varietyName: orderItems.varietyName,
      rootstockName: orderItems.rootstockName,
      sizeName: orderItems.sizeName,
      quantity: orderItems.quantity,
      unitPrice: orderItems.unitPrice,
      lineTotal: orderItems.lineTotal,
      createdAt: orderItems.createdAt
    })
    .from(orderItems)
    .where(eq(orderItems.orderId, id))

  return {
    ...order,
    items
  }
})
