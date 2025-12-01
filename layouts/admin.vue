<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center h-16 px-6 border-b border-gray-200">
          <NuxtLink to="/admin" class="flex items-center gap-2">
            <span class="text-xl font-bold text-green-700">Toffe Peren</span>
            <span class="text-xs text-gray-500">Admin</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="[
              $route.path === item.href
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <span class="w-5 h-5 flex items-center justify-center">{{ item.icon }}</span>
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- User info -->
        <div class="p-4 border-t border-gray-200">
          <div class="flex items-center gap-3">
            <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-green-700">
                {{ userInitials }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ user?.name || user?.email }}
              </p>
              <p class="text-xs text-gray-500">
                {{ user?.role === 'admin' ? 'Administrator' : 'Editor' }}
              </p>
            </div>
            <button
              @click="handleLogout"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Uitloggen"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="pl-64">
      <div class="p-8">
        <slot />
      </div>
    </main>

    <!-- Toast notifications -->
    <ToastNotifications />
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAdminAuth()

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '🏠' },
  { name: 'Voorraad', href: '/admin/stock', icon: '📦' },
  { name: 'Variëteiten', href: '/admin/varieties', icon: '🏷️' },
  { name: 'Gebruikers', href: '/admin/users', icon: '👥' }
]

const userInitials = computed(() => {
  if (!user.value) return '?'
  if (user.value.name) {
    return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }
  return user.value.email[0].toUpperCase()
})

async function handleLogout() {
  await logout()
}
</script>
