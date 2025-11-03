<template>
    <div>
        <!-- Ultra-Compact Hero -->
        <section class="bg-gradient-to-br from-green-50 to-green-100 py-6 md:py-8">
            <div class="container">
                <div class="text-center">
                    <h1 class="text-3xl md:text-4xl font-bold font-playfair text-text mb-2">
                        Kwekerij <span class="text-gradient">Toffe peren</span>
                    </h1>
                    <p class="text-sm md:text-base text-gray-600 mb-4 max-w-xl mx-auto">
                        Ecologisch verantwoorde fruitbomen voor voedselbossen en tuinen
                    </p>
                    <BaseButton size="md" to="/shop">
                        Bekijk assortiment
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="py-8 md:py-10 bg-gray-50">
            <div class="container">
                <CategoryGrid :categories="categories" />
            </div>
        </section>

        <!-- Story Section -->
        <section class="py-12 md:py-16">
            <div class="container">
                <div class="max-w-4xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-8 items-center">
                        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                            <!-- Image placeholder - replace with actual image -->
                            <div class="absolute inset-0 flex items-center justify-center text-gray-400">
                                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <h2 class="text-2xl md:text-3xl font-bold font-playfair text-text">
                                Ons verhaal
                            </h2>
                            <div class="prose prose-gray max-w-none">
                                <p class="text-gray-700 leading-relaxed">
                                    Verhaaltje hier!
                                </p>
                                <p class="text-gray-700 leading-relaxed">
                                    Hoe kweken we etc?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
import { useTreeData } from '~/composables/useTreeData'
import CategoryGrid from '~/components/CategoryGrid.vue'

const { getCategories } = useTreeData()
const categories = getCategories()
</script>
