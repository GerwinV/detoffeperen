import { db } from '../../../database'
import { orders } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')
  const body = await readBody(event)

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

  // Only allow editing pending orders
  if (order.status !== 'pending') {
    throw createError({
      statusCode: 400,
      message: 'Alleen bestellingen in afwachting kunnen bewerkt worden'
    })
  }

  // Build updates
  const updates: Partial<{
    customerName: string
    customerEmail: string | null
    customerPhone: string | null
    paymentType: 'cash' | 'invoice'
    discount: string
    totalAmount: string
    notes: string | null
    updatedAt: Date
  }> = {
    updatedAt: new Date()
  }

  if (body.customerName !== undefined) {
    if (!body.customerName?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'Klantnaam is verplicht'
      })
    }
    updates.customerName = body.customerName.trim()
  }
  if (body.customerEmail !== undefined) {
    updates.customerEmail = body.customerEmail?.trim() || null
  }
  if (body.customerPhone !== undefined) {
    updates.customerPhone = body.customerPhone?.trim() || null
  }
  if (body.paymentType !== undefined) {
    if (!['cash', 'invoice'].includes(body.paymentType)) {
      throw createError({
        statusCode: 400,
        message: 'Ongeldige betaalwijze'
      })
    }
    updates.paymentType = body.paymentType
  }
  if (body.discount !== undefined) {
    const discount = parseFloat(body.discount) || 0
    const subtotal = parseFloat(order.subtotal || '0')
    const totalAmount = Math.max(0, subtotal - discount)
    updates.discount = discount.toFixed(2)
    updates.totalAmount = totalAmount.toFixed(2)
  }
  if (body.notes !== undefined) {
    updates.notes = body.notes?.trim() || null
  }

  await db
    .update(orders)
    .set(updates)
    .where(eq(orders.id, id))

  // Fetch and return updated order
  const [updatedOrder] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1)

  return {
    success: true,
    order: updatedOrder,
    message: 'Bestelling bijgewerkt'
  }
})
