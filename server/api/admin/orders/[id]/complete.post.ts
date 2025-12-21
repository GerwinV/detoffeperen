import { db } from '../../../../database'
import { orders } from '../../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')

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
      message: 'Alleen bestellingen in afwachting kunnen voltooid worden'
    })
  }

  // Update order status
  await db
    .update(orders)
    .set({
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date()
    })
    .where(eq(orders.id, id))

  return {
    success: true,
    message: `Bestelling ${order.orderNumber} voltooid`
  }
})
