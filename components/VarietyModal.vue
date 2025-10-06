<template>
  <BaseModal :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div v-if="variety" class="p-6">
      <h2 class="text-2xl font-bold font-playfair text-text mb-4">
        {{ variety.name }}
      </h2>

      <div class="space-y-6">
        <!-- Description -->
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Beschrijving
          </h3>
          <p class="text-gray-700 leading-relaxed">
            {{ variety.description }}
          </p>
        </div>

        <!-- Harvest Time (if available) -->
        <div v-if="variety.harvestTime">
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Oogsttijd
          </h3>
          <p class="text-gray-700">
            <Calendar class="w-4 h-4 inline mr-1 text-green-600" />
            {{ variety.harvestTime }}
          </p>
        </div>

        <!-- Rootstocks -->
        <div>
          <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
            Beschikbare onderstammen
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="rootstock in variety.rootstocks"
              :key="rootstock"
              class="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
            >
              {{ rootstock }}
            </span>
          </div>
        </div>

        <!-- Info boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center text-green-600 mb-2">
              <Sprout class="w-5 h-5 mr-2" />
              <span class="font-semibold">Biologisch gekweekt</span>
            </div>
            <p class="text-sm text-gray-600">
              Zonder bestrijdingsmiddelen of kunstmest
            </p>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center text-green-600 mb-2">
              <Trees class="w-5 h-5 mr-2" />
              <span class="font-semibold">Ongesnoeid</span>
            </div>
            <p class="text-sm text-gray-600">
              Ideaal voor voedselbossen
            </p>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <BaseButton
            href="https://docs.google.com/spreadsheets/d/1234567890/edit"
            target="_blank"
            variant="primary"
            class="flex-1 inline-flex items-center justify-center"
          >
            <ExternalLink class="w-4 h-4 mr-2" />Bekijk actuele voorraad
          </BaseButton>
          <BaseButton
            variant="outline"
            @click="$emit('update:modelValue', false)"
            class="flex-1"
          >
            Sluiten
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ExternalLink, Sprout, Trees, Calendar } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  variety: {
    type: Object,
    default: null
  }
})

defineEmits(['update:modelValue'])
</script>