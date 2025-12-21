import { db } from '../../../database'
import { varieties, categories } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const varietyList = await db
    .select({
      id: varieties.id,
      name: varieties.name,
      latinName: varieties.latinName,
      slug: varieties.slug,
      isActive: varieties.isActive,
      published: varieties.published,
      categoryId: varieties.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug
    })
    .from(varieties)
    .innerJoin(categories, eq(varieties.categoryId, categories.id))
    .orderBy(categories.name, varieties.name)

  return {
    varieties: varietyList
  }
})
