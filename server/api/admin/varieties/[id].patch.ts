import { db } from '../../../database'
import { varieties } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id || isNaN(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldige ID'
    })
  }

  const body = await readBody(event)
  const updates: Record<string, any> = {}

  // Allow updating all fields
  if (body.name !== undefined) updates.name = body.name
  if (body.latinName !== undefined) updates.latinName = body.latinName || null
  if (body.description !== undefined) updates.description = body.description || null
  if (body.fullDescription !== undefined) updates.fullDescription = body.fullDescription || null
  if (body.harvestTime !== undefined) updates.harvestTime = body.harvestTime || null
  if (body.blossomTime !== undefined) updates.blossomTime = body.blossomTime || null
  if (body.origin !== undefined) updates.origin = body.origin || null
  if (body.fruitColor !== undefined) updates.fruitColor = body.fruitColor || null
  if (body.taste !== undefined) updates.taste = body.taste || null
  if (body.pollination !== undefined) updates.pollination = body.pollination || null
  if (body.isActive !== undefined) updates.isActive = body.isActive
  if (body.published !== undefined) updates.published = body.published
  if (body.categoryId !== undefined) updates.categoryId = parseInt(body.categoryId)

  // Update slug if name changed
  if (body.name) {
    updates.slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  updates.updatedAt = new Date()

  const [updated] = await db
    .update(varieties)
    .set(updates)
    .where(eq(varieties.id, id))
    .returning()

  if (!updated) {
    throw createError({
      statusCode: 404,
      message: 'Variëteit niet gevonden'
    })
  }

  return {
    variety: updated
  }
})
