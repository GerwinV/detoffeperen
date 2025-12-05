import { db } from '../../../database'
import { varieties, categories, rootstocks, varietyStock } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldig ID'
    })
  }

  // Get variety with all details
  const [variety] = await db
    .select({
      id: varieties.id,
      categoryId: varieties.categoryId,
      name: varieties.name,
      latinName: varieties.latinName,
      slug: varieties.slug,
      description: varieties.description,
      fullDescription: varieties.fullDescription,
      harvestTime: varieties.harvestTime,
      blossomTime: varieties.blossomTime,
      origin: varieties.origin,
      fruitColor: varieties.fruitColor,
      taste: varieties.taste,
      pollination: varieties.pollination,
      isActive: varieties.isActive,
      categoryName: categories.name
    })
    .from(varieties)
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .where(eq(varieties.id, id))
    .limit(1)

  if (!variety) {
    throw createError({
      statusCode: 404,
      message: 'Variëteit niet gevonden'
    })
  }

  // Get assigned rootstocks for this variety
  const assignedRootstocks = await db
    .select({
      rootstockId: varietyStock.rootstockId,
      rootstockName: rootstocks.name
    })
    .from(varietyStock)
    .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    .where(eq(varietyStock.varietyId, id))

  // Get unique rootstock IDs (since varietyStock has multiple entries per size)
  const uniqueRootstockIds = [...new Set(assignedRootstocks.map(r => r.rootstockId))]

  // Get all rootstocks for selection
  const allRootstocks = await db
    .select()
    .from(rootstocks)
    .orderBy(rootstocks.name)

  return {
    variety,
    assignedRootstockIds: uniqueRootstockIds,
    allRootstocks
  }
})
