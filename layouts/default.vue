<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow flex flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
</script>