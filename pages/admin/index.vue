<script setup lang="ts">
// Redirect parent /admin to /admin/orders
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo("/admin/orders");
    },
  ],
});
</script>

<template>
  <div>Redirecting to orders...</div>
</template>
