import { db } from '../../../../database'
import { varietyStock, sizes, varieties } from '../../../../database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only admins can manage rootstocks
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const varietyId = parseInt(getRouterParam(event, 'id') || '')
  if (!varietyId) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldig variety ID'
    })
  }

  const body = await readBody(event)
  const { rootstockIds } = body // Array of rootstock IDs to assign

  if (!Array.isArray(rootstockIds)) {
    throw createError({
      statusCode: 400,
      message: 'rootstockIds moet een array zijn'
    })
  }

  // Get all active sizes
  const activeSizes = await db
    .select()
    .from(sizes)
    .where(eq(sizes.isActive, true))

  // Get current rootstock assignments for this variety
  const currentStock = await db
    .select({ rootstockId: varietyStock.rootstockId, sizeId: varietyStock.sizeId })
    .from(varietyStock)
    .where(eq(varietyStock.varietyId, varietyId))

  const currentRootstockIds = [...new Set(currentStock.map(s => s.rootstockId))]

  // Find rootstocks to add and remove
  const toAdd = rootstockIds.filter((id: number) => !currentRootstockIds.includes(id))
  const toRemove = currentRootstockIds.filter(id => !rootstockIds.includes(id))

  // Remove old rootstock assignments (all sizes)
  for (const rootstockId of toRemove) {
    await db
      .delete(varietyStock)
      .where(
        and(
          eq(varietyStock.varietyId, varietyId),
          eq(varietyStock.rootstockId, rootstockId)
        )
      )
  }

  // Add new rootstock assignments (for all active sizes)
  for (const rootstockId of toAdd) {
    for (const size of activeSizes) {
      await db
        .insert(varietyStock)
        .values({
          varietyId,
          rootstockId,
          sizeId: size.id,
          stockQuantity: 0,
          isAvailable: true
        })
        .onConflictDoNothing()
    }
  }

  return {
    success: true,
    added: toAdd.length,
    removed: toRemove.length
  }
})
