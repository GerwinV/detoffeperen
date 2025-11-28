<template>
    <div>
        <!-- Page Header -->
        <section class="bg-white py-8 md:py-12 border-b border-[rgb(var(--color-text)/0.1)]">
            <div class="container">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-3xl md:text-4xl font-bold text-text mb-4 uppercase tracking-wide">
                        Mijn Favorieten
                    </h1>
                    <ClientOnly>
                        <p class="text-[rgb(var(--color-text)/0.7)]">
                            {{ favoritesCount }} {{ favoritesCount === 1 ? 'variëteit' : 'variëteiten' }} opgeslagen
                        </p>
                        <template #fallback>
                            <p class="text-[rgb(var(--color-text)/0.7)]">
                                Laden...
                            </p>
                        </template>
                    </ClientOnly>
                </div>
            </div>
        </section>

        <!-- Favorites Grid or Empty State -->
        <section class="py-12 md:py-16">
            <div class="container">
                <ClientOnly>
                    <!-- Empty State -->
                    <div v-if="favorites.length === 0" class="text-center py-12">
                        <Heart class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 class="text-2xl font-bold text-text mb-2">Geen favorieten</h2>
                        <p class="text-[rgb(var(--color-text)/0.7)] mb-6">
                            Je hebt nog geen variëteiten toegevoegd aan je favorieten.
                        </p>
                        <BaseButton to="/shop" variant="primary">
                            Bekijk Assortiment
                        </BaseButton>
                    </div>

                    <!-- Favorites Grid -->
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    <div v-for="favorite in favorites" :key="`${favorite.category}-${favorite.slug}`" class="group bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-4 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
                        <!-- Remove button -->
                        <button @click="handleRemoveFavorite(favorite)" class="absolute top-4 right-4 z-10 p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200" title="Verwijder van favorieten">
                            <X class="w-5 h-5" />
                        </button>

                        <!-- Category badge -->
                        <div class="mb-3">
                            <span class="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary)/0.3)]">
                                {{ getCategoryName(favorite.category) }}
                            </span>
                        </div>

                        <div class="pr-8">
                            <h3 class="text-lg font-semibold text-text mb-3">
                                {{ favorite.name }}
                            </h3>

                            <!-- Harvest Time if available -->
                            <div v-if="favorite.harvestTime" class="mb-3">
                                <span class="inline-flex items-center text-sm text-[rgb(var(--color-text)/0.7)]">
                                    <Calendar class="w-4 h-4 mr-1.5 text-primary" />
                                    {{ favorite.harvestTime }}
                                </span>
                            </div>

                            <!-- Description -->
                            <p class="text-sm text-[rgb(var(--color-text)/0.8)] mb-4 line-clamp-3">
                                {{ favorite.description }}
                            </p>

                            <!-- Rootstocks -->
                            <div class="space-y-2 mb-4">
                                <p class="text-xs font-medium text-[rgb(var(--color-text)/0.6)] uppercase tracking-wider">
                                    Onderstammen:
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="rootstock in favorite.rootstocks" :key="rootstock" class="inline-block px-2.5 py-1 bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] rounded-full text-xs font-medium border border-[rgb(var(--color-primary)/0.3)]">
                                        {{ rootstock }}
                                    </span>
                                </div>
                            </div>

                            <!-- View Details Button -->
                            <button @click="openVarietyModal(favorite)" class="inline-flex items-center text-sm font-medium text-primary hover:text-[rgb(var(--color-primary)/0.8)] transition-colors">
                                Bekijk details
                                <ChevronRight class="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                    <!-- Email Text Section -->
                    <div v-if="favorites.length > 0" class="mt-12 max-w-7xl mx-auto">
                    <div class="bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg p-6 shadow-sm">
                        <h3 class="text-lg font-bold text-text mb-3">Kopieer voor e-mail</h3>
                        <p class="text-sm text-[rgb(var(--color-text)/0.7)] mb-4">
                            Gebruik onderstaande tekst om jouw favorieten met ons te delen
                        </p>

                        <!-- Email Text Display -->
                        <div class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-4 mb-4 font-mono text-sm text-text whitespace-pre-wrap border border-[rgb(var(--color-text)/0.1)]">{{ emailText }}</div>

                        <!-- Email Buttons -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <!-- Gmail Button -->
                            <a
                                :href="gmailUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                            >
                                <Mail class="w-5 h-5" />
                                <span>Gmail</span>
                            </a>

                            <!-- Outlook Button -->
                            <a
                                :href="outlookUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                            >
                                <Mail class="w-5 h-5" />
                                <span>Outlook</span>
                            </a>

                            <!-- Copy Button -->
                            <button
                                @click="copyToClipboard"
                                :class="[
                                    'flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200',
                                    copied
                                        ? 'bg-green-50 text-green-700 border-2 border-green-200'
                                        : 'bg-primary text-white hover:bg-primary/90 border-2 border-primary'
                                ]"
                            >
                                <Check v-if="copied" class="w-5 h-5" />
                                <Copy v-else class="w-5 h-5" />
                                <span>{{ copied ? 'Gekopieerd!' : 'Kopieer' }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                    <!-- Contact CTA -->
                    <div v-if="favorites.length > 0" class="mt-8 text-center">
                        <div class="inline-block bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg px-6 py-4 max-w-2xl shadow-sm">
                            <p class="text-sm text-text mb-4">
                                Interesse in één of meerdere van deze variëteiten?
                            </p>
                            <BaseButton to="/contact" variant="primary">
                                Neem contact op
                            </BaseButton>
                        </div>
                    </div>

                    <template #fallback>
                        <div class="text-center py-12">
                            <p class="text-[rgb(var(--color-text)/0.7)]">Favorieten laden...</p>
                        </div>
                    </template>
                </ClientOnly>
            </div>
        </section>

        <!-- Variety Modal -->
        <VarietyModal v-model="showVarietyModal" :variety="selectedVariety" :category="selectedCategory" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Heart, X, Calendar, ChevronRight, Copy, Check, Mail } from 'lucide-vue-next'
