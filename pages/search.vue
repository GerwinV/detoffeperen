<template>
    <div class="min-h-screen bg-background py-8 md:py-12">
        <div class="container mx-auto px-4 max-w-7xl">
            <!-- Results Header -->
            <div v-if="searchQuery" class="mb-8">
                <h1 class="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-text mb-2">
                    Zoekresultaten
                </h1>
                <p class="text-lg text-text/70">
                    <span v-if="results.length > 0">
                        {{ results.length }} {{ results.length === 1 ? 'resultaat' : 'resultaten' }} gevonden voor
                        <span class="font-semibold text-primary">"{{ searchQuery }}"</span>
                    </span>
                    <span v-else>
                        Geen resultaten gevonden voor
                        <span class="font-semibold text-primary">"{{ searchQuery }}"</span>
                    </span>
                </p>
            </div>

            <!-- Results Grid -->
            <div v-if="results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link
                    v-for="variety in results"
                    :key="`${variety.categorySlug}-${variety.slug}`"
                    :to="`/shop/${variety.categorySlug}?variety=${variety.slug}`"
                    class="bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] overflow-hidden hover:shadow-md transition-shadow"
                >
                    <!-- Category Badge -->
                    <div class="relative">
                        <NuxtImg
                            :src="variety.categoryImage"
                            :alt="variety.categoryName"
                            width="400"
                            height="192"
                            class="w-full h-48 object-cover"
                        />
                        <div class="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-text">
                            {{ variety.categoryName }}
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-5">
                        <!-- Name -->
                        <h3 class="text-xl font-serif font-bold text-text mb-1" v-html="highlightMatch(variety.name, searchQuery)"></h3>

                        <!-- Latin Name -->
                        <p class="text-sm text-text/60 italic mb-3" v-html="highlightMatch(variety.latinName, searchQuery)"></p>

                        <!-- Harvest Time -->
                        <div v-if="variety.harvestTime" class="flex items-center gap-2 text-sm text-text/70 mb-3">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{{ variety.harvestTime }}</span>
                        </div>

                        <!-- Description -->
                        <p class="text-text/70 text-sm line-clamp-3 mb-4">
                            {{ variety.description }}
                        </p>

                        <!-- Rootstocks -->
                        <div class="flex flex-wrap gap-1.5">
                            <span
                                v-for="rootstock in variety.rootstocks"
                                :key="rootstock"
                                class="px-2 py-1 bg-[rgb(var(--color-background)/0.5)] text-xs text-text/60 rounded"
                            >
                                {{ rootstock }}
                            </span>
                        </div>

                        <!-- Match Score Badge (for debugging/interest) -->
                        <div v-if="variety.matchScore && variety.matchScore >= 90" class="mt-3 pt-3 border-t border-[rgb(var(--color-text)/0.05)]">
                            <span class="text-xs text-primary font-semibold">
                                Exacte match
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>

            <!-- Empty State -->
            <div v-else-if="searchQuery" class="max-w-2xl mx-auto text-center py-12">
                <div class="mb-6">
                    <svg
                        class="h-24 w-24 mx-auto text-text/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <h2 class="text-2xl font-serif font-bold text-text mb-3">
                    Geen resultaten gevonden
                </h2>

                <p class="text-text/70 mb-6">
                    We konden geen variëteiten vinden die overeenkomen met "{{ searchQuery }}".
                    Probeer het met andere zoektermen.
                </p>

                <!-- Suggestions -->
                <div class="bg-white rounded-lg border border-[rgb(var(--color-text)/0.1)] p-6">
                    <h3 class="font-semibold text-text mb-3">Populaire variëteiten:</h3>
                    <div class="flex flex-wrap gap-2 justify-center">
                        <button
                            v-for="suggestion in getSearchSuggestions()"
                            :key="suggestion"
                            @click="applySuggestion(suggestion)"
                            class="px-4 py-2 bg-[rgb(var(--color-background)/0.5)] hover:bg-primary hover:text-white text-text/70 rounded-lg transition-colors font-medium"
                        >
                            {{ suggestion }}
                        </button>
                    </div>
                </div>

                <!-- Browse Categories -->
                <div class="mt-8">
                    <p class="text-text/60 mb-4">Of blader door onze categorieën:</p>
                    <div class="flex flex-wrap gap-3 justify-center">
                        <router-link
                            to="/shop/appelbomen"
                            class="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[rgb(var(--color-primary)/0.9)] transition-colors"
                        >
                            Appelbomen
                        </router-link>
                        <router-link
                            to="/shop/perenbomen"
                            class="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-[rgb(var(--color-secondary)/0.9)] transition-colors"
                        >
                            Perenbomen
                        </router-link>
                        <router-link
                            to="/shop/nashi-peren"
                            class="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-[rgb(var(--color-accent)/0.9)] transition-colors"
                        >
                            Nashi Peren
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- No Query State -->
            <div v-else class="max-w-2xl mx-auto text-center py-12">
                <div class="mb-6">
                    <svg
                        class="h-24 w-24 mx-auto text-text/20"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <h2 class="text-2xl font-serif font-bold text-text mb-3">
                    Zoek in ons assortiment
                </h2>

                <p class="text-text/70 mb-6">
                    Gebruik de zoekbalk hierboven om te zoeken op naam of Latijnse naam van onze fruitbomen.
                </p>

                <!-- Popular Varieties -->
                <div class="bg-white rounded-lg border border-[rgb(var(--color-text)/0.1)] p-6">
                    <h3 class="font-semibold text-text mb-3">Populaire variëteiten:</h3>
                    <div class="flex flex-wrap gap-2 justify-center">
                        <button
                            v-for="suggestion in getSearchSuggestions()"
                            :key="suggestion"
                            @click="applySuggestion(suggestion)"
                            class="px-4 py-2 bg-[rgb(var(--color-background)/0.5)] hover:bg-primary hover:text-white text-text/70 rounded-lg transition-colors font-medium"
                        >
                            {{ suggestion }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearch } from '~/composables/useSearch'

