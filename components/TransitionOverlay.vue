<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  inject,
  type Ref,
} from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "M0,0 C0.05,0.5 0.2,0.8 1,1");
  CustomEase.create("smooth", "M0,0 C0.19,1 0.22,1 1,1");
});

const overlayRef = ref<HTMLElement | null>(null);
const titleContainerRef = ref<HTMLElement | null>(null);
const route = useRoute();
const isAppLoading = inject<Ref<boolean>>("isAppLoading");

const pageTitleChars = computed(() => {
  const title =
    (route.meta.title as string)?.split("-")[0]?.trim() ||
    (route.name as string) ||
    "Spicy Ethiopia";
  return title.split("").map((char, index) => ({
    id: index,
    char: char === " " ? "\u00A0" : char, // Handle spaces
  }));
});

watch(
  pageTitleChars,
  async () => {
    await nextTick();
    if (titleContainerRef.value) {
      gsap.set(titleContainerRef.value.children, {
        opacity: 0,
        y: 20,
        rotate: 10,
      });
    }
  },
  { immediate: true },
);

const isVisible = ref(true); // Start visible for initial load

watch(
  () => isAppLoading?.value,
  (loading) => {
    if (loading === false) {
      // Small delay to ensure everything is mounted and ready
      setTimeout(() => {
        leave(() => {});
      }, 100);
    }
  },
  { immediate: true },
);

const enter = (done: () => void) => {
  if (isVisible.value || !overlayRef.value) {
    if (process.client) {
      requestAnimationFrame(done);
    } else {
      done();
    }
    return;
  }
  isVisible.value = true;

  const tl = gsap.timeline({
    onComplete: done,
  });

  // Reset chars
  if (titleContainerRef.value) {
    gsap.set(titleContainerRef.value.children, {
      opacity: 0,
      y: 20,
      rotate: 10,
    });
  }

  // 1. Overlay slides up
  tl.set(overlayRef.value, { y: "100%", opacity: 1 });
  tl.to(overlayRef.value, {
    y: "0%",
    duration: 0.5,
    ease: "smooth",
  });
};

const leave = (done: () => void) => {
  if (!isVisible.value || !overlayRef.value) {
    if (process.client) {
      requestAnimationFrame(done);
    } else {
      done();
    }
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Reset
      isVisible.value = false;
      gsap.set(overlayRef.value, { y: "100%" });
      done();
    },
  });

  // 2. Title writes on
  if (titleContainerRef.value) {
    tl.to(titleContainerRef.value.children, {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.04, // Faster typewriter effect
    });

    // 3. Title fades out
    tl.to(
      titleContainerRef.value.children,
      {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        stagger: {
          amount: 0.2,
          from: "end", // Fade out from end
        },
      },
      "+=0.15", // Reduced hang time
    );
  }

  // 4. Overlay slides down
  tl.to(
    overlayRef.value,
    {
      y: "100%",
      duration: 0.5,
      ease: "smooth",
    },
    "-=0.1",
  );
};

defineExpose({ enter, leave });
</script>

<template>
  <div
    ref="overlayRef"
    class="fixed inset-0 z-9999 pointer-events-none flex items-center justify-center bg-base-clr"
    style="transform: translateY(0%)"
  >
    <h1
      ref="titleContainerRef"
      class="text-5xl md:text-7xl font-bold text-black tracking-wide text-center px-4 flex flex-wrap justify-center font-cursive"
      :style="{ fontFamily: 'Dancing Script, cursive' }"
    >
      <span
        v-for="charObj in pageTitleChars"
        :key="charObj.id"
        class="inline-block"
        style="opacity: 0; transform: translateY(20px) rotate(10deg)"
      >
        {{ charObj.char }}
      </span>
    </h1>
  </div>
</template>
