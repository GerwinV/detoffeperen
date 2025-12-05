import { db } from '../../../database'
import { varietyStock, varieties, rootstocks, sizes, categories, categoryPrices } from '../../../database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Get all stock with related data
  const stockItems = await db
    .select({
      id: varietyStock.id,
      stockQuantity: varietyStock.stockQuantity,
      lowStockThreshold: varietyStock.lowStockThreshold,
      isAvailable: varietyStock.isAvailable,
      variety: {
        id: varieties.id,
        name: varieties.name,
        slug: varieties.slug
      },
      rootstock: {
        id: rootstocks.id,
        name: rootstocks.name
      },
      size: {
        id: sizes.id,
        name: sizes.name,
        sortOrder: sizes.sortOrder
      },
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug
      },
      price: categoryPrices.price
    })
    .from(varietyStock)
    .innerJoin(varieties, eq(varietyStock.varietyId, varieties.id))
    .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    .innerJoin(sizes, eq(varietyStock.sizeId, sizes.id))
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .leftJoin(categoryPrices, and(
      eq(categoryPrices.categoryId, categories.id),
      eq(categoryPrices.sizeId, sizes.id)
    ))
    .orderBy(categories.name, varieties.name, rootstocks.name, sizes.sortOrder)

  // Get unique categories for filtering
  const categoryList = await db
    .select({ id: categories.id, name: categories.name, slug: categories.slug })
    .from(categories)
    .orderBy(categories.name)

  // Get sizes for filtering
  const sizeList = await db
    .select({ id: sizes.id, name: sizes.name })
    .from(sizes)
    .orderBy(sizes.sortOrder)

  return {
    stock: stockItems,
    categories: categoryList,
    sizes: sizeList
  }
})
