import { db } from '../../../database'
import { varieties } from '../../../database/schema'
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

  // Update variety
  await db
    .update(varieties)
    .set({
      isActive: body.isActive,
      updatedAt: new Date()
    })
    .where(eq(varieties.id, id))

  return {
    success: true
  }
})
