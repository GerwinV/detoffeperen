import { ref, computed } from 'vue'
import { useTreeDataFromDB } from './useTreeDataFromDB'

interface SearchResult {
    id: number
    name: string
    latinName: string | null
    slug: string
    description: string | null
    categorySlug: string
    categoryName: string
    matchScore: number
    matchedIn: string
    rootstocks: string[]
    harvestTime: string | null
}

export const useSearch = () => {
    const { treeData, fetchData } = useTreeDataFromDB()
    const searchQuery = ref('')
    const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

    // Flatten all varieties with their category information
    const allVarieties = computed(() => {
        const varieties: any[] = []

        if (!treeData.value) return varieties

        Object.entries(treeData.value).forEach(([categorySlug, category]) => {
            category.varieties.forEach((variety: any) => {
                varieties.push({
                    ...variety,
                    categorySlug,
                    categoryName: category.name,
                    categoryImage: category.image
                })
            })
        })

        return varieties
    })

    /**
     * Calculate similarity score between query and text
     * Uses fuzzy matching for typo tolerance
     */
    const calculateSimilarity = (query: string, text: string | null): number => {
        if (!text) return 0

        const queryLower = query.toLowerCase()
        const textLower = text.toLowerCase()

        // Exact match gets highest score
        if (textLower === queryLower) return 100

        // Starts with query gets high score
        if (textLower.startsWith(queryLower)) return 90

        // Contains query gets medium score
        if (textLower.includes(queryLower)) return 70

        // Fuzzy matching for individual words
        const queryWords = queryLower.split(/\s+/)
        const textWords = textLower.split(/\s+/)

        let matchCount = 0
        queryWords.forEach(qWord => {
            textWords.forEach(tWord => {
                if (tWord.includes(qWord) || qWord.includes(tWord)) {
                    matchCount++
                }
            })
        })

        if (matchCount > 0) {
            return 40 + (matchCount * 10)
        }

        return 0
    }

    /**
     * Search varieties by name, Latin name, and category
     * Returns sorted results by relevance
     */
    const searchVarieties = (query: string): SearchResult[] => {
        if (!query || query.trim().length === 0) {
            return []
        }

        const trimmedQuery = query.trim()

        // Calculate score for each variety
        const results = allVarieties.value.map(variety => {
            const nameScore = calculateSimilarity(trimmedQuery, variety.name)
            const latinScore = calculateSimilarity(trimmedQuery, variety.latinName)

            // Check category match (both display name and slug)
            const categoryNameScore = calculateSimilarity(trimmedQuery, variety.categoryName)
            const categorySlugScore = calculateSimilarity(trimmedQuery, variety.categorySlug)

            // Cap category scores at 50 to ensure they rank below name/latinName matches
            const categoryScore = Math.min(Math.max(categoryNameScore, categorySlugScore), 50)

            // Take the highest score across all fields
            const maxScore = Math.max(nameScore, latinScore, categoryScore)

            // Determine what was matched
            let matchedIn = 'name'
            if (latinScore >= nameScore && latinScore >= categoryScore) {
                matchedIn = 'latinName'
            } else if (categoryScore > nameScore && categoryScore > latinScore) {
                matchedIn = 'category'
            }

            return {
                variety,
                score: maxScore,
                matchedIn
            }
        })

        // Filter out zero scores and sort by score descending
        return results
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(r => ({
                ...r.variety,
                matchScore: r.score,
                matchedIn: r.matchedIn
            }))
    }

    /**
     * Debounced search for real-time suggestions
     */
    const debouncedSearch = (query: string, callback: (results: SearchResult[]) => void, delay = 300) => {
        if (searchTimeout.value) {
            clearTimeout(searchTimeout.value)
        }

        searchTimeout.value = setTimeout(() => {
            const results = searchVarieties(query)
            callback(results)
        }, delay)
    }

    /**
     * Get top N suggestions for dropdown
     */
    const getTopSuggestions = (query: string, limit = 5): SearchResult[] => {
        const results = searchVarieties(query)
        return results.slice(0, limit)
    }

    /**
     * Highlight matching text in a string
     */
    const highlightMatch = (text: string | null, query: string): string => {
        if (!text || !query) return text || ''

        const regex = new RegExp(`(${query})`, 'gi')
        return text.replace(regex, '<mark class="bg-primary/20 font-semibold">$1</mark>')
    }

    /**
     * Get search suggestions based on popular varieties
     */
    const getSearchSuggestions = (): string[] => {
        // Return a few popular varieties as suggestions
        return [
            'Hosui',
            'Rode Boskoop',
            'Williams',
            'Concorde',
            'Alkmene'
        ]
    }

    return {
        searchQuery,
        allVarieties,
        searchVarieties,
        debouncedSearch,
        getTopSuggestions,
        highlightMatch,
        getSearchSuggestions,
        fetchData
    }
}
