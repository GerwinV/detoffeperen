<template>
  <div>
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <component
        :is="inputComponent"
        :id="inputId"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :class="inputClasses"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
      
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
    </div>
    
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  icon?: any
  textarea?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  textarea: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const inputId = useId()

const inputComponent = computed(() => props.textarea ? 'textarea' : 'input')

const inputClasses = computed(() => {
  const base = 'form-input'
  const withIcon = props.icon ? 'pl-10' : ''
  const withError = props.error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
  
  return [base, withIcon, withError].filter(Boolean).join(' ')
})

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>