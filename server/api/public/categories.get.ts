import { db } from '../../database'
import { categories } from '../../database/schema'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  // Get all active categories ordered by display order
  const categoryList = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      imageUrl: categories.imageUrl,
      displayOrder: categories.displayOrder
    })
    .from(categories)
    .orderBy(asc(categories.displayOrder))

  return {
    categories: categoryList
  }
})
