// Composable to fetch tree data from database API
// Falls back to static data if API fails

interface Variety {
  id: number
  name: string
  latinName: string | null
  slug: string
  description: string | null
  fullDescription: string | null
  harvestTime: string | null
  blossomTime: string | null
  origin: string | null
  fruitColor: string | null
  taste: string | null
  pollination: string | null
  features: string[]
  rootstocks: string[]
  categorySlug: string
  categoryName: string
}

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  varieties: Variety[]
}

interface TreeData {
  [slug: string]: {
    name: string
    slug: string
    description: string | null
    image: string | null
    varieties: Variety[]
  }
}

export const useTreeDataFromDB = () => {
  const treeData = useState<TreeData | null>('treeData', () => null)
  const isLoading = useState('treeDataLoading', () => false)
  const error = useState<string | null>('treeDataError', () => null)

  const fetchData = async () => {
    if (treeData.value) return // Already loaded

    isLoading.value = true
    error.value = null

    try {
      // Fetch categories and varieties in parallel
      const [categoriesRes, varietiesRes] = await Promise.all([
        $fetch<{ categories: Category[] }>('/api/public/categories'),
        $fetch<{ varieties: Variety[] }>('/api/public/varieties')
      ])

      // Build tree data structure
      const data: TreeData = {}

      for (const category of categoriesRes.categories) {
        const categoryVarieties = varietiesRes.varieties.filter(
          v => v.categorySlug === category.slug
        )

        data[category.slug] = {
          name: category.name,
          slug: category.slug,
          description: category.description,
          image: category.imageUrl,
          varieties: categoryVarieties
        }
      }

      treeData.value = data
    } catch (e) {
      console.error('Failed to fetch tree data from API:', e)
      error.value = 'Failed to load data'
      // Fall back to static data
      const { treeData: staticData } = useTreeData()
      treeData.value = staticData as unknown as TreeData
    } finally {
      isLoading.value = false
    }
  }

  const getCategories = () => {
    if (!treeData.value) return []
    return Object.values(treeData.value).map(category => ({
      name: category.name,
      slug: category.slug,
      count: category.varieties.length,
      image: category.image,
      description: category.description
    }))
  }

  const getCategoryBySlug = (slug: string) => {
    if (!treeData.value) return null
    return treeData.value[slug] || null
  }

  const getVarietyBySlug = (categorySlug: string, varietySlug: string) => {
    const category = getCategoryBySlug(categorySlug)
    if (!category) return null
    return category.varieties.find(v => v.slug === varietySlug) || null
  }

  return {
    treeData: readonly(treeData),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchData,
    getCategories,
    getCategoryBySlug,
    getVarietyBySlug
  }
}
