<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Toffe Peren Admin</h1>
          <p class="mt-2 text-gray-600">Log in met je email</p>
        </div>

        <!-- Error message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-sm text-red-700">{{ errorMessage }}</p>
        </div>

        <!-- Success message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <p class="text-sm font-medium text-green-800">Check je email</p>
          <p class="text-sm text-green-700 mt-1">{{ successMessage }}</p>
        </div>

        <!-- Login form -->
        <form v-if="!successMessage" @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="jouw@email.nl"
              :disabled="isLoading"
              required
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Bezig...' : 'Verstuur login link' }}
          </button>
        </form>

        <!-- Back link -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700">
            &larr; Terug naar de website
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const { login, user, fetchUser } = useAdminAuth()

const email = ref('')
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Check for error from redirect
const errorMap: Record<string, string> = {
  invalid_token: 'Ongeldige login link',
  expired_token: 'De login link is verlopen. Vraag een nieuwe aan.',
  user_not_found: 'Je hebt geen toegang tot de admin',
  verification_failed: 'Er ging iets mis bij het inloggen. Probeer het opnieuw.'
}

onMounted(async () => {
  // Check if user is already logged in
  await fetchUser()
  if (user.value) {
    await navigateTo('/admin')
    return
  }

  // Check for error query param
  const error = route.query.error as string
  if (error && errorMap[error]) {
    errorMessage.value = errorMap[error]
  }
})

async function handleSubmit() {
  if (!email.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await login(email.value)
    successMessage.value = response.message
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Er ging iets mis. Probeer het later opnieuw.'
  } finally {
    isLoading.value = false
  }
}
</script>
