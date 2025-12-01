<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Variëteiten</h1>
      <p class="text-gray-600">Beheer welke variëteiten zichtbaar zijn op de website</p>
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
            class="px-6 py-4 flex items-center justify-between"
          >
            <div>
              <p class="font-medium text-gray-900">{{ variety.name }}</p>
              <p class="text-sm text-gray-500">{{ variety.latinName }}</p>
            </div>
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

const toast = useToast()

const { data, pending, refresh } = await useFetch<{ varieties: Variety[] }>('/api/admin/varieties')

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
