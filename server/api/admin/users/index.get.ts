import { db } from '../../../database'
import { users } from '../../../database/schema'

export default defineEventHandler(async (event) => {
  // Only admins can view users
  const currentUser = event.context.user
  if (currentUser?.role !== 'admin') {
    throw createError({
      statusCode: 403,
      message: 'Geen toegang'
    })
  }

  const userList = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      isActive: users.isActive,
      lastLoginAt: users.lastLoginAt,
      createdAt: users.createdAt
    })
    .from(users)
    .orderBy(users.name)

  return {
    users: userList
  }
})
