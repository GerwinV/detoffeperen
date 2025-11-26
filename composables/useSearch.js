import { ref, computed } from 'vue'
import { useTreeData } from './useTreeData'

export const useSearch = () => {
    const { treeData } = useTreeData()
    const searchQuery = ref('')
    const searchTimeout = ref(null)

    // Flatten all varieties with their category information
    const allVarieties = computed(() => {
        const varieties = []

        Object.entries(treeData).forEach(([categorySlug, category]) => {
            category.varieties.forEach(variety => {
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
    const calculateSimilarity = (query, text) => {
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
    const searchVarieties = (query) => {
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
    const debouncedSearch = (query, callback, delay = 300) => {
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
    const getTopSuggestions = (query, limit = 5) => {
        const results = searchVarieties(query)
        return results.slice(0, limit)
    }

    /**
     * Highlight matching text in a string
     */
    const highlightMatch = (text, query) => {
        if (!text || !query) return text

        const regex = new RegExp(`(${query})`, 'gi')
        return text.replace(regex, '<mark class="bg-primary/20 font-semibold">$1</mark>')
    }

    /**
     * Get search suggestions based on popular varieties
     */
    const getSearchSuggestions = () => {
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
        getSearchSuggestions
    }
}
