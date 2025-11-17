import { ref, computed } from 'vue'

export interface Favorite {
    name: string
    slug: string
    category: string
    rootstocks: string[]
    description: string
    harvestTime?: string
}

const STORAGE_KEY = 'toffe-peren-favorites'

// Reactive favorites list
const favorites = ref<Favorite[]>([])

// Load favorites from localStorage on initialization
const loadFavorites = () => {
    if (process.client) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                favorites.value = JSON.parse(stored)
            }
        } catch (error) {
            console.error('Error loading favorites:', error)
            favorites.value = []
        }
    }
}

// Save favorites to localStorage
const saveFavorites = () => {
    if (process.client) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
        } catch (error) {
            console.error('Error saving favorites:', error)
        }
    }
}

export const useFavorites = () => {
    // Initialize favorites if not already loaded
    if (process.client && favorites.value.length === 0) {
        loadFavorites()
    }

    // Check if a variety is favorited
    const isFavorited = (slug: string, category: string): boolean => {
        return favorites.value.some(
            fav => fav.slug === slug && fav.category === category
        )
    }

    // Add variety to favorites
    const addToFavorites = (variety: Favorite) => {
        // Check if already favorited
        if (!isFavorited(variety.slug, variety.category)) {
            favorites.value.push(variety)
            saveFavorites()
        }
    }

    // Remove variety from favorites
    const removeFromFavorites = (slug: string, category: string) => {
        favorites.value = favorites.value.filter(
            fav => !(fav.slug === slug && fav.category === category)
        )
        saveFavorites()
    }

    // Toggle favorite status
    const toggleFavorite = (variety: Favorite) => {
        if (isFavorited(variety.slug, variety.category)) {
            removeFromFavorites(variety.slug, variety.category)
        } else {
            addToFavorites(variety)
        }
    }

    // Get all favorites
    const getFavorites = () => {
        return favorites.value
    }

    // Get favorites count
    const favoritesCount = computed(() => favorites.value.length)

    return {
        favorites: computed(() => favorites.value),
        favoritesCount,
        isFavorited,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        getFavorites
    }
}
