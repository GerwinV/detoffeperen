import { verifyMagicLinkToken, getOrCreateUser, createSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = query.token as string

  if (!token) {
    // Redirect to login with error
    return sendRedirect(event, '/admin/login?error=invalid_token')
  }

  try {
    // Verify the token
    const email = await verifyMagicLinkToken(token)

    if (!email) {
      return sendRedirect(event, '/admin/login?error=expired_token')
    }

    // Get the user
    const user = await getOrCreateUser(email)

    if (!user) {
      return sendRedirect(event, '/admin/login?error=user_not_found')
    }

    // Create session
    const sessionId = await createSession(user.id)

    // Set session cookie
    const isProduction = process.env.NODE_ENV === 'production'
    setCookie(event, 'session', sessionId, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    // Redirect to admin dashboard
    return sendRedirect(event, '/admin')
  } catch (error) {
    console.error('Failed to verify token:', error)
    return sendRedirect(event, '/admin/login?error=verification_failed')
  }
})
