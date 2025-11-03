<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-[rgb(var(--color-text)/0.1)]">
      <slot name="header">
        <h3 class="text-lg font-semibold text-text">{{ title }}</h3>
      </slot>
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 border-t border-[rgb(var(--color-text)/0.1)] bg-[rgb(var(--color-background)/0.3)]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  padding?: boolean
  hoverable?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: true,
  hoverable: false,
  clickable: false
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg shadow-md overflow-hidden'
  const interactive = []

  if (props.hoverable) {
    interactive.push('transition-shadow duration-200 hover:shadow-lg')
  }

  if (props.clickable) {
    interactive.push('cursor-pointer')
  }

  return [base, ...interactive].join(' ')
})

const bodyClasses = computed(() => {
  return props.padding ? 'px-6 py-4' : ''
})
</script>