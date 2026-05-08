<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
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
const { transitionTitle } = useTransitionHelper();

const loadingMessages = [
  "Warming up the berbere...",
  "Awakening the flavors...",
  "Sourcing authentic spices...",
  "Preparing the perfect blend...",
  "Grinding organic seeds...",
  "Bringing the heat...",
];

const currentMessageIndex = useState("loading-message-index", () =>
  Math.floor(Math.random() * loadingMessages.length),
);

onMounted(() => {
  const interval = setInterval(() => {
    currentMessageIndex.value =
      (currentMessageIndex.value + 1) % loadingMessages.length;
  }, 2500);

  onUnmounted(() => clearInterval(interval));
});

const formatSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const pageTitleChars = computed(() => {
  let title = "Spicy Ethiopia";

  if (transitionTitle.value) {
    title = transitionTitle.value;
  } else if (route.name === "spice-slug" && route.params.slug) {
    title = formatSlug(route.params.slug as string);
  } else {
    const metaTitle = (route.meta.title as string)?.split("-")[0]?.trim();
    const routeName = route.name as string;

    if (metaTitle) {
      title = metaTitle;
    } else if (routeName === "index") {
      title = "Spicy Ethiopia";
    } else {
      title = routeName || "Spicy Ethiopia";
    }
  }

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
    <div class="flex flex-col items-center gap-12 max-w-4xl w-full">
      <h1
        ref="titleContainerRef"
        class="text-6xl md:text-8xl font-bold text-black tracking-wide text-center px-4 flex flex-wrap justify-center font-cursive"
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

      <!-- Enhanced Loading Indicator -->
      <div v-if="isAppLoading" class="flex flex-col items-center gap-8">
        <div class="relative size-16 flex items-center justify-center">
          <!-- Ripple Rings -->
          <div
            class="absolute inset-0 bg-black/10 rounded-full animate-ripple"
          ></div>
          <div
            class="absolute inset-0 bg-black/5 rounded-full animate-ripple delay-500"
          ></div>
          <div
            class="absolute inset-0 bg-black/5 rounded-full animate-ripple delay-1000"
          ></div>

          <!-- Central Dot -->
          <div
            class="size-5 bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          ></div>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <p
            :key="currentMessageIndex"
            class="text-black font-cursive mt-12 text-2xl md:text-3xl text-center"
            :style="{ fontFamily: 'Dancing Script, cursive' }"
          >
            {{ loadingMessages[currentMessageIndex] }}
          </p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-1000 {
  animation-delay: 1s;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