import { useFavorites } from '~/composables/useFavorites'
import type { Favorite } from '~/composables/useFavorites'
import { useTreeData } from '~/composables/useTreeData'
import VarietyModal from '~/components/VarietyModal.vue'

const { favorites, favoritesCount, removeFromFavorites } = useFavorites()
const { getVarietyBySlug } = useTreeData()

const showVarietyModal = ref(false)
const selectedVariety = ref<Favorite | null>(null)
const selectedCategory = ref<string | null>(null)
const copied = ref(false)

const getCategoryName = (slug: string): string => {
    const categoryNames: Record<string, string> = {
        'appelbomen': 'Appelbomen',
        'perenbomen': 'Perenbomen',
        'nashi-peren': 'Nashiperen'
    }
    return categoryNames[slug] || slug
}

const handleRemoveFavorite = (favorite: Favorite) => {
    removeFromFavorites(favorite.slug, favorite.category)
}

const openVarietyModal = (favorite: Favorite) => {
    // Haal de volledige variety data op (inclusief fullDescription, origin, etc.)
    const fullVariety = getVarietyBySlug(favorite.category, favorite.slug)
    selectedVariety.value = fullVariety || favorite
    selectedCategory.value = favorite.category
    showVarietyModal.value = true
}

// Generate email text from favorites
const emailText = computed(() => {
    if (favorites.value.length === 0) return ''

    let text = 'Ik heb interesse in de volgende variëteiten:\n\n'

    favorites.value.forEach((favorite) => {
        const categoryName = getCategoryName(favorite.category)
        const rootstocks = favorite.rootstocks.join(', ')
        text += `- ${favorite.name} (${categoryName}, onderstammen: ${rootstocks})\n`
    })

    return text
})

// Generate Gmail compose URL
const gmailUrl = computed(() => {
    const subject = 'Interesse in variëteiten'
    const body = emailText.value
    const to = 'info@voedselbospeize.nl'

    return `https://mail.google.com/mail/?to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`
})

// Generate Outlook compose URL
const outlookUrl = computed(() => {
    const subject = 'Interesse in variëteiten'
    const body = emailText.value
    const to = 'info@voedselbospeize.nl'

    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

// Copy to clipboard
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(emailText.value)
        copied.value = true

        // Reset after 2 seconds
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (error) {
        console.error('Failed to copy:', error)
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = emailText.value
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            copied.value = true
            setTimeout(() => {
                copied.value = false
            }, 2000)
        } catch (err) {
            console.error('Fallback copy failed:', err)
        }
        document.body.removeChild(textArea)
    }
}

// Set page meta
useHead({
    title: 'Mijn Favorieten - Toffe Peren'
})
</script>
