import { db } from '../../../database'
import { categoryPrices } from '../../../database/schema'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only admins can update pricing
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const body = await readBody(event)
  const { categoryId, sizeId, price } = body

  if (!categoryId || !sizeId || price === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Category, size en prijs zijn verplicht'
    })
  }

  // Check if price entry exists
  const [existing] = await db
    .select()
    .from(categoryPrices)
    .where(
      and(
        eq(categoryPrices.categoryId, categoryId),
        eq(categoryPrices.sizeId, sizeId)
      )
    )
    .limit(1)

  let result
  if (existing) {
    // Update existing price
    [result] = await db
      .update(categoryPrices)
      .set({
        price: price.toString(),
        updatedAt: new Date()
      })
      .where(eq(categoryPrices.id, existing.id))
      .returning()
  } else {
    // Create new price entry
    [result] = await db
      .insert(categoryPrices)
      .values({
        categoryId,
        sizeId,
        price: price.toString()
      })
      .returning()
  }

  return {
    price: result
  }
})
