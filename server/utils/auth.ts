import { nanoid } from 'nanoid'
import { eq, and, gt } from 'drizzle-orm'
import { db } from '../database'
import { users, sessions, magicLinkTokens } from '../database/schema'

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days
const MAGIC_LINK_DURATION = 15 * 60 * 1000 // 15 minutes

export interface SessionUser {
  id: number
  email: string
  name: string | null
  role: string | null
}

/**
 * Generate a magic link token for email authentication
 */
export async function createMagicLinkToken(email: string): Promise<string> {
  const token = nanoid(32)
  const expiresAt = new Date(Date.now() + MAGIC_LINK_DURATION)

  await db.insert(magicLinkTokens).values({
    email,
    token,
    expiresAt
  })

  return token
}

/**
 * Verify a magic link token and return the email if valid
 */
export async function verifyMagicLinkToken(token: string): Promise<string | null> {
  const [result] = await db
    .select()
    .from(magicLinkTokens)
    .where(
      and(
        eq(magicLinkTokens.token, token),
        gt(magicLinkTokens.expiresAt, new Date())
      )
    )
    .limit(1)

  if (!result || result.usedAt) {
    return null
  }

  // Mark token as used
  await db
    .update(magicLinkTokens)
    .set({ usedAt: new Date() })
    .where(eq(magicLinkTokens.id, result.id))

  return result.email
}

/**
 * Create a new session for a user
 */
export async function createSession(userId: number): Promise<string> {
  const sessionId = nanoid(32)
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt
  })

  // Update user's last login
  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, userId))

  return sessionId
}

/**
 * Validate a session and return the user if valid
 */
export async function validateSession(sessionId: string): Promise<SessionUser | null> {
  const [result] = await db
    .select({
      session: sessions,
      user: users
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(
      and(
        eq(sessions.id, sessionId),
        gt(sessions.expiresAt, new Date()),
        eq(users.isActive, true)
      )
    )
    .limit(1)

  if (!result) {
    return null
  }

  return {
    id: result.user.id,
    email: result.user.email,
    name: result.user.name,
    role: result.user.role
  }
}

/**
 * Delete a session (logout)
 */
export async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId))
}

/**
 * Get or create user by email
 */
export async function getOrCreateUser(email: string): Promise<{ id: number; isNew: boolean } | null> {
  // First check if user exists and is active
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1)

  if (existingUser) {
    if (!existingUser.isActive) {
      return null // User is deactivated
    }
    return { id: existingUser.id, isNew: false }
  }

  // User doesn't exist - don't auto-create, only allow existing users
  return null
}

/**
 * Clean up expired tokens and sessions
 */
export async function cleanupExpired(): Promise<void> {
  const now = new Date()

  // Delete expired magic link tokens
  await db
    .delete(magicLinkTokens)
    .where(gt(now, magicLinkTokens.expiresAt))

  // Delete expired sessions
  await db
    .delete(sessions)
    .where(gt(now, sessions.expiresAt))
}
