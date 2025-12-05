import { validateSession, type SessionUser } from '../utils/auth'

declare module 'h3' {
  interface H3EventContext {
    user?: SessionUser
  }
}

export default defineEventHandler(async (event) => {
  // Only apply to /api/admin routes
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/api/admin')) {
    return
  }

  const sessionId = getCookie(event, 'session')

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      message: 'Niet ingelogd'
    })
  }

  const user = await validateSession(sessionId)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Sessie verlopen'
    })
  }

  // Attach user to context for use in handlers
  event.context.user = user
})
