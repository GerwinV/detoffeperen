<template>
    <div>
        <!-- Ultra-Compact Hero -->
        <section class="bg-gradient-to-br from-green-50 to-green-100 py-6 md:py-8">
            <div class="container">
                <div class="text-center">
                    <h1 class="text-3xl md:text-4xl font-bold font-playfair text-text mb-2">
                        Kwekerij <span class="text-gradient">De toffe peren</span>
                    </h1>
                    <p class="text-sm md:text-base text-gray-600 mb-4 max-w-xl mx-auto">
                        Biologische fruitbomen voor voedselbossen en tuinen
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

        <!-- Slim Newsletter Bar -->
        <section class="py-6 bg-white border-t">
            <div class="container">
                <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
                    <span class="text-sm font-medium text-gray-700 whitespace-nowrap">Blijf op de hoogte:</span>
                    <BaseInput
                        v-model="email"
                        type="email"
                        placeholder="Uw e-mailadres"
                        required
                        class="flex-1"
                        size="sm" />
                    <BaseButton type="submit" :loading="subscribing" size="sm">
                        Aanmelden
                    </BaseButton>
                </form>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTreeData } from '~/composables/useTreeData'
import CategoryGrid from '~/components/CategoryGrid.vue'

const email = ref('')
const subscribing = ref(false)

const { getCategories } = useTreeData()
const categories = getCategories()

const subscribeNewsletter = async () => {
    subscribing.value = true
    // TODO: Implement newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 2000))
    subscribing.value = false
    email.value = ''
    alert('Bedankt voor uw aanmelding!')
}
</script>
