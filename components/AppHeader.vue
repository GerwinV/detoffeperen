<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="container">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <PearIcon class="h-8 w-8 text-primary" />
          <span class="text-xl font-bold text-text font-playfair">Toffe Peren</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-text hover:text-primary transition-colors duration-200 font-medium"
            active-class="text-primary"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>


        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-text hover:text-primary transition-colors"
        >
          <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="container py-4 space-y-3">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="block py-2 text-text hover:text-primary transition-colors duration-200 font-medium"
            active-class="text-primary"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import PearIcon from '~/components/icons/PearIcon.vue'

const mobileMenuOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Contact', path: '/contact' }
]
</script>