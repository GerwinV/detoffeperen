import { db } from '../../../database'
import { sizes } from '../../../database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Check admin access
  const currentUser = event.context.user
  if (!currentUser) {
    throw createError({
      statusCode: 401,
      message: 'Niet ingelogd'
    })
  }

  const sizeList = await db
    .select()
    .from(sizes)
    .orderBy(asc(sizes.sortOrder), asc(sizes.minHeight))

  return {
    sizes: sizeList
  }
})
