import { db } from '../../../database'
import { users } from '../../../database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only admins can add users
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const body = await readBody(event)
  const email = body.email?.toLowerCase()?.trim()
  const name = body.name?.trim()
  const role = body.role || 'editor'

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is verplicht'
    })
  }

  // Check if user already exists
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existing) {
    throw createError({
      statusCode: 400,
      message: 'Er bestaat al een gebruiker met dit emailadres'
    })
  }

  // Create user
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      name,
      role,
      isActive: true
    })
    .returning()

  return {
    user: newUser
  }
})
