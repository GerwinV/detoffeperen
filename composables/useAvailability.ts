// Composable to fetch stock availability for public display

type AvailabilityStatus = 'available' | 'low_stock' | 'out_of_stock'

interface AvailabilityData {
  [categorySlug: string]: {
    [varietySlug: string]: {
      [rootstockName: string]: AvailabilityStatus
    }
  }
}

export const useAvailability = () => {
  const availability = useState<AvailabilityData | null>('availability', () => null)
  const isLoading = useState('availabilityLoading', () => false)

  const fetchAvailability = async () => {
    if (availability.value) return // Already loaded

    isLoading.value = true
    try {
      const response = await $fetch<{ availability: AvailabilityData }>('/api/public/availability')
      availability.value = response.availability
    } catch (e) {
      console.error('Failed to fetch availability:', e)
      availability.value = {}
    } finally {
      isLoading.value = false
    }
  }

  const getAvailability = (categorySlug: string, varietySlug: string, rootstockName: string): AvailabilityStatus | null => {
    if (!availability.value) return null
    return availability.value[categorySlug]?.[varietySlug]?.[rootstockName] || null
  }

  const getVarietyAvailability = (categorySlug: string, varietySlug: string): Record<string, AvailabilityStatus> | null => {
    if (!availability.value) return null
    return availability.value[categorySlug]?.[varietySlug] || null
  }

  // Get overall status for a variety (best status across all rootstocks)
  const getOverallVarietyStatus = (categorySlug: string, varietySlug: string): AvailabilityStatus | null => {
    const rootstocks = getVarietyAvailability(categorySlug, varietySlug)
    if (!rootstocks) return null

    const statuses = Object.values(rootstocks)
    if (statuses.includes('available')) return 'available'
    if (statuses.includes('low_stock')) return 'low_stock'
    return 'out_of_stock'
  }

  return {
    availability: readonly(availability),
    isLoading: readonly(isLoading),
    fetchAvailability,
    getAvailability,
    getVarietyAvailability,
    getOverallVarietyStatus
  }
}
