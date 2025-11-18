<template>
    <header class="bg-white shadow-sm sticky top-0 z-40 transition-all duration-300">
        <div class="container">
            <ClientOnly>
                <div :class="[
                    'flex items-center justify-between transition-all duration-300',
                    isScrolled ? 'h-16' : 'h-24'
                ]">
                    <NuxtLink to="/" class="flex items-center">
                        <img src="/logo/Logo-Toffe-Peren_trans.png" alt="Toffe Peren" :class="[
                            'w-auto object-contain transition-all duration-300',
                            isScrolled ? 'h-12' : 'h-16'
                        ]" />
                    </NuxtLink>

                    <!-- Desktop Navigation -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" class="text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors duration-200 font-medium relative" active-class="text-[rgb(var(--color-primary)/0.8)]">
                            <Heart v-if="item.path === '/favorites'" :class="['w-6 h-6', favoritesCount > 0 && 'fill-current']" />
                            <span v-else>{{ item.name }}</span>
                            <span v-if="item.path === '/favorites' && favoritesCount > 0" class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {{ favoritesCount }}
                            </span>
                        </NuxtLink>
                    </nav>


                    <!-- Mobile menu button -->
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors">
                        <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
                        <X v-else class="h-6 w-6" />
                    </button>
                </div>

                <!-- Mobile Navigation -->
                <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                    <nav v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-[rgb(var(--color-text)/0.1)]">
                        <div class="container py-4 space-y-3">
                            <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" class="flex items-center justify-between py-2 text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors duration-200 font-medium" active-class="text-[rgb(var(--color-primary)/0.8)]" @click="mobileMenuOpen = false">
                                <div class="flex items-center gap-2">
                                    <Heart v-if="item.path === '/favorites'" :class="['w-5 h-5', favoritesCount > 0 && 'fill-current']" />
                                    <span>{{ item.name }}</span>
                                </div>
                                <span v-if="item.path === '/favorites' && favoritesCount > 0" class="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {{ favoritesCount }}
                                </span>
                            </NuxtLink>
                        </div>
                    </nav>
                </Transition>

                <template #fallback>
                    <!-- SSR fallback - render with default height -->
                    <div class="flex items-center justify-between h-24">
                        <NuxtLink to="/" class="flex items-center">
                            <img src="/logo/Logo-Toffe-Peren_trans.png" alt="Toffe Peren" class="h-16 w-auto object-contain" />
                        </NuxtLink>

                        <!-- Desktop Navigation -->
                        <nav class="hidden md:flex items-center space-x-8">
                            <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" class="text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors duration-200 font-medium relative" active-class="text-[rgb(var(--color-primary)/0.8)]">
                                <Heart v-if="item.path === '/favorites'" class="w-6 h-6" />
                                <span v-else>{{ item.name }}</span>
                            </NuxtLink>
                        </nav>

                        <!-- Mobile menu button -->
                        <button class="md:hidden p-2 text-primary">
                            <Menu class="h-6 w-6" />
                        </button>
                    </div>
                </template>
            </ClientOnly>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Heart } from 'lucide-vue-next'
import { useFavorites } from '~/composables/useFavorites'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const { favoritesCount } = useFavorites()

const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Assortiment', path: '/shop' },
    { name: 'Over ons', path: '/over-ons' },
    { name: 'Contact', path: '/contact' },
    { name: 'Favorieten', path: '/favorites' }
]

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>