const route = useRoute()
const router = useRouter()
const { searchVarieties, highlightMatch, getSearchSuggestions, fetchData } = useSearch()

// Ensure data is loaded from database
await fetchData()

// State
const searchQuery = ref('')
const results = ref([])

// Perform search based on route query
const performSearch = () => {
    const query = route.query.q
    if (query && typeof query === 'string') {
        searchQuery.value = query
        results.value = searchVarieties(query)
    } else {
        searchQuery.value = ''
        results.value = []
    }
}

// Apply suggestion
const applySuggestion = (suggestion) => {
    router.push({ path: '/search', query: { q: suggestion } })
}

// Watch for route changes
watch(() => route.query.q, (newQuery, oldQuery) => {
    // Only perform search if query actually changed
    if (newQuery !== oldQuery) {
        performSearch()
    }
}, { flush: 'post' })

// Initial search on mount
onMounted(() => {
    performSearch()
})

// SEO Meta tags
useHead({
    title: computed(() => {
        if (searchQuery.value) {
            return `Zoekresultaten voor "${searchQuery.value}" - De Toffe Peren`
        }
        return 'Zoeken in ons assortiment - De Toffe Peren'
    }),
    meta: [
        {
            name: 'description',
            content: 'Zoek in ons uitgebreide assortiment van appelbomen, perenbomen en nashi peren. Vind de perfecte fruitboom voor uw tuin.'
        },
        {
            name: 'robots',
            content: 'noindex, follow' // Noindex search results to avoid duplicate content
        }
    ]
})
</script>

<style scoped>
.container {
    max-width: 1400px;
}

/* Sticky header shadow on scroll */
.sticky {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Line clamp for descriptions */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth transitions */
a {
    transition: all 0.2s ease;
}
</style>
