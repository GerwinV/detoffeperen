<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div v-if="variety" class="p-6">
      <h2 class="text-2xl font-bold font-playfair text-text mb-4">
        {{ variety.name }}
      </h2>

      <div class="space-y-6">
        <!-- Description -->
        <div>
          <h3 class="text-sm font-semibold text-[rgb(var(--color-text)/0.6)] uppercase tracking-wide mb-2">
            Beschrijving
          </h3>
          <p class="text-text leading-relaxed">
            {{ variety.description }}
          </p>
        </div>

        <!-- Harvest Time (if available) -->
        <div v-if="variety.harvestTime">
          <h3 class="text-sm font-semibold text-[rgb(var(--color-text)/0.6)] uppercase tracking-wide mb-2">
            Oogsttijd
          </h3>
          <p class="text-text">
            <Calendar class="w-4 h-4 inline mr-1 text-primary" />
            {{ variety.harvestTime }}
          </p>
        </div>

        <!-- Rootstocks -->
        <div>
          <h3 class="text-sm font-semibold text-[rgb(var(--color-text)/0.6)] uppercase tracking-wide mb-3">
            Beschikbare onderstammen
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="rootstock in variety.rootstocks"
              :key="rootstock"
              class="inline-block px-4 py-2 bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] rounded-full text-sm font-medium border border-[rgb(var(--color-primary)/0.3)]"
            >
              {{ rootstock }}
            </span>
          </div>
        </div>

        <!-- Info boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-4">
            <div class="flex items-center text-primary mb-2">
              <Sprout class="w-5 h-5 mr-2" />
              <span class="font-semibold text-text">Ecologisch verantwoord gekweekt</span>
            </div>
            <p class="text-sm text-[rgb(var(--color-text)/0.7)] break-words">
              Zonder bestrijdingsmiddelen of kunstmest
            </p>
          </div>
          <div class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-4">
            <div class="flex items-center text-primary mb-2">
              <Trees class="w-5 h-5 mr-2" />
              <span class="font-semibold text-text">Ongesnoeid</span>
            </div>
            <p class="text-sm text-[rgb(var(--color-text)/0.7)]">
              Ideaal voor voedselbossen
            </p>
          </div>
        </div>

        <!-- Prices -->
        <div v-if="category">
          <h3 class="text-sm font-semibold text-[rgb(var(--color-text)/0.6)] uppercase tracking-wide mb-3">
            Prijzen
          </h3>
          <PriceTable :category="category" />
        </div>

        <!-- Action buttons -->
        <div class="flex justify-between items-center pt-4 border-t border-[rgb(var(--color-text)/0.1)]">
          <button
            @click="handleToggleFavorite"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200',
              isVarietyFavorited
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            ]"
          >
            <Heart :class="[
              'w-5 h-5 transition-all',
              isVarietyFavorited && 'fill-current'
            ]" />
            <span>{{ isVarietyFavorited ? 'Verwijder favoriet' : 'Voeg toe aan favorieten' }}</span>
          </button>
          <BaseButton
            variant="outline"
            @click="$emit('update:modelValue', false)"
          >
            Sluiten
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sprout, Trees, Calendar, Heart } from 'lucide-vue-next'
import PriceTable from '~/components/PriceTable.vue'
import { useFavorites } from '~/composables/useFavorites'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  variety: {
    type: Object,
    default: null
  },
  category: {
    type: String,
    default: null
  }
})

defineEmits(['update:modelValue'])

const { isFavorited, toggleFavorite } = useFavorites()

const isVarietyFavorited = computed(() => {
  if (!props.variety || !props.category) return false
  return isFavorited(props.variety.slug, props.category)
})

const handleToggleFavorite = () => {
  if (!props.variety || !props.category) return

  toggleFavorite({
    name: props.variety.name,
    slug: props.variety.slug,
    category: props.category,
    rootstocks: props.variety.rootstocks,
    description: props.variety.description,
    harvestTime: props.variety.harvestTime
  })
}
</script>