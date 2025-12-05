import { db } from '../../../database'
import { sizes } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  // Only admins can add sizes
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const body = await readBody(event)
  const { name, minHeight, maxHeight, sortOrder } = body

  if (!name || minHeight === undefined || maxHeight === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Naam, min hoogte en max hoogte zijn verplicht'
    })
  }

  const [newSize] = await db
    .insert(sizes)
    .values({
      name,
      minHeight: parseInt(minHeight),
      maxHeight: parseInt(maxHeight),
      sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      isActive: true
    })
    .returning()

  return {
    size: newSize
  }
})
