<template>
    <div class="search-bar relative" ref="searchContainer">
        <!-- Search Input -->
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    class="h-5 w-5 text-text/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                ref="searchInput"
                v-model="query"
                type="text"
                placeholder="Zoek op naam of Latijnse naam..."
                class="w-full pl-10 pr-10 py-2.5 border border-[rgb(var(--color-text)/0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                @input="handleInput"
                @keydown.down.prevent="navigateDown"
                @keydown.up.prevent="navigateUp"
                @keydown.enter.prevent="handleEnter"
                @keydown.esc="closeSuggestions"
                @focus="handleFocus"
            />
            <!-- Clear button -->
            <button
                v-if="query"
                @click="clearSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-text/50 hover:text-text"
            >
                <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <!-- Suggestions Dropdown -->
        <div
            v-if="showSuggestions && (suggestions.length > 0 || query.trim().length > 0)"
            class="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-[rgb(var(--color-text)/0.1)] overflow-hidden"
        >
            <!-- Suggestions list -->
            <div v-if="suggestions.length > 0" class="max-h-80 overflow-y-auto">
                <router-link
                    v-for="(variety, index) in suggestions"
                    :key="`${variety.categorySlug}-${variety.slug}`"
                    :to="`/shop/${variety.categorySlug}?variety=${variety.slug}`"
                    @click="resetSearchBar"
                    class="block px-4 py-3 hover:bg-[rgb(var(--color-primary)/0.05)] transition-colors border-b border-[rgb(var(--color-text)/0.05)] last:border-b-0"
                    :class="{
                        'bg-[rgb(var(--color-primary)/0.1)]': index === selectedIndex
                    }"
                    @mouseenter="selectedIndex = index"
                >
                    <div class="flex items-start gap-3">
                        <div class="flex-1">
                            <div class="font-semibold text-text" v-html="highlightMatch(variety.name, query)"></div>
                            <div class="text-sm text-text/60 italic" v-html="highlightMatch(variety.latinName, query)"></div>
                            <div class="text-xs text-text/50 mt-0.5">{{ variety.categoryName }}</div>
                        </div>
                        <svg
                            class="h-5 w-5 text-text/30 flex-shrink-0 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </router-link>

                <!-- View all results link -->
                <router-link
                    v-if="totalResults > suggestions.length"
                    :to="`/search?q=${encodeURIComponent(query)}`"
                    @click="resetSearchBar"
                    class="block px-4 py-3 text-center bg-[rgb(var(--color-background)/0.3)] hover:bg-[rgb(var(--color-primary)/0.05)] text-primary font-semibold transition-colors"
                >
                    Bekijk alle {{ totalResults }} resultaten →
                </router-link>
            </div>

            <!-- No results -->
            <div v-else-if="query.trim().length > 0" class="px-4 py-6 text-center">
                <p class="text-text/60 mb-3">Geen resultaten gevonden voor "{{ query }}"</p>
                <p class="text-sm text-text/50">Probeer het met:</p>
                <div class="flex flex-wrap gap-2 justify-center mt-3">
                    <button
                        v-for="suggestion in getSearchSuggestions()"
                        :key="suggestion"
                        @click="applySuggestion(suggestion)"
                        class="px-3 py-1 text-sm bg-[rgb(var(--color-background)/0.5)] hover:bg-[rgb(var(--color-primary)/0.1)] text-text/70 rounded transition-colors"
                    >
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSearch } from '~/composables/useSearch'

const props = defineProps({
    autoFocus: {
        type: Boolean,
        default: false
    },
    maxSuggestions: {
        type: Number,
        default: 5
    }
})

const emit = defineEmits(['search', 'close'])

const router = useRouter()
const route = useRoute()
const { searchVarieties, highlightMatch, getSearchSuggestions, fetchData } = useSearch()

// State
const query = ref('')
const suggestions = ref([])
const totalResults = ref(0)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)
const searchContainer = ref(null)
const searchInput = ref(null)
const debounceTimeout = ref(null)

// Handle input with debouncing
const handleInput = () => {
    if (query.value.trim().length === 0) {
        suggestions.value = []
        totalResults.value = 0
        return
    }

    // Clear previous timeout
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
    }

    debounceTimeout.value = setTimeout(() => {
        const results = searchVarieties(query.value)
        totalResults.value = results.length
        suggestions.value = results.slice(0, props.maxSuggestions)
        selectedIndex.value = -1
    }, 300)
}

