import { db } from '../../../database'
import { varieties } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  // Only admins can add varieties
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const body = await readBody(event)
  const { categoryId, name, latinName, description, fullDescription, harvestTime, blossomTime, origin, fruitColor, taste, pollination, published } = body

  if (!categoryId || !name) {
    throw createError({
      statusCode: 400,
      message: 'Categorie en naam zijn verplicht'
    })
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const [newVariety] = await db
    .insert(varieties)
    .values({
      categoryId: parseInt(categoryId),
      name,
      latinName: latinName || null,
      slug,
      description: description || null,
      fullDescription: fullDescription || null,
      harvestTime: harvestTime || null,
      blossomTime: blossomTime || null,
      origin: origin || null,
      fruitColor: fruitColor || null,
      taste: taste || null,
      pollination: pollination || null,
      isActive: true,
      published: published ?? true
    })
    .returning()

  return {
    variety: newVariety
  }
})
