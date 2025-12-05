<template>
  <div>
    <div class="mb-8 flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Voorraad beheren</h1>
        <p class="text-gray-600">Beheer de voorraad per variëteit, onderstam en grootte</p>
      </div>
      <button
        @click="showMovementHistory = !showMovementHistory"
        class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
        :class="showMovementHistory ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'"
      >
        {{ showMovementHistory ? 'Verberg historie' : 'Toon historie' }}
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
          <select
            v-model="selectedCategory"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Alle categorieën</option>
            <option v-for="cat in data?.categories" :key="cat.slug" :value="cat.slug">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div class="w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Grootte</label>
          <select
            v-model="selectedSize"
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Alle groottes</option>
            <option v-for="size in data?.sizes" :key="size.id" :value="size.id.toString()">
              {{ size.name }}
            </option>
          </select>
        </div>
        <div class="flex-1 min-w-48">
          <label class="block text-sm font-medium text-gray-700 mb-2">Zoeken</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Zoek op variëteit..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="pending" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Stock table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variëteit
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Onderstam
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grootte
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Voorraad
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Drempel
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acties
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="row in filteredStock" :key="row.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="font-medium text-gray-900">{{ row.variety.name }}</p>
                  <p class="text-xs text-gray-500">{{ row.category.name }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                {{ row.rootstock.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <p class="text-gray-900">{{ row.size.name }}</p>
                  <p class="text-xs text-gray-500">{{ row.price ? `€${row.price}` : 'Geen prijs' }}</p>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  :value="row.stockQuantity"
                  type="number"
                  min="0"
                  class="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  @change="(e: Event) => updateStock(row.id, parseInt((e.target as HTMLInputElement).value))"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  :value="row.lowStockThreshold"
                  type="number"
                  min="0"
                  class="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  title="Voorraad ≤ deze waarde = 'Beperkt' (geel)"
                  @change="(e: Event) => updateThreshold(row.id, parseInt((e.target as HTMLInputElement).value))"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusClasses(row)"
                >
                  {{ getStatusLabel(row) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="toggleAvailable(row.id, !row.isAvailable)"
                  class="text-sm text-gray-600 hover:text-gray-900"
                >
                  {{ row.isAvailable ? 'Deactiveren' : 'Activeren' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredStock.length === 0" class="text-center py-12 text-gray-500">
        Geen voorraad gevonden
      </div>
    </div>

    <!-- Movement History Section -->
    <div v-if="showMovementHistory" class="mt-8">
      <h2 class="text-xl font-bold text-gray-900 mb-4">Voorraad historie</h2>

      <div v-if="movementsPending" class="flex justify-center py-8">
        <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variëteit
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Onderstam / Grootte
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wijziging
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Door
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notitie
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="movement in movementsData?.movements" :key="movement.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(movement.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p class="font-medium text-gray-900">{{ movement.variety.name }}</p>
                    <p class="text-xs text-gray-500">{{ movement.category.name }}</p>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ movement.rootstock.name }} / {{ movement.size.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-sm font-medium rounded-full"
                    :class="movement.quantityChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  >
                    {{ movement.quantityChange > 0 ? '+' : '' }}{{ movement.quantityChange }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">{{ getMovementTypeLabel(movement.movementType) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ movement.createdBy?.name || 'Systeem' }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" :title="movement.notes || ''">
                  {{ movement.notes || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!movementsData?.movements?.length" class="text-center py-12 text-gray-500">
          Geen voorraad wijzigingen gevonden
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

interface StockItem {
  id: number
  stockQuantity: number | null
  lowStockThreshold: number | null
  isAvailable: boolean | null
  variety: { id: number; name: string; slug: string }
  rootstock: { id: number; name: string }
  size: { id: number; name: string; sortOrder: number }
  category: { id: number; name: string; slug: string }
  price: string | null
}

const toast = useToast()

const selectedCategory = ref('')
const selectedSize = ref('')
const searchQuery = ref('')
const showMovementHistory = ref(false)

const { data, pending, refresh } = await useFetch<{
  stock: StockItem[]
  categories: { id: number; name: string; slug: string }[]
  sizes: { id: number; name: string; price: string }[]
}>('/api/admin/stock')

// Fetch movements when history is shown
interface Movement {
  id: number
  quantityChange: number
  movementType: string
  notes: string | null
  createdAt: string
  createdBy: { id: number; name: string; email: string } | null
  variety: { id: number; name: string; slug: string }
  rootstock: { id: number; name: string }
  size: { id: number; name: string }
  category: { id: number; name: string; slug: string }
}

const { data: movementsData, pending: movementsPending, refresh: refreshMovements } = await useFetch<{
  movements: Movement[]
}>('/api/admin/stock/movements', {
  watch: [showMovementHistory],
  immediate: false
})

// Fetch movements when toggled on
watch(showMovementHistory, async (show) => {
  if (show) {
    await refreshMovements()
  }
})

// Format date for display
function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Get Dutch label for movement type
function getMovementTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'initial': 'Initieel',
    'sale': 'Verkoop',
    'restock': 'Herbevoorrading',
    'adjustment': 'Aanpassing',
    'return': 'Retour'
  }
  return labels[type] || type
}

const filteredStock = computed(() => {
  let items = data.value?.stock || []

  if (selectedCategory.value) {
    items = items.filter(item => item.category.slug === selectedCategory.value)
  }

  if (selectedSize.value) {
    items = items.filter(item => item.size.id.toString() === selectedSize.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item =>
      item.variety.name.toLowerCase().includes(query) ||
      item.rootstock.name.toLowerCase().includes(query)
    )
  }

  return items
})

function getStatusClasses(row: StockItem): string {
  if (!row.isAvailable) return 'bg-gray-100 text-gray-700'
  const qty = row.stockQuantity || 0
  const threshold = row.lowStockThreshold || 3
  if (qty <= 0) return 'bg-red-100 text-red-700'
  if (qty <= threshold) return 'bg-yellow-100 text-yellow-700'
  return 'bg-green-100 text-green-700'
}

function getStatusLabel(row: StockItem): string {
  if (!row.isAvailable) return 'Niet beschikbaar'
  const qty = row.stockQuantity || 0
  const threshold = row.lowStockThreshold || 3
  if (qty <= 0) return 'Uitverkocht'
  if (qty <= threshold) return 'Beperkt'
  return 'Op voorraad'
}

async function updateStock(id: number, quantity: number) {
  try {
    await $fetch(`/api/admin/stock/${id}`, {
      method: 'PATCH',
      body: { stockQuantity: quantity }
    })
    toast.add({ title: 'Voorraad bijgewerkt', color: 'green' })
    await refresh()
    if (showMovementHistory.value) {
      await refreshMovements()
    }
  } catch (error) {
    toast.add({ title: 'Kon voorraad niet bijwerken', color: 'red' })
  }
}

async function updateThreshold(id: number, threshold: number) {
  try {
    await $fetch(`/api/admin/stock/${id}`, {
      method: 'PATCH',
      body: { lowStockThreshold: threshold }
    })
    toast.add({ title: 'Drempel bijgewerkt', color: 'green' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Kon drempel niet bijwerken', color: 'red' })
  }
}

async function toggleAvailable(id: number, isAvailable: boolean) {
  try {
    await $fetch(`/api/admin/stock/${id}`, {
      method: 'PATCH',
      body: { isAvailable }
    })
    toast.add({ title: 'Status bijgewerkt', color: 'green' })
    await refresh()
  } catch (error) {
    toast.add({ title: 'Kon status niet bijwerken', color: 'red' })
  }
}
</script>
