import { db } from '../../../../database'
import { varieties, categories, rootstocks, sizes, varietyStock } from '../../../../database/schema'
import { eq, and, asc } from 'drizzle-orm'

type AvailabilityStatus = 'available' | 'low_stock' | 'out_of_stock'

interface StockByRootstock {
  rootstock: string
  sizes: {
    size: string
    status: AvailabilityStatus
    quantity: number
  }[]
  overallStatus: AvailabilityStatus
}

export default defineEventHandler(async (event) => {
  const categorySlug = getRouterParam(event, 'category')
  const varietySlug = getRouterParam(event, 'variety')

  if (!categorySlug || !varietySlug) {
    throw createError({
      statusCode: 400,
      message: 'Category and variety slugs are required'
    })
  }

  // Get variety with category
  const [variety] = await db
    .select({
      id: varieties.id,
      name: varieties.name,
      slug: varieties.slug,
      categoryId: categories.id,
      categorySlug: categories.slug
    })
    .from(varieties)
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .where(and(
      eq(categories.slug, categorySlug),
      eq(varieties.slug, varietySlug),
      eq(varieties.isActive, true)
    ))
    .limit(1)

  if (!variety) {
    throw createError({
      statusCode: 404,
      message: 'Variety not found'
    })
  }

  // Get all stock for this variety
  const stockData = await db
    .select({
      rootstockName: rootstocks.name,
      sizeName: sizes.name,
      sizeOrder: sizes.sortOrder,
      stockQuantity: varietyStock.stockQuantity,
      lowStockThreshold: varietyStock.lowStockThreshold,
      isAvailable: varietyStock.isAvailable
    })
    .from(varietyStock)
    .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    .innerJoin(sizes, eq(varietyStock.sizeId, sizes.id))
    .where(eq(varietyStock.varietyId, variety.id))
    .orderBy(asc(rootstocks.name), asc(sizes.sortOrder))

  // Group by rootstock
  const stockByRootstock: Map<string, StockByRootstock> = new Map()

  for (const row of stockData) {
    if (!stockByRootstock.has(row.rootstockName)) {
      stockByRootstock.set(row.rootstockName, {
        rootstock: row.rootstockName,
        sizes: [],
        overallStatus: 'out_of_stock'
      })
    }

    const entry = stockByRootstock.get(row.rootstockName)!

    // Determine status
    let status: AvailabilityStatus
    if (!row.isAvailable || (row.stockQuantity || 0) <= 0) {
      status = 'out_of_stock'
    } else if ((row.stockQuantity || 0) <= (row.lowStockThreshold || 3)) {
      status = 'low_stock'
    } else {
      status = 'available'
    }

    entry.sizes.push({
      size: row.sizeName,
      status,
      quantity: row.stockQuantity || 0
    })

    // Update overall status (best of all sizes)
    if (status === 'available') {
      entry.overallStatus = 'available'
    } else if (status === 'low_stock' && entry.overallStatus === 'out_of_stock') {
      entry.overallStatus = 'low_stock'
    }
  }

  return {
    variety: variety.name,
    stock: Array.from(stockByRootstock.values())
  }
})
