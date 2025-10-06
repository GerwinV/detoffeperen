<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="closeOnBackdrop && close()"
          />

          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="modelValue"
              :class="modalClasses"
            >
              <div v-if="$slots.header || title" class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <slot name="header">
                      <h3 class="text-lg font-semibold leading-6 text-gray-900">
                        {{ title }}
                      </h3>
                    </slot>
                  </div>
                </div>
              </div>

              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <slot />
              </div>

              <div v-if="$slots.footer" class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modalClasses = computed(() => {
  const base = 'relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle'
  
  const sizes = {
    sm: 'sm:max-w-sm sm:w-full',
    md: 'sm:max-w-md sm:w-full',
    lg: 'sm:max-w-lg sm:w-full',
    xl: 'sm:max-w-xl sm:w-full',
    full: 'sm:max-w-full sm:w-full sm:mx-4'
  }
  
  return [base, sizes[props.size]].join(' ')
})

const close = () => {
  emit('update:modelValue', false)
}
</script>