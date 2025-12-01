export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server (handled by server middleware for API routes)
  if (import.meta.server) {
    return
  }

  // Allow access to login page
  if (to.path === '/admin/login') {
    return
  }

  const { user, isLoading, fetchUser } = useAdminAuth()

  // Fetch user if not already loaded
  if (!user.value && isLoading.value) {
    await fetchUser()
  }

  // Redirect to login if not authenticated
  if (!user.value) {
    return navigateTo('/admin/login')
  }
})
