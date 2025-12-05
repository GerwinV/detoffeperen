import { createMagicLinkToken, getOrCreateUser } from '../../utils/auth'
import { sendMagicLinkEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body?.email?.toLowerCase()?.trim()

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is verplicht'
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Ongeldig emailadres'
    })
  }

  // Check if user exists and is active
  const user = await getOrCreateUser(email)

  if (!user) {
    // Don't reveal whether the email exists or not for security
    // Just return success message
    return {
      success: true,
      message: 'Als dit emailadres bij ons bekend is, ontvang je binnen enkele minuten een login link.'
    }
  }

  try {
    // Create magic link token
    const token = await createMagicLinkToken(email)

    // Send email
    await sendMagicLinkEmail(email, token)

    return {
      success: true,
      message: 'Als dit emailadres bij ons bekend is, ontvang je binnen enkele minuten een login link.'
    }
  } catch (error) {
    console.error('Failed to send magic link:', error)
    throw createError({
      statusCode: 500,
      message: 'Er ging iets mis bij het versturen van de login link. Probeer het later opnieuw.'
    })
  }
})
