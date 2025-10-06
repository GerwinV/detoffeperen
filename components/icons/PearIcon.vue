<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
  >
    <path
      d="M12 2C10 2 9 4 9 6C9 7 9 8 8.5 9C7.5 11 6 13 6 16C6 19.866 8.686 22 12 22C15.314 22 18 19.866 18 16C18 13 16.5 11 15.5 9C15 8 15 7 15 6C15 4 14 2 12 2Z"
      fill="currentColor"
    />
    <path
      d="M12 2C12 2 11.5 0.5 11 0.5C10.5 0.5 10 1 10 1.5C10 2 10.5 2.5 11 2.5C11.5 2.5 12 2 12 2Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  className: ''
})
</script>