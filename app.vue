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

const route = useRoute();

const siteUrl = "https://store.spicyethiopian.com";

useHead({
  title: "The Spicy Ethiopian | Authentic Spices",
  meta: [
    {
      name: "description",
      content:
        "Experience the true essence of Ethiopian cuisine. From the vibrant markets of Addis Ababa to your doorstep, we bring you the finest, most aromatic spices.",
    },
    {
      name: "google-site-verification",
      content: "IJMGCzONhiinxhK4hWPNZEYO-s4mLuJiupYxsPJciCM",
    },
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/spice-logo.png" },
    {
      rel: "canonical",
      href: () => `${siteUrl}${route.path}`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        name: "The Spicy Ethiopian",
        url: siteUrl,
        logo: `${siteUrl}/spice-logo.png`,
        description:
          "Authentic Ethiopian spices delivered to your door. Premium, organic selections from Berbere to Mitmita.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CA",
        },
        sameAs: [],
      }),
    },
  ],
});

useSeoMeta({
  ogType: "website",
  ogSiteName: "The Spicy Ethiopian",
  ogImage: `${siteUrl}/spice-logo.png`,
  ogUrl: () => `${siteUrl}${route.path}`,
  twitterCard: "summary_large_image",
});
</script>
