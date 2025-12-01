import { validateSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session')

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      message: 'Niet ingelogd'
    })
  }

  const user = await validateSession(sessionId)

  if (!user) {
    // Clear invalid session cookie
    deleteCookie(event, 'session', {
      path: '/'
    })

    throw createError({
      statusCode: 401,
      message: 'Sessie verlopen'
    })
  }

  return {
    user
  }
})
