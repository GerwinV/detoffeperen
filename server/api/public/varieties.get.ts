import { db } from '../../database'
import { varieties, categories, features, varietyFeatures, rootstocks, varietyStock } from '../../database/schema'
import { eq, and, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const categorySlug = query.category as string | undefined

  // Build base query for varieties
  let varietyQuery = db
    .select({
      id: varieties.id,
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
      categoryId: varieties.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug
    })
    .from(varieties)
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .where(eq(varieties.isActive, true))
    .orderBy(asc(categories.displayOrder), asc(varieties.name))

  // Filter by category if provided
  if (categorySlug) {
    varietyQuery = varietyQuery.where(
      and(
        eq(varieties.isActive, true),
        eq(categories.slug, categorySlug)
      )
    ) as typeof varietyQuery
  }

  const varietyList = await varietyQuery

  // Get features for each variety
  const varietyIds = varietyList.map(v => v.id)

  const featuresList = varietyIds.length > 0
    ? await db
        .select({
          varietyId: varietyFeatures.varietyId,
          featureName: features.name
        })
        .from(varietyFeatures)
        .innerJoin(features, eq(varietyFeatures.featureId, features.id))
    : []

  // Get rootstocks for each variety
  const rootstocksList = varietyIds.length > 0
    ? await db
        .select({
          varietyId: varietyStock.varietyId,
          rootstockId: varietyStock.rootstockId,
          rootstockName: rootstocks.name
        })
        .from(varietyStock)
        .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    : []

  // Group features and rootstocks by variety
  const featuresMap = new Map<number, string[]>()
  for (const f of featuresList) {
    if (!featuresMap.has(f.varietyId)) {
      featuresMap.set(f.varietyId, [])
    }
    featuresMap.get(f.varietyId)!.push(f.featureName)
  }

  const rootstocksMap = new Map<number, string[]>()
  for (const r of rootstocksList) {
    if (!rootstocksMap.has(r.varietyId)) {
      rootstocksMap.set(r.varietyId, [])
    }
    const existing = rootstocksMap.get(r.varietyId)!
    if (!existing.includes(r.rootstockName)) {
      existing.push(r.rootstockName)
    }
  }

  // Combine data
  const result = varietyList.map(v => ({
    ...v,
    features: featuresMap.get(v.id) || [],
    rootstocks: rootstocksMap.get(v.id) || []
  }))

  return {
    varieties: result
  }
})
