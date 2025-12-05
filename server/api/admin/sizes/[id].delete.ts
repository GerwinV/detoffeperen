import { db } from '../../../database'
import { sizes, varietyStock } from '../../../database/schema'
import { eq, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only admins can delete sizes
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldig ID'
    })
  }

  // Check if size is in use
  const [usage] = await db
    .select({ count: count() })
    .from(varietyStock)
    .where(eq(varietyStock.sizeId, id))

  if (usage.count > 0) {
    throw createError({
      statusCode: 400,
      message: 'Deze grootte is nog in gebruik en kan niet worden verwijderd'
    })
  }

  await db.delete(sizes).where(eq(sizes.id, id))

  return {
    success: true
  }
})
