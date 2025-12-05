<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Welkom terug, {{ user?.name || user?.email }}</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-lg shadow p-6"
      >
        <div class="flex items-center gap-4">
          <div class="p-3 rounded-lg" :class="stat.bgColor">
            <span class="text-2xl">{{ stat.icon }}</span>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">Snelle acties</h2>
        </div>
        <div class="p-6 space-y-3">
          <NuxtLink
            to="/admin/stock"
            class="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>📦</span>
            Voorraad beheren
          </NuxtLink>
          <NuxtLink
            to="/admin/varieties"
            class="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>🏷️</span>
            Variëteiten bekijken
          </NuxtLink>
          <NuxtLink
            v-if="isAdmin"
            to="/admin/users"
            class="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span>👥</span>
            Gebruikers beheren
          </NuxtLink>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="font-semibold text-gray-900">Recente activiteit</h2>
        </div>
        <div class="p-6">
          <div v-if="recentActivity.length === 0" class="text-center py-8 text-gray-500">
            Nog geen activiteit geregistreerd
          </div>
          <div v-else class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3">
              <div class="w-2 h-2 mt-2 rounded-full" :class="activity.color"></div>
              <div>
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
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

const { user, isAdmin } = useAdminAuth()

// Fetch stats from API
const { data: statsData } = await useFetch('/api/admin/stats')

const stats = computed(() => {
  const threshold = statsData.value?.lowStockThreshold ?? 10
  return [
    {
      label: 'Variëteiten',
      value: statsData.value?.totalVarieties ?? 0,
      icon: '🏷️',
      bgColor: 'bg-blue-100'
    },
    {
      label: `Op voorraad (≥${threshold})`,
      value: statsData.value?.inStock ?? 0,
      icon: '✅',
      bgColor: 'bg-green-100'
    },
    {
      label: `Beperkt (<${threshold})`,
      value: statsData.value?.lowStock ?? 0,
      icon: '⚠️',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Niet beschikbaar',
      value: statsData.value?.outOfStock ?? 0,
      icon: '❌',
      bgColor: 'bg-red-100'
    }
  ]
})

const recentActivity = ref<{ id: number; description: string; time: string; color: string }[]>([])
</script>
