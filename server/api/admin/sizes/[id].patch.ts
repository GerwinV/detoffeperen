import { db } from '../../../database'
import { sizes } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only admins can update sizes
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

  const body = await readBody(event)
  const updates: Record<string, any> = {}

  if (body.name !== undefined) updates.name = body.name
  if (body.minHeight !== undefined) updates.minHeight = parseInt(body.minHeight)
  if (body.maxHeight !== undefined) updates.maxHeight = parseInt(body.maxHeight)
  if (body.sortOrder !== undefined) updates.sortOrder = parseInt(body.sortOrder)
  if (body.isActive !== undefined) updates.isActive = body.isActive

  updates.updatedAt = new Date()

  const [updated] = await db
    .update(sizes)
    .set(updates)
    .where(eq(sizes.id, id))
    .returning()

  if (!updated) {
    throw createError({
      statusCode: 404,
      message: 'Grootte niet gevonden'
    })
  }

  return {
    size: updated
  }
})
