<template>
    <div>
        <!-- Compact Header -->
        <section class="bg-white py-4 md:py-6 sticky top-0 z-10 shadow-sm">
            <div class="container">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
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
                    <BaseButton href="https://docs.google.com/spreadsheets/d/1234567890/edit" target="_blank" variant="outline" size="sm" class="self-start md:self-center inline-flex items-center whitespace-nowrap">
                        <ExternalLink class="w-4 h-4 mr-1.5" />
                        <span>Voorraad</span>
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Varieties Section -->
        <section class="py-8 md:py-12">
            <div class="container">
                <div v-if="categoryData">
                    <!-- Info message -->
                    <div class="mb-8 text-center">
                        <div class="inline-block bg-white border border-[rgb(var(--color-primary)/0.3)] rounded-lg px-6 py-4 max-w-2xl shadow-sm">
                            <p class="text-sm text-text">
                                Dit jaar hebben we nog een beperkte voorraad, neem
                                <NuxtLink to="/contact" class="text-primary font-semibold hover:underline">contact</NuxtLink>
                                met ons op wanneer je interesse in een variëteit hebt.
                            </p>
                        </div>
                    </div>

                    <!-- Variety count badge -->
                    <div class="mb-6 text-center">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-text shadow-sm">
                            {{ categoryData.varieties.length }} variëteiten beschikbaar
                        </span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                        <div v-for="variety in categoryData.varieties" :key="variety.name" class="group bg-white rounded-lg shadow-sm border border-[rgb(var(--color-text)/0.1)] p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer relative overflow-hidden" @click="openVarietyModal(variety)">
                            <!-- Harvest time badge if available -->
                            <div v-if="variety.harvestTime" class="absolute top-4 right-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {{ variety.harvestTime }}
                                </span>
                            </div>

                            <div class="pr-8">
                                <h3 class="text-lg font-semibold text-text mb-3 group-hover:text-primary transition-colors">
                                    {{ variety.name }}
                                </h3>

                                <div class="space-y-2">
                                    <p class="text-xs font-medium text-[rgb(var(--color-text)/0.6)] uppercase tracking-wider">Onderstammen:</p>
                                    <div class="flex flex-wrap gap-2">
                                        <span v-for="rootstock in variety.rootstocks" :key="rootstock" class="inline-block px-2.5 py-1 bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] rounded-full text-xs font-medium border border-[rgb(var(--color-primary)/0.3)]">
                                            {{ rootstock }}
                                        </span>
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
        <VarietyModal v-model="showVarietyModal" :variety="selectedVariety" />
    </div>
</template>

<script setup lang="ts">
import { ExternalLink, ChevronRight } from 'lucide-vue-next'
import { useTreeData } from '~/composables/useTreeData'
import VarietyModal from '~/components/VarietyModal.vue'

const route = useRoute()
const { getCategoryBySlug } = useTreeData()

const showVarietyModal = ref(false)
const selectedVariety = ref()

const categoryData = computed(() => {
    return getCategoryBySlug(route.params.category as string)
})

const openVarietyModal = (variety: any) => {
    selectedVariety.value = variety
    showVarietyModal.value = true
}

// Set page meta
useHead({
    title: () => categoryData.value ? `${categoryData.value.name} - de Toffe Peren` : 'Assortiment - de Toffe Peren'
})
</script>
