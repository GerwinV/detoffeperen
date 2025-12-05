import { db } from '../../../database'
import { varietyStock, stockMovements } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')
  const body = await readBody(event)
  const user = event.context.user

  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldige ID'
    })
  }

  // Get current stock
  const [currentStock] = await db
    .select()
    .from(varietyStock)
    .where(eq(varietyStock.id, id))
    .limit(1)

  if (!currentStock) {
    throw createError({
      statusCode: 404,
      message: 'Voorraad niet gevonden'
    })
  }

  const newQuantity = body.stockQuantity !== undefined ? parseInt(body.stockQuantity) : currentStock.stockQuantity
  const newThreshold = body.lowStockThreshold !== undefined ? parseInt(body.lowStockThreshold) : currentStock.lowStockThreshold
  const newAvailable = body.isAvailable !== undefined ? body.isAvailable : currentStock.isAvailable

  // Calculate quantity change
  const quantityChange = (newQuantity || 0) - (currentStock.stockQuantity || 0)

  // Update stock
  await db
    .update(varietyStock)
    .set({
      stockQuantity: newQuantity,
      lowStockThreshold: newThreshold,
      isAvailable: newAvailable,
      updatedAt: new Date()
    })
    .where(eq(varietyStock.id, id))

  // Create audit record if quantity changed
  if (quantityChange !== 0) {
    await db.insert(stockMovements).values({
      varietyStockId: id,
      quantityChange,
      movementType: body.movementType || 'adjustment',
      notes: body.notes || null,
      createdBy: user?.id || null
    })
  }

  return {
    success: true,
    message: 'Voorraad bijgewerkt'
  }
})
