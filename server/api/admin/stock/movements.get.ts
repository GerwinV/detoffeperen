import { db } from '../../../database'
import { stockMovements, varietyStock, varieties, rootstocks, sizes, categories, users } from '../../../database/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const varietyStockId = query.varietyStockId ? parseInt(query.varietyStockId as string) : undefined
  const limit = query.limit ? parseInt(query.limit as string) : 50

  // Get stock movements with related data
  let movementsQuery = db
    .select({
      id: stockMovements.id,
      quantityChange: stockMovements.quantityChange,
      movementType: stockMovements.movementType,
      notes: stockMovements.notes,
      createdAt: stockMovements.createdAt,
      createdBy: {
        id: users.id,
        name: users.name,
        email: users.email
      },
      varietyStock: {
        id: varietyStock.id,
        stockQuantity: varietyStock.stockQuantity
      },
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
        name: sizes.name
      },
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug
      }
    })
    .from(stockMovements)
    .innerJoin(varietyStock, eq(stockMovements.varietyStockId, varietyStock.id))
    .innerJoin(varieties, eq(varietyStock.varietyId, varieties.id))
    .innerJoin(rootstocks, eq(varietyStock.rootstockId, rootstocks.id))
    .innerJoin(sizes, eq(varietyStock.sizeId, sizes.id))
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .leftJoin(users, eq(stockMovements.createdBy, users.id))
    .orderBy(desc(stockMovements.createdAt))
    .limit(limit)

  // Filter by specific varietyStockId if provided
  if (varietyStockId) {
    movementsQuery = movementsQuery.where(eq(stockMovements.varietyStockId, varietyStockId)) as typeof movementsQuery
  }

  const movements = await movementsQuery

  return {
    movements
  }
})
