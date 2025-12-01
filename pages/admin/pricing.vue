<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Prijzen</h1>
      <p class="text-gray-600">Stel prijzen in per categorie en grootte</p>
    </div>

    <!-- Not admin warning -->
    <div
      v-if="!isAdmin"
      class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
    >
      <p class="text-sm font-medium text-yellow-800">Alleen voor administrators</p>
      <p class="text-sm text-yellow-700">Je kunt prijzen alleen bekijken, niet bewerken.</p>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Pricing matrix -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categorie
              </th>
              <th
                v-for="size in data?.sizes"
                :key="size.id"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ size.name }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in data?.categories" :key="category.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {{ category.name }}
              </td>
              <td
                v-for="size in data?.sizes"
                :key="size.id"
                class="px-6 py-4 whitespace-nowrap text-center"
              >
                <div class="flex items-center justify-center gap-1">
                  <span class="text-gray-500">€</span>
                  <input
                    :value="getPrice(category.id, size.id)"
                    type="number"
                    min="0"
                    step="0.01"
                    :disabled="!isAdmin"
                    class="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    @change="(e: Event) => updatePrice(category.id, size.id, parseFloat((e.target as HTMLInputElement).value))"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!data?.categories?.length || !data?.sizes?.length" class="text-center py-12 text-gray-500">
        <p v-if="!data?.categories?.length">Geen categorieën gevonden</p>
        <p v-else-if="!data?.sizes?.length">Geen groottes gevonden. <NuxtLink to="/admin/sizes" class="text-green-600 hover:text-green-700">Voeg eerst groottes toe.</NuxtLink></p>
      </div>
    </div>

    <!-- Help text -->
    <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <p class="text-sm text-blue-800">
        <strong>Tip:</strong> Prijzen worden automatisch opgeslagen wanneer je een veld verlaat.
        Lege velden betekenen dat er geen prijs is ingesteld voor die combinatie.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

interface Category {
  id: number
  name: string
  slug: string
}

interface Size {
  id: number
  name: string
  minHeight: number
  maxHeight: number
}

interface PriceMatrix {
  [categoryId: number]: {
    [sizeId: number]: {
      id: number
      price: string
    }
  }
}

const { isAdmin } = useAdminAuth()
const toast = useToast()

const { data, pending, refresh } = await useFetch<{
  categories: Category[]
  sizes: Size[]
  prices: PriceMatrix
}>('/api/admin/pricing')

function getPrice(categoryId: number, sizeId: number): string {
  const price = data.value?.prices?.[categoryId]?.[sizeId]?.price
  return price || ''
}

async function updatePrice(categoryId: number, sizeId: number, price: number) {
  if (isNaN(price) || price < 0) {
    return
  }

  try {
    await $fetch('/api/admin/pricing', {
      method: 'PATCH',
      body: {
        categoryId,
        sizeId,
        price
      }
    })
    toast.add({ title: 'Prijs bijgewerkt', color: 'green' })
    await refresh()
  } catch (error: any) {
    toast.add({
      title: error.data?.message || 'Kon prijs niet bijwerken',
      color: 'red'
    })
  }
}
</script>
