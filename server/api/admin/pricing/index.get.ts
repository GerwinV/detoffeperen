import { db } from '../../../database'
import { categories, sizes, categoryPrices } from '../../../database/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Check admin access
  const currentUser = event.context.user
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      message: 'Niet ingelogd'
    })
  }

  // Get all categories
  const categoryList = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.displayOrder))

  // Get all active sizes
  const sizeList = await db
    .select()
    .from(sizes)
    .where(eq(sizes.isActive, true))
    .orderBy(asc(sizes.sortOrder), asc(sizes.minHeight))

  // Get all prices
  const priceList = await db
    .select({
      id: categoryPrices.id,
      categoryId: categoryPrices.categoryId,
      sizeId: categoryPrices.sizeId,
      price: categoryPrices.price
    })
    .from(categoryPrices)

  // Build price matrix: { categoryId: { sizeId: { id, price } } }
  const priceMatrix: Record<number, Record<number, { id: number; price: string }>> = {}
  for (const price of priceList) {
    if (!priceMatrix[price.categoryId]) {
      priceMatrix[price.categoryId] = {}
    }
    priceMatrix[price.categoryId][price.sizeId] = {
      id: price.id,
      price: price.price
    }
  }

  return {
    categories: categoryList,
    sizes: sizeList,
    prices: priceMatrix
  }
})
