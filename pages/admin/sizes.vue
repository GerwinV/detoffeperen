<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Groottes</h1>
        <p class="text-gray-600">Beheer de hoogte-categorieën voor bomen</p>
      </div>
      <button
        v-if="isAdmin"
        @click="openAddModal"
        class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <span>+</span>
        Grootte toevoegen
      </button>
    </div>

    <!-- Not admin warning -->
    <div
      v-if="!isAdmin"
      class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
    >
      <p class="text-sm font-medium text-yellow-800">Alleen voor administrators</p>
      <p class="text-sm text-yellow-700">Je kunt groottes alleen bekijken, niet bewerken.</p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Sizes table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Naam
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Min hoogte
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Max hoogte
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volgorde
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th v-if="isAdmin" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acties
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="size in data?.sizes" :key="size.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
              {{ size.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">
              {{ size.minHeight }} cm
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">
              {{ size.maxHeight }} cm
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-gray-600">
              {{ size.sortOrder }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                :class="size.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
              >
                {{ size.isActive ? 'Actief' : 'Inactief' }}
              </span>
            </td>
            <td v-if="isAdmin" class="px-6 py-4 whitespace-nowrap">
              <div class="flex gap-2">
                <button
                  @click="openEditModal(size)"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  Bewerken
                </button>
                <button
                  @click="deleteSize(size.id)"
                  class="text-sm text-red-600 hover:text-red-800"
                >
                  Verwijderen
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!data?.sizes?.length" class="text-center py-12 text-gray-500">
        Geen groottes gevonden
      </div>
    </div>

    <!-- Add/Edit modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">
            {{ editingSize ? 'Grootte bewerken' : 'Nieuwe grootte' }}
          </h2>

          <form @submit.prevent="saveSize" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Naam <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="bijv. 60-100 cm"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Min hoogte (cm) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="formData.minHeight"
                  type="number"
                  min="0"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Max hoogte (cm) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="formData.maxHeight"
                  type="number"
                  min="0"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Volgorde</label>
              <input
                v-model.number="formData.sortOrder"
                type="number"
                min="0"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div v-if="editingSize" class="flex items-center gap-2">
              <input
                id="isActive"
                v-model="formData.isActive"
                type="checkbox"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label for="isActive" class="text-sm text-gray-700">Actief</label>
            </div>

            <div class="flex gap-3 justify-end pt-4">
              <button
                type="button"
                @click="showModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Annuleren
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSaving ? 'Bezig...' : 'Opslaan' }}
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

interface Size {
  id: number
  name: string
  minHeight: number
  maxHeight: number
  sortOrder: number | null
  isActive: boolean | null
}

const { isAdmin } = useAdminAuth()
const toast = useToast()

const showModal = ref(false)
const isSaving = ref(false)
const editingSize = ref<Size | null>(null)
const formData = ref({
  name: '',
  minHeight: 0,
  maxHeight: 0,
  sortOrder: 0,
  isActive: true
})

const { data, pending, refresh } = await useFetch<{ sizes: Size[] }>('/api/admin/sizes')

function openAddModal() {
  editingSize.value = null
  formData.value = {
    name: '',
    minHeight: 0,
    maxHeight: 0,
    sortOrder: 0,
    isActive: true
  }
  showModal.value = true
}

function openEditModal(size: Size) {
  editingSize.value = size
  formData.value = {
    name: size.name,
    minHeight: size.minHeight,
    maxHeight: size.maxHeight,
    sortOrder: size.sortOrder || 0,
    isActive: size.isActive !== false
  }
  showModal.value = true
}

async function saveSize() {
  if (!formData.value.name || formData.value.minHeight === undefined || formData.value.maxHeight === undefined) {
    return
  }

  isSaving.value = true
  try {
    if (editingSize.value) {
      await $fetch(`/api/admin/sizes/${editingSize.value.id}`, {
        method: 'PATCH',
        body: formData.value
      })
      toast.add({ title: 'Grootte bijgewerkt', color: 'green' })
    } else {
      await $fetch('/api/admin/sizes', {
        method: 'POST',
        body: formData.value
      })
      toast.add({ title: 'Grootte toegevoegd', color: 'green' })
    }
    showModal.value = false
    await refresh()
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Kon grootte niet opslaan',
      color: 'red'
    })
  } finally {
    isSaving.value = false
  }
}

async function deleteSize(id: number) {
  if (!confirm('Weet je zeker dat je deze grootte wilt verwijderen?')) {
    return
  }

  try {
    await $fetch(`/api/admin/sizes/${id}`, {
      method: 'DELETE'
    })
    toast.add({ title: 'Grootte verwijderd', color: 'green' })
    await refresh()
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Kon grootte niet verwijderen',
      color: 'red'
    })
  }
}
</script>
