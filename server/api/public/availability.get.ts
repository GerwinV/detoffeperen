import { db } from '../../database'
import { varieties, categories, rootstocks, varietyStock, sizes } from '../../database/schema'
import { eq, and, gt } from 'drizzle-orm'

type AvailabilityStatus = 'available' | 'low_stock' | 'out_of_stock'

export default defineEventHandler(async () => {
  // Get all stock entries with variety and rootstock info
  const stockData = await db
    .select({
      categorySlug: categories.slug,
      varietySlug: varieties.slug,
      rootstockName: rootstocks.name,
      sizeName: sizes.name,
      stockQuantity: varietyStock.stockQuantity,
      lowStockThreshold: varietyStock.lowStockThreshold,
      isAvailable: varietyStock.isAvailable,
      varietyIsActive: varieties.isActive
    })
    .from(varietyStock)
    .innerJoin(varieties, eq(varietyStock.varietyId, varieties.id))
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    .innerJoin(sizes, eq(varietyStock.sizeId, sizes.id))
    .where(eq(varieties.isActive, true))

  // Build availability map: { categorySlug: { varietySlug: { rootstockName: status } } }
  const availability: Record<string, Record<string, Record<string, AvailabilityStatus>>> = {}

  for (const row of stockData) {
    if (!availability[row.categorySlug]) {
      availability[row.categorySlug] = {}
    }
    if (!availability[row.categorySlug][row.varietySlug]) {
      availability[row.categorySlug][row.varietySlug] = {}
    }

    // Determine status based on stock across all sizes for this variety+rootstock
    const currentStatus = availability[row.categorySlug][row.varietySlug][row.rootstockName]
    let newStatus: AvailabilityStatus

    if (!row.isAvailable) {
      newStatus = 'out_of_stock'
    } else if ((row.stockQuantity || 0) <= 0) {
      newStatus = 'out_of_stock'
    } else if ((row.stockQuantity || 0) <= (row.lowStockThreshold || 3)) {
      newStatus = 'low_stock'
    } else {
      newStatus = 'available'
    }

    // Keep the best status (available > low_stock > out_of_stock)
    // If any size is available, the rootstock is available
    if (!currentStatus) {
      availability[row.categorySlug][row.varietySlug][row.rootstockName] = newStatus
    } else if (newStatus === 'available') {
      availability[row.categorySlug][row.varietySlug][row.rootstockName] = 'available'
    } else if (newStatus === 'low_stock' && currentStatus === 'out_of_stock') {
      availability[row.categorySlug][row.varietySlug][row.rootstockName] = 'low_stock'
    }
  }

  return {
    availability
  }
})
