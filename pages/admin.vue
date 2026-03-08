<script setup lang="ts">
// Forced layout: false so we can wrap the page in NuxtLayout manually for persistence
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="admin">
    <NuxtPage />
  </NuxtLayout>
</template>
