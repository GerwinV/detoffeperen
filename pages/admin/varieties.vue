<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Variëteiten</h1>
        <p class="text-gray-600">Beheer alle fruitboom variëteiten</p>
      </div>
      <button
        v-if="isAdmin"
        @click="openAddModal"
        class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <span>+</span>
        Variëteit toevoegen
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Varieties by category -->
    <div v-else class="space-y-6">
      <div v-for="category in groupedVarieties" :key="category.slug" class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">{{ category.name }}</h2>
        </div>

        <div class="divide-y divide-gray-200">
          <div
            v-for="variety in category.varieties"
            :key="variety.id"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
          >
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ variety.name }}</p>
              <p class="text-sm text-gray-500">{{ variety.latinName || 'Geen Latijnse naam' }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                v-if="isAdmin"
                @click="openEditModal(variety)"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                Bewerken
              </button>
              <button
                @click="toggleActive(variety.id, !variety.isActive)"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                :class="variety.isActive ? 'bg-green-600' : 'bg-gray-200'"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="variety.isActive ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50" @click="showModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ editingVariety ? 'Variëteit bewerken' : 'Nieuwe variëteit' }}
            </h2>
          </div>

          <form @submit.prevent="saveVariety" class="p-6 space-y-4">
            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Categorie <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.categoryId"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Selecteer categorie</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Name -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Naam <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="bijv. Elstar"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Latijnse naam</label>
                <input
                  v-model="formData.latinName"
                  type="text"
                  placeholder="bijv. Malus domestica"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Korte beschrijving</label>
              <textarea
                v-model="formData.description"
                rows="2"
                placeholder="Korte beschrijving voor overzichten"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <!-- Full description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Volledige beschrijving</label>
              <textarea
                v-model="formData.fullDescription"
                rows="4"
                placeholder="Uitgebreide beschrijving voor detailpagina"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <!-- Harvest & Blossom time -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Oogsttijd</label>
                <input
                  v-model="formData.harvestTime"
                  type="text"
                  placeholder="bijv. September - Oktober"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bloeitijd</label>
                <input
                  v-model="formData.blossomTime"
                  type="text"
                  placeholder="bijv. April - Mei"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <!-- Origin & Pollination -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Herkomst</label>
                <input
                  v-model="formData.origin"
                  type="text"
                  placeholder="bijv. Nederland"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bestuiving</label>
                <input
                  v-model="formData.pollination"
                  type="text"
                  placeholder="bijv. Zelfbestuivend"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <!-- Fruit color & Taste -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Vruchtkleur</label>
                <input
                  v-model="formData.fruitColor"
                  type="text"
                  placeholder="bijv. Rood met geel"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Smaak</label>
                <input
                  v-model="formData.taste"
                  type="text"
                  placeholder="bijv. Zoet en sappig"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <!-- Rootstocks (only when editing) -->
            <div v-if="editingVariety && allRootstocks.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-2">Onderstammen</label>
              <div class="space-y-2 p-3 bg-gray-50 rounded-lg">
                <label
                  v-for="rootstock in allRootstocks"
                  :key="rootstock.id"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="rootstock.id"
                    v-model="selectedRootstocks"
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span class="text-sm text-gray-700">{{ rootstock.name }}</span>
                </label>
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Selecteer welke onderstammen beschikbaar zijn voor deze variëteit
              </p>
            </div>

            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
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

interface Variety {
  id: number
  name: string
  latinName: string | null
  slug: string
  isActive: boolean | null
  categoryId: number
  categoryName: string
  categorySlug: string
}

interface Category {
  id: number
  name: string
  slug: string
}

interface Rootstock {
  id: number
  name: string
}

const { isAdmin } = useAdminAuth()
const toast = useToast()

const showModal = ref(false)
const isSaving = ref(false)
const editingVariety = ref<Variety | null>(null)
const allRootstocks = ref<Rootstock[]>([])
const selectedRootstocks = ref<number[]>([])
const categories = ref<Category[]>([])

const formData = ref({
  categoryId: '',
  name: '',
  latinName: '',
  description: '',
  fullDescription: '',
  harvestTime: '',
  blossomTime: '',
  origin: '',
  fruitColor: '',
  taste: '',
  pollination: ''
})

const { data, pending, refresh } = await useFetch<{ varieties: Variety[] }>('/api/admin/varieties')

// Fetch categories for the dropdown
const { data: categoriesData } = await useFetch<{ categories: Category[] }>('/api/admin/pricing')
watch(categoriesData, (newData) => {
  if (newData?.categories) {
    categories.value = newData.categories
  }
}, { immediate: true })

const groupedVarieties = computed(() => {
  const varieties = data.value?.varieties || []
  const groups: Record<string, { name: string; slug: string; varieties: Variety[] }> = {}

  for (const variety of varieties) {
    if (!groups[variety.categorySlug]) {
      groups[variety.categorySlug] = {
        name: variety.categoryName,
        slug: variety.categorySlug,
        varieties: []
      }
    }
    groups[variety.categorySlug].varieties.push(variety)
  }

  return Object.values(groups)
})

function openAddModal() {
  editingVariety.value = null
  allRootstocks.value = []
  selectedRootstocks.value = []
  formData.value = {
    categoryId: '',
    name: '',
    latinName: '',
    description: '',
    fullDescription: '',
    harvestTime: '',
    blossomTime: '',
    origin: '',
    fruitColor: '',
    taste: '',
    pollination: ''
  }
  showModal.value = true
}

async function openEditModal(variety: Variety) {
  editingVariety.value = variety

  // Fetch full variety details including rootstocks
  try {
    const details = await $fetch<{
      variety: any
      assignedRootstockIds: number[]
      allRootstocks: Rootstock[]
    }>(`/api/admin/varieties/${variety.id}`)

    formData.value = {
      categoryId: details.variety.categoryId.toString(),
      name: details.variety.name,
      latinName: details.variety.latinName || '',
      description: details.variety.description || '',
      fullDescription: details.variety.fullDescription || '',
      harvestTime: details.variety.harvestTime || '',
      blossomTime: details.variety.blossomTime || '',
      origin: details.variety.origin || '',
      fruitColor: details.variety.fruitColor || '',
      taste: details.variety.taste || '',
      pollination: details.variety.pollination || ''
    }
    allRootstocks.value = details.allRootstocks
    selectedRootstocks.value = details.assignedRootstockIds
  } catch (error) {
    toast.add({ title: 'Kon variëteit niet laden', color: 'red' })
    return
  }

  showModal.value = true
}

async function saveVariety() {
  if (!formData.value.categoryId || !formData.value.name) {
    return
  }

  isSaving.value = true
  try {
    if (editingVariety.value) {
      // Update existing variety
      await $fetch(`/api/admin/varieties/${editingVariety.value.id}`, {
        method: 'PATCH',
        body: formData.value
      })

      // Update rootstocks if changed
      if (allRootstocks.value.length > 0) {
        await $fetch(`/api/admin/varieties/${editingVariety.value.id}/rootstocks`, {
          method: 'POST',
          body: { rootstockIds: selectedRootstocks.value }
        })
      }

      toast.add({ title: 'Variëteit bijgewerkt', color: 'green' })
    } else {
      // Create new variety
      await $fetch('/api/admin/varieties', {
        method: 'POST',
        body: formData.value
      })
      toast.add({ title: 'Variëteit toegevoegd', color: 'green' })
    }
    showModal.value = false
    await refresh()
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Kon variëteit niet opslaan',
      color: 'red'
    })
  } finally {
    isSaving.value = false
  }
}

async function toggleActive(id: number, isActive: boolean) {
  try {
    await $fetch(`/api/admin/varieties/${id}`, {
      method: 'PATCH',
      body: { isActive }
    })
    toast.add({
      title: isActive ? 'Variëteit geactiveerd' : 'Variëteit gedeactiveerd',
      color: 'green'
    })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Kon status niet bijwerken', color: 'red' })
  }
}
</script>
