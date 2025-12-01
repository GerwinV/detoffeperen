<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gebruikers</h1>
        <p class="text-gray-600">Beheer wie toegang heeft tot de admin</p>
      </div>
      <button
        @click="showAddModal = true"
        class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <span>+</span>
        Gebruiker toevoegen
      </button>
    </div>

    <!-- Not admin warning -->
    <div
      v-if="!isAdmin"
      class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
    >
      <p class="text-sm font-medium text-yellow-800">Alleen voor administrators</p>
      <p class="text-sm text-yellow-700">Je hebt geen toegang tot deze pagina.</p>
    </div>

    <!-- Loading state -->
    <div v-else-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Users table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gebruiker
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Laatst ingelogd
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="row in data?.users" :key="row.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div>
                <p class="font-medium text-gray-900">{{ row.name || '-' }}</p>
                <p class="text-sm text-gray-500">{{ row.email }}</p>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                :class="row.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
              >
                {{ row.role === 'admin' ? 'Administrator' : 'Editor' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                :class="row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ row.isActive ? 'Actief' : 'Inactief' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-500">
              {{ row.lastLoginAt ? formatDate(row.lastLoginAt) : 'Nooit' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add user modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50" @click="showAddModal = false"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Nieuwe gebruiker</h2>

          <form @submit.prevent="addUser" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newUser.email"
                type="email"
                placeholder="gebruiker@email.nl"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Naam</label>
              <input
                v-model="newUser.name"
                type="text"
                placeholder="Volledige naam"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Rol</label>
              <select
                v-model="newUser.role"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="editor">Editor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div class="flex gap-3 justify-end pt-4">
              <button
                type="button"
                @click="showAddModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuleren
              </button>
              <button
                type="submit"
                :disabled="isAdding"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isAdding ? 'Bezig...' : 'Toevoegen' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { isAdmin } = useAdminAuth()
const toast = useToast()

const showAddModal = ref(false)
const isAdding = ref(false)
const newUser = ref({
  email: '',
  name: '',
  role: 'editor'
})

const { data, pending, refresh } = await useFetch('/api/admin/users', {
  immediate: isAdmin.value
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

async function addUser() {
  if (!newUser.value.email) return

  isAdding.value = true
  try {
    await $fetch('/api/admin/users', {
      method: 'POST',
      body: newUser.value
    })
    toast.add({ title: 'Gebruiker toegevoegd', color: 'green' })
    showAddModal.value = false
    newUser.value = { email: '', name: '', role: 'editor' }
    await refresh()
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Kon gebruiker niet toevoegen',
      color: 'red'
    })
  } finally {
    isAdding.value = false
  }
}
</script>