// Keyboard navigation
const navigateDown = () => {
    if (selectedIndex.value < suggestions.value.length - 1) {
        selectedIndex.value++
    }
}

const navigateUp = () => {
    if (selectedIndex.value > 0) {
        selectedIndex.value--
    }
}

const handleEnter = () => {
    // Clear any pending debounce timeout before navigation
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
        debounceTimeout.value = null
    }

    if (selectedIndex.value >= 0 && selectedIndex.value < suggestions.value.length) {
        // Navigate to selected variety - reset SearchBar (leaving search context)
        const variety = suggestions.value[selectedIndex.value]
        router.push(`/shop/${variety.categorySlug}?variety=${variety.slug}`)
        resetSearchBar()
    } else if (query.value.trim().length > 0) {
        // Navigate to search results page - don't reset, let watcher sync
        const newQuery = query.value.trim()
        // Only navigate if different from current route
        if (route.path !== '/search' || route.query.q !== newQuery) {
            router.push(`/search?q=${encodeURIComponent(newQuery)}`)
        }
        closeSuggestions()
        searchInput.value?.blur()
    }
}

// Clear search
const clearSearch = () => {
    // Clear any pending timeout
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
        debounceTimeout.value = null
    }

    // If on search page, navigate to clear the URL
    if (route.path === '/search') {
        query.value = ''
        suggestions.value = []
        totalResults.value = 0
        selectedIndex.value = -1
        router.push('/search')
    } else {
        // Not on search page, just clear locally
        query.value = ''
        suggestions.value = []
        totalResults.value = 0
        selectedIndex.value = -1
    }

    searchInput.value?.focus()
}

// Close suggestions (without clearing query)
const closeSuggestions = () => {
    showSuggestions.value = false
    selectedIndex.value = -1
    emit('close')
}

// Handle focus - show suggestions and calculate them if query exists
const handleFocus = () => {
    showSuggestions.value = true

    // If input has value, immediately calculate suggestions
    if (query.value.trim().length > 0) {
        const results = searchVarieties(query.value)
        totalResults.value = results.length
        suggestions.value = results.slice(0, props.maxSuggestions)
    }
}

// Reset SearchBar completely (clear query + close suggestions)
const resetSearchBar = () => {
    query.value = ''
    suggestions.value = []
    totalResults.value = 0
    selectedIndex.value = -1
    showSuggestions.value = false

    // Clear any pending timeout
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
        debounceTimeout.value = null
    }

    // Blur the input
    searchInput.value?.blur()

    emit('close')
}

// Apply suggestion
const applySuggestion = (suggestion) => {
    query.value = suggestion
    handleInput()
    searchInput.value?.focus()
}

// Click outside to close
const handleClickOutside = (event) => {
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        closeSuggestions()
    }
}

// Sync SearchBar with route query when on search page
watch(() => route.query.q, (newQuery) => {
    // Only sync when on the search page
    if (route.path === '/search') {
        if (newQuery && typeof newQuery === 'string') {
            query.value = newQuery
        } else {
            query.value = ''
            suggestions.value = []
            totalResults.value = 0
        }
    }
})

// Lifecycle
onMounted(async () => {
    document.addEventListener('click', handleClickOutside)

    // Ensure data is loaded for search
    await fetchData()

    if (props.autoFocus) {
        searchInput.value?.focus()
    }

    // Initialize query from route if on search page
    if (route.path === '/search' && route.query.q && typeof route.query.q === 'string') {
        query.value = route.query.q
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
    }
})
</script>

<style scoped>
.search-bar {
    width: 100%;
}

/* Smooth transitions */
input {
    transition: all 0.2s ease;
}

/* Custom scrollbar for suggestions */
.max-h-80::-webkit-scrollbar {
    width: 8px;
}

.max-h-80::-webkit-scrollbar-track {
    background: rgb(var(--color-background) / 0.3);
    border-radius: 4px;
}

.max-h-80::-webkit-scrollbar-thumb {
    background: rgb(var(--color-primary) / 0.3);
    border-radius: 4px;
}

.max-h-80::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--color-primary) / 0.5);
}

/* Mark highlight styling */
:deep(mark) {
    background-color: rgb(var(--color-primary) / 0.2);
    font-weight: 600;
    padding: 0 2px;
    border-radius: 2px;
}
</style>
