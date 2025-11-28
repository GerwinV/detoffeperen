<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)" size="2xl">
    <div v-if="variety" class="p-6 max-h-[85vh] overflow-y-auto">
      <!-- Header -->
      <div class="mb-6">
        <!-- Category badge -->
        <span
          v-if="category"
          class="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary)/0.3)] mb-3"
        >
          {{ categoryDisplayName }}
        </span>

        <h2 class="text-2xl font-bold font-playfair text-text mb-1">
          {{ variety.name }}
        </h2>

        <!-- Latin name -->
        <p v-if="variety.latinName" class="text-sm text-[rgb(var(--color-text)/0.5)] italic mb-2">
          {{ variety.latinName }}
        </p>

        <p v-if="variety.origin" class="text-sm text-[rgb(var(--color-text)/0.6)]">
          <MapPin class="w-3.5 h-3.5 inline mr-1" />
          {{ variety.origin }}
        </p>
      </div>

      <!-- Feature badges -->
      <div v-if="variety.features && variety.features.length" class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="feature in variety.features"
          :key="feature"
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary)/0.3)]"
        >
          <Sparkles class="w-3 h-3 mr-1" />
          {{ feature }}
        </span>
      </div>

      <div class="space-y-6">
        <!-- Key info grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- Bloeitijd -->
          <div v-if="variety.blossomTime" class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-3">
            <div class="flex items-center text-[rgb(var(--color-text)/0.5)] mb-1">
              <Flower2 class="w-4 h-4 mr-1.5" />
              <span class="text-xs font-medium uppercase tracking-wide">Bloeitijd</span>
            </div>
            <p class="text-sm text-text font-medium">{{ variety.blossomTime }}</p>
          </div>

          <!-- Oogsttijd -->
          <div v-if="variety.harvestTime" class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-3">
            <div class="flex items-center text-[rgb(var(--color-text)/0.5)] mb-1">
              <Calendar class="w-4 h-4 mr-1.5" />
              <span class="text-xs font-medium uppercase tracking-wide">Oogsttijd</span>
            </div>
            <p class="text-sm text-text font-medium">{{ variety.harvestTime }}</p>
          </div>

          <!-- Vruchtkeur -->
          <div v-if="variety.fruitColor" class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-3">
            <div class="flex items-center text-[rgb(var(--color-text)/0.5)] mb-1">
              <Palette class="w-4 h-4 mr-1.5" />
              <span class="text-xs font-medium uppercase tracking-wide">Vruchtuiterlijk</span>
            </div>
            <p class="text-sm text-text font-medium">{{ variety.fruitColor }}</p>
          </div>

          <!-- Bestuiving -->
          <div v-if="variety.pollination" class="bg-[rgb(var(--color-background)/0.5)] rounded-lg p-3">
            <div class="flex items-center text-[rgb(var(--color-text)/0.5)] mb-1">
              <Bug class="w-4 h-4 mr-1.5" />
              <span class="text-xs font-medium uppercase tracking-wide">Bestuiving</span>
            </div>
            <p class="text-sm text-text font-medium">{{ variety.pollination }}</p>
          </div>
        </div>

        <!-- Smaak -->
        <div v-if="variety.taste" class="bg-gradient-to-r from-[rgb(var(--color-primary)/0.1)] to-[rgb(var(--color-primary)/0.05)] rounded-lg p-4">
          <div class="flex items-center text-primary mb-2">
            <Apple class="w-5 h-5 mr-2" />
            <span class="font-semibold">Smaakprofiel</span>
          </div>
          <p class="text-text leading-relaxed">{{ variety.taste }}</p>
        </div>

        <!-- Volledige beschrijving -->
        <div v-if="variety.fullDescription">
          <h3 class="text-sm font-semibold text-[rgb(var(--color-text)/0.6)] uppercase tracking-wide mb-2">
            Over deze variëteit
          </h3>
          <p class="text-text leading-relaxed text-sm">
            {{ variety.fullDescription }}
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
              class="inline-block px-4 py-2 bg-white text-text rounded-full text-sm font-medium border border-[rgb(var(--color-text)/0.2)] shadow-sm"
            >
              {{ rootstock }}
            </span>
          </div>
        </div>

        <!-- Info boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div class="bg-[rgb(var(--color-background)/0.3)] rounded-lg p-4">
            <div class="flex items-center text-primary mb-2">
              <Sprout class="w-5 h-5 mr-2" />
              <span class="font-semibold text-text">Ecologisch gekweekt</span>
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
import { Sprout, Trees, Calendar, Heart, MapPin, Flower2, Palette, Bug, Apple, Sparkles } from 'lucide-vue-next'
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

const categoryDisplayName = computed(() => {
  const names: Record<string, string> = {
    'appelbomen': 'Appel',
    'perenbomen': 'Peer',
    'nashi-peren': 'Nashi'
  }
  return names[props.category] || props.category
})

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
