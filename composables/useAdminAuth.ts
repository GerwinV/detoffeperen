interface User {
  id: number
  email: string
  name: string | null
  role: string | null
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAdminAuth() {
  const user = useState<User | null>('admin-user', () => null)
  const isLoading = useState('admin-auth-loading', () => true)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function fetchUser() {
    isLoading.value = true
    try {
      const response = await $fetch<{ user: User }>('/api/auth/me')
      user.value = response.user
    } catch (error) {
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function login(email: string) {
    const response = await $fetch<{ success: boolean; message: string }>('/api/auth/login', {
      method: 'POST',
      body: { email }
    })
    return response
  }

  async function logout() {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    user.value = null
    await navigateTo('/admin/login')
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    fetchUser,
    login,
    logout
  }
}
