<template>
    <header class="bg-white shadow-sm sticky top-0 z-40 transition-all duration-300">
        <div class="container">
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
                    <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" class="text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors duration-200 font-medium" active-class="text-[rgb(var(--color-primary)/0.8)]">
                        {{ item.name }}
                    </NuxtLink>
                </nav>


                <!-- Mobile menu button -->
                <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors">
                    <Menu v-if="!mobileMenuOpen" class="h-6 w-6" />
                    <X v-else class="h-6 w-6" />
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <nav v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-[rgb(var(--color-text)/0.1)]">
                <div class="container py-4 space-y-3">
                    <NuxtLink v-for="item in navigationItems" :key="item.path" :to="item.path" class="block py-2 text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors duration-200 font-medium" active-class="text-[rgb(var(--color-primary)/0.8)]" @click="mobileMenuOpen = false">
                        {{ item.name }}
                    </NuxtLink>
                </div>
            </nav>
        </Transition>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Assortiment', path: '/shop' },
    { name: 'Over ons', path: '/over-ons' },
    { name: 'Contact', path: '/contact' }
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
