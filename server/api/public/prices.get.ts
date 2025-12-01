import { db } from '../../database'
import { categories, sizes, categoryPrices } from '../../database/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const categorySlug = query.category as string | undefined

  // Get all active sizes ordered by sort order
  const sizeList = await db
    .select({
      id: sizes.id,
      name: sizes.name,
      minHeight: sizes.minHeight,
      maxHeight: sizes.maxHeight,
      sortOrder: sizes.sortOrder
    })
    .from(sizes)
    .where(eq(sizes.isActive, true))
    .orderBy(asc(sizes.sortOrder), asc(sizes.minHeight))

  // Get prices with category info
  const pricesQuery = db
    .select({
      categorySlug: categories.slug,
      categoryName: categories.name,
      sizeId: categoryPrices.sizeId,
      sizeName: sizes.name,
      price: categoryPrices.price,
      sortOrder: sizes.sortOrder
    })
    .from(categoryPrices)
    .innerJoin(categories, eq(categoryPrices.categoryId, categories.id))
    .innerJoin(sizes, eq(categoryPrices.sizeId, sizes.id))
    .where(eq(sizes.isActive, true))
    .orderBy(asc(sizes.sortOrder))

  const priceList = await pricesQuery

  // Build prices by category: { categorySlug: [{ size, price }] }
  const pricesByCategory: Record<string, Array<{ size: string; price: string; sortOrder: number }>> = {}

  for (const price of priceList) {
    if (!pricesByCategory[price.categorySlug]) {
      pricesByCategory[price.categorySlug] = []
    }
    pricesByCategory[price.categorySlug].push({
      size: price.sizeName,
      price: `€${parseFloat(price.price).toFixed(2).replace('.', ',')}`,
      sortOrder: price.sortOrder
    })
  }

  // Sort each category's prices by sortOrder
  for (const slug in pricesByCategory) {
    pricesByCategory[slug].sort((a, b) => a.sortOrder - b.sortOrder)
  }

  // If a specific category was requested, return just that
  if (categorySlug && pricesByCategory[categorySlug]) {
    return {
      prices: pricesByCategory[categorySlug]
    }
  }

  return {
    sizes: sizeList,
    pricesByCategory
  }
})
