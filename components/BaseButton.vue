<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
    <component
      v-else-if="icon"
      :is="icon"
      :class="iconClasses"
    />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: RouteLocationRaw
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: any
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'bg-transparent text-text hover:bg-gray-100 focus:ring-gray-300'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }
  
  return [
    base,
    variants[props.variant],
    sizes[props.size],
    props.block && 'w-full'
  ].filter(Boolean).join(' ')
})

const iconClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  return sizes[props.size]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>