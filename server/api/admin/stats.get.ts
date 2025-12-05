import { db } from '../../database'
import { varieties, varietyStock } from '../../database/schema'
import { eq, sql } from 'drizzle-orm'

const LOW_STOCK_THRESHOLD = 10

export default defineEventHandler(async () => {
  // Count total active varieties
  const [{ count: totalVarieties }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(varieties)
    .where(eq(varieties.isActive, true))

  // Get total stock per variety (sum across all rootstock/size combinations)
  const stockByVariety = await db
    .select({
      varietyId: varietyStock.varietyId,
      totalStock: sql<number>`coalesce(sum(${varietyStock.stockQuantity}), 0)::int`
    })
    .from(varietyStock)
    .innerJoin(varieties, eq(varietyStock.varietyId, varieties.id))
    .where(eq(varieties.isActive, true))
    .groupBy(varietyStock.varietyId)

  let inStock = 0
  let lowStock = 0
  let outOfStock = 0

  for (const row of stockByVariety) {
    const total = row.totalStock ?? 0

    if (total <= 0) {
      outOfStock++
    } else if (total < LOW_STOCK_THRESHOLD) {
      lowStock++
    } else {
      inStock++
    }
  }

  // Count varieties without any stock entries as out of stock
  const varietiesWithoutStock = totalVarieties - stockByVariety.length
  outOfStock += varietiesWithoutStock

  return {
    totalVarieties,
    inStock,
    lowStock,
    outOfStock,
    lowStockThreshold: LOW_STOCK_THRESHOLD
  }
})
