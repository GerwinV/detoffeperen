<template>
    <div class="flex flex-col flex-1">
        <!-- Compact Header -->
        <section class="py-6 md:py-8">
            <div class="container">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 class="text-2xl md:text-3xl font-bold font-playfair text-text">
                            Ons Assortiment
                        </h1>
                        <p class="text-sm text-[rgb(var(--color-text)/0.8)] mt-1">
                            Fruitbomen gekweekt zonder bestrijdingsmiddelen of kunstmest
                        </p>
                    </div>
                    <BaseButton
                        href="https://docs.google.com/spreadsheets/d/1234567890/edit"
                        target="_blank"
                        variant="outline"
                        size="sm"
                        class="self-start md:self-center inline-flex items-center whitespace-nowrap">
                        <ExternalLink class="w-4 h-4 mr-1.5" />
                        <span>Voorraad</span>
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="py-8 md:py-12">
            <div class="container">
                <!-- Category count badge -->
                <div class="mb-6 text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-text">
                        {{ categories.length }} categorieën beschikbaar
                    </span>
                </div>
                <CategoryGrid :categories="categories" />
            </div>
        </section>

        <!-- Minimal Info Bar with white background extending to footer -->
        <section class="bg-white mt-auto border-t border-[rgb(var(--color-text)/0.1)]">
            <div class="py-6">
                <div class="container">
                    <div class="flex flex-wrap justify-center gap-8 md:gap-12">
                        <div class="flex items-center gap-2 text-sm">
                            <Sprout class="w-5 h-5 text-primary" />
                            <span class="text-text">100% Ecologisch verantwoord</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <Trees class="w-5 h-5 text-primary" />
                            <span class="text-text">Ongesnoeid</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <Leaf class="w-5 h-5 text-primary" />
                            <span class="text-text">Zandgrond gekweekt</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ExternalLink, Sprout, Trees, Leaf } from 'lucide-vue-next'
import { useTreeData } from '~/composables/useTreeData'
import CategoryGrid from '~/components/CategoryGrid.vue'

const { getCategories } = useTreeData()
const categories = getCategories()
</script>
