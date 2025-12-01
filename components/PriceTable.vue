<template>
  <div class="bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg shadow-sm overflow-hidden">
    <div class="bg-[rgb(var(--color-primary)/0.1)] px-4 py-2 border-b border-[rgb(var(--color-primary)/0.3)]">
      <h3 class="text-sm font-semibold text-text uppercase tracking-wide">Prijzen</h3>
    </div>
    <div class="p-4">
      <!-- Loading state -->
      <div v-if="pending" class="text-center py-4 text-sm text-[rgb(var(--color-text)/0.6)]">
        Prijzen laden...
      </div>
      <!-- Error state with fallback -->
      <table v-else class="w-full">
        <thead>
          <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
            <th class="text-left py-2 px-2 text-xs font-semibold text-[rgb(var(--color-text)/0.7)] uppercase tracking-wider">Grootte</th>
            <th class="text-right py-2 px-2 text-xs font-semibold text-[rgb(var(--color-text)/0.7)] uppercase tracking-wider">Prijs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(price, index) in displayPrices" :key="index" class="border-b border-[rgb(var(--color-text)/0.05)] last:border-0">
            <td class="py-2.5 px-2 text-sm text-text">{{ price.size }}</td>
            <td class="py-2.5 px-2 text-sm text-text text-right font-medium">{{ price.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PriceItem {
  size: string
  price: string
}

const props = defineProps({
  category: {
    type: String,
    required: true,
    validator: (value: string) => ['appelbomen', 'perenbomen', 'nashi-peren'].includes(value)
  }
})

// Fetch prices from database API
const { data, pending, error } = await useFetch<{ prices: PriceItem[] }>('/api/public/prices', {
  query: { category: props.category },
  key: `prices-${props.category}`
})

// Fallback prices if API fails or returns empty
const fallbackPrices = computed(() => {
  const isNashi = props.category === 'nashi-peren'
  const isPeer = props.category === 'perenbomen'

  if (isNashi) {
    return [
      { size: '30-60 cm', price: '€15,00' },
      { size: '60-100 cm', price: '€18,00' },
      { size: '100-150 cm', price: '€23,00' },
      { size: '150-200 cm', price: '€28,00' }
    ]
  } else if (isPeer) {
    return [
      { size: '30-60 cm', price: '€12,00' },
      { size: '60-100 cm', price: '€15,00' },
      { size: '100-150 cm', price: '€20,00' },
      { size: '150-200 cm', price: '€25,00' }
    ]
  } else {
    return [
      { size: '30-60 cm', price: '€12,00' },
      { size: '60-100 cm', price: '€15,00' },
      { size: '100-150 cm', price: '€20,00' },
      { size: '150-200 cm', price: '€25,00' }
    ]
  }
})

// Use API data if available, otherwise fallback
const displayPrices = computed(() => {
  if (data.value?.prices && data.value.prices.length > 0) {
    return data.value.prices
  }
  return fallbackPrices.value
})
</script>
