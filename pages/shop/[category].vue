<template>
    <div>
        <!-- Compact Header -->
        <section class="bg-white py-4 md:py-6 sticky top-0 z-10 shadow-sm">
            <div class="container">
                <!-- Breadcrumb and description -->
                <div class="mb-3">
                    <!-- Breadcrumb navigation -->
                    <div class="flex items-center text-sm text-[rgb(var(--color-text)/0.6)] mb-1">
                        <NuxtLink to="/shop" class="hover:text-primary transition-colors">
                            Assortiment
                        </NuxtLink>
                        <ChevronRight class="w-3 h-3 mx-1" />
                        <span class="text-text font-medium">{{ categoryData?.name }}</span>
                    </div>
                    <p class="text-sm text-[rgb(var(--color-text)/0.7)] hidden md:block">
                        {{ categoryData?.description }}
                    </p>
                </div>

                <!-- Category Tabs and Prijzen Button -->
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <!-- Category Tabs -->
                    <div class="flex gap-2 flex-wrap">
                        <NuxtLink
                            v-for="category in categories"
                            :key="category.slug"
                            :to="`/shop/${category.slug}`"
                            :class="[
                                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2',
                                route.params.category === category.slug
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-primary border-primary hover:bg-primary/10'
                            ]"
                        >
                            {{ category.name }}
                        </NuxtLink>
                    </div>

                    <!-- Prijzen Button -->
                    <BaseButton @click="showPriceModal = true" variant="primary" size="sm" class="self-start md:self-center inline-flex items-center whitespace-nowrap hover:!bg-white hover:!text-primary border-2 border-primary">
                        <Euro class="w-4 h-4 mr-1.5" />
                        <span>Prijzen</span>
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Varieties Section -->
        <section class="py-8 md:py-12">
            <div class="container">
                <div v-if="categoryData">
                    <!-- Variety count badge -->
                    <div class="mb-6 text-center">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-text shadow-sm">
                            {{ categoryData.varieties.length }} variëteiten beschikbaar
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                        <div v-for="variety in categoryData.varieties" :key="variety.name" class="group bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer relative overflow-hidden" @click="openVarietyModal(variety)">
                            <!-- Favorite button -->
                            <button @click.stop="toggleVarietyFavorite(variety)" :class="[
                                'absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200',
                                isFavorited(variety.slug, route.params.category as string)
                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                    : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-600'
                            ]" :title="isFavorited(variety.slug, route.params.category as string) ? 'Verwijder van favorieten' : 'Voeg toe aan favorieten'">
                                <Heart :class="[
                                    'w-5 h-5 transition-all',
                                    isFavorited(variety.slug, route.params.category as string) && 'fill-current'
                                ]" />
                            </button>

                            <div class="pr-8">
                                <h3 class="text-lg font-semibold text-text mb-3 group-hover:text-primary transition-colors">
                                    {{ variety.name }}
                                </h3>

                                <!-- Description -->
                                <p class="text-sm text-[rgb(var(--color-text)/0.8)] mb-4 line-clamp-3">
                                    {{ variety.description }}
                                </p>

                                <div class="space-y-2 mb-4">
                                    <p class="text-xs font-medium text-[rgb(var(--color-text)/0.6)] uppercase tracking-wider">Onderstammen:</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="rootstock in variety.rootstocks" :key="rootstock" class="inline-block px-2.5 py-1 bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] rounded-full text-xs font-medium border border-[rgb(var(--color-primary)/0.3)]">
                                            {{ rootstock }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Info box -->
                                <div class="mb-8">
                                    <div class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-2">
                                        <div class="flex items-center text-primary">
                                            <Trees class="w-4 h-4 mr-1.5" />
                                            <span class="text-xs font-semibold text-text">Spil, ongesnoeid</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Arrow indicator -->
                            <div class="absolute bottom-4 right-4 text-[rgb(var(--color-text)/0.3)] group-hover:text-primary transition-all group-hover:translate-x-1">
                                <ChevronRight class="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                </div>

                <div v-else class="text-center py-12">
                    <p class="text-gray-600">Categorie niet gevonden</p>
                    <BaseButton to="/shop" class="mt-4">
                        Terug naar assortiment
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Variety Modal -->
        <VarietyModal v-model="showVarietyModal" :variety="selectedVariety" :category="route.params.category as string" />

        <!-- Price Modal -->
        <BaseModal v-model="showPriceModal">
            <div class="p-6">
                <h2 class="text-2xl font-bold font-playfair text-text mb-4">
                    Prijzen {{ categoryData?.name }}
                </h2>
                <PriceTable :category="route.params.category as string" />
            </div>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { ChevronRight, Trees, Euro, Heart } from 'lucide-vue-next'
import { useTreeData } from '~/composables/useTreeData'
import { useFavorites } from '~/composables/useFavorites'
import VarietyModal from '~/components/VarietyModal.vue'
import PriceTable from '~/components/PriceTable.vue'

const route = useRoute()
const { getCategoryBySlug } = useTreeData()
const { isFavorited, toggleFavorite } = useFavorites()

const showVarietyModal = ref(false)
const selectedVariety = ref()
const showPriceModal = ref(false)

// Available categories for navigation
const categories = [
    { name: 'Appelbomen', slug: 'appelbomen' },
    { name: 'Perenbomen', slug: 'perenbomen' },
    { name: 'Nashi', slug: 'nashi-peren' }
]

const categoryData = computed(() => {
    return getCategoryBySlug(route.params.category as string)
})

const openVarietyModal = (variety: any) => {
    selectedVariety.value = variety
    showVarietyModal.value = true
}

const toggleVarietyFavorite = (variety: any) => {
    toggleFavorite({
        name: variety.name,
        slug: variety.slug,
        category: route.params.category as string,
        rootstocks: variety.rootstocks,
        description: variety.description,
        harvestTime: variety.harvestTime
    })
}

// Set page meta
useHead({
    title: () => categoryData.value ? `${categoryData.value.name} - Toffe Peren` : 'Assortiment - Toffe Peren'
})
</script>
