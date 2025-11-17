<template>
  <div class="bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg shadow-sm overflow-hidden">
    <div class="bg-[rgb(var(--color-primary)/0.1)] px-4 py-2 border-b border-[rgb(var(--color-primary)/0.3)]">
      <h3 class="text-sm font-semibold text-text uppercase tracking-wide">Prijzen</h3>
    </div>
    <div class="p-4">
      <table class="w-full">
        <thead>
          <tr class="border-b border-[rgb(var(--color-text)/0.1)]">
            <th class="text-left py-2 px-2 text-xs font-semibold text-[rgb(var(--color-text)/0.7)] uppercase tracking-wider">Grootte</th>
            <th class="text-right py-2 px-2 text-xs font-semibold text-[rgb(var(--color-text)/0.7)] uppercase tracking-wider">Prijs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(price, index) in prices" :key="index" class="border-b border-[rgb(var(--color-text)/0.05)] last:border-0">
            <td class="py-2.5 px-2 text-sm text-text">{{ price.size }}</td>
            <td class="py-2.5 px-2 text-sm text-text text-right font-medium">{{ price.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  category: {
    type: String,
    required: true,
    validator: (value: string) => ['appelbomen', 'perenbomen', 'nashi-peren'].includes(value)
  }
})

const prices = computed(() => {
  const isNashi = props.category === 'nashi-peren'

  return [
    { size: '30-60 cm', price: isNashi ? '€15,00' : '€12,00' },
    { size: '60-100 cm', price: isNashi ? '€18,00' : '€15,00' },
    { size: '100-150 cm', price: isNashi ? '€23,00' : '€20,00' },
    { size: '150-200 cm', price: isNashi ? '€28,00' : '€25,00' }
  ]
})
</script>
