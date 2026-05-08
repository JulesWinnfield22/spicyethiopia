<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, provide, ref, onMounted } from "vue";
import Lenis from "lenis";

const lenis = shallowRef<Lenis | null>(null);
provide("lenis", lenis);

const isAppLoading = ref(true);
provide("isAppLoading", isAppLoading);

onMounted(() => {
  // Small delay to ensure everything is settled
  setTimeout(() => {
    isAppLoading.value = false;
  }, 500);
});

// These will be provided by layouts that support TransitionOverlay (e.g. Default)
const transitionOverlay = ref<{
  enter: (cb: () => void) => void;
  leave: (cb: () => void) => void;
} | null>(null);
provide("transitionOverlay", transitionOverlay);

useHead({
  title: "The Spicy Ethiopian | Authentic Spices",
  meta: [
    {
      name: "description",
      content: "Authentic Ethiopian Spices Delivered to Your Door",
    },
    {
      name: "google-site-verification",
      content: "IJMGCzONhiinxhK4hWPNZEYO-s4mLuJiupYxsPJciCM",
    },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/spice-logo.png" }],
});
</script>
