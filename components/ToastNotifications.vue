<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all"
      :class="{
        'bg-green-600': toast.color === 'green',
        'bg-red-600': toast.color === 'red',
        'bg-yellow-500': toast.color === 'yellow',
        'bg-blue-600': toast.color === 'blue'
      }"
    >
      {{ toast.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { toasts } = useToast()
</script>
