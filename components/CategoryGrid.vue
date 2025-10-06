<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <NuxtLink
      v-for="category in categories"
      :key="category.slug"
      :to="`/shop/${category.slug}`"
      class="group flex"
    >
      <BaseCard hoverable clickable :padding="false" class="overflow-hidden flex flex-col w-full">
        <div class="aspect-w-4 aspect-h-3">
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-xl font-semibold text-text mb-2">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ category.count }} variëteiten</p>
          <p class="text-gray-600 text-sm flex-grow">{{ category.description }}</p>
          <div class="mt-4 flex items-center text-primary font-medium">
            <span>Bekijk variëteiten</span>
            <ChevronRight class="w-4 h-4 ml-1" />
          </div>
        </div>
      </BaseCard>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

interface Category {
  name: string
  slug: string
  count: number
  image: string
  description: string
}

defineProps<{
  categories: Category[]
}>()
</script>