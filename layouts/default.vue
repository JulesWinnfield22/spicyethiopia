<script setup lang="ts">
import icons from "~/utils/icons";
import { useCartStore } from "~/stores/cartStore";
import {
  onMounted,
  onUnmounted,
  ref,
  inject,
  watch,
  type ShallowRef,
  type Ref,
} from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useTransitionHelper } from "~/composables/useTransition";
import { clearAllSiteCache } from "~/utils/cache";

const CACHE_VERSION = "2024.03.08.2"; // Bumped to include SW unregistration

const route = useRoute();
const cartStore = useCartStore();
const { navigateWithTransition } = useTransitionHelper();


const lenis = inject<ShallowRef<Lenis | null>>("lenis")!;

// Interface for TransitionOverlay methods
interface TransitionOverlayInstance {
  enter: (cb: () => void) => void;
  leave: (cb: () => void) => void;
}

const transitionOverlayRef = ref<TransitionOverlayInstance | null>(null);
const globalTransitionOverlay =
  inject<Ref<TransitionOverlayInstance | null>>("transitionOverlay");

// Sync local ref with global provide
watch(transitionOverlayRef, (val) => {
  if (globalTransitionOverlay) {
    globalTransitionOverlay.value = val;
  }
});

const isScrolled = ref(false);
const isNavVisible = ref(true);
const isMenuOpen = ref(false);
const lastScrollY = ref(0);

onMounted(async () => {
  if (process.client) {
    // Cache clearing logic
    const savedVersion = localStorage.getItem("SPICY_CACHE_VERSION");
    const forceClear = route.query.clearCache === "true";

    if (savedVersion !== CACHE_VERSION || forceClear) {
      await clearAllSiteCache();
      localStorage.setItem("SPICY_CACHE_VERSION", CACHE_VERSION);

      if (forceClear) {
        // Remove the query param from URL without refreshing
        const url = new URL(window.location.href);
        url.searchParams.delete("clearCache");
        window.history.replaceState({}, "", url.toString());
      }
    }

    gsap.registerPlugin(ScrollTrigger, Flip);

    lenis.value = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.value.on("scroll", (e: any) => {
      ScrollTrigger.update();
      ScrollTrigger.refresh();

      isScrolled.value = e.scroll > 50;

      const currentScrollY = e.scroll;
      const diff = currentScrollY - lastScrollY.value;

      if (currentScrollY < 100) {
        isNavVisible.value = true;
      } else if (diff > 5) {
        isNavVisible.value = false;
      } else if (diff < -5) {
        isNavVisible.value = true;
      }

      lastScrollY.value = currentScrollY;
    });

    gsap.ticker.add((time) => {
      lenis.value?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }
});

onUnmounted(() => {
  if (process.client) {
    lenis.value?.destroy();
    lenis.value = null;
  }
});

const handleEnter = (el: Element, done: () => void) => {
  if (lenis.value) {
    lenis.value.scrollTo(0, { immediate: true });
  }

  if (transitionOverlayRef.value?.leave) {
    transitionOverlayRef.value.leave(() => {
      done();
    });
  } else {
    gsap.set(el, { opacity: 1 });
    done();
  }
};

const handleLeave = (el: Element, done: () => void) => {
  if (transitionOverlayRef.value?.enter) {
    transitionOverlayRef.value.enter(() => {
      done();
    });
  } else {
    gsap.to(el, { opacity: 0, duration: 0.3, onComplete: done });
  }
};
</script>
<template>
  <div class="min-h-screen">
    <ClientOnly>
      <ImmersiveMenu v-model="isMenuOpen" />
    </ClientOnly>

    <nav
      v-if="!route.meta.hideNavbar"
      class="fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-auto"
      :class="[
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4'
          : 'bg-transparent py-6',
        isNavVisible ? 'translate-y-0' : '-translate-y-full',
      ]"
    >
      <div
        class="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between"
      >
        <div
          @click="navigateWithTransition('/', 'Spicy Ethiopian')"
          class="flex items-center gap-4 hover:scale-105 transition-transform shrink-0 cursor-pointer"
        >
          <img
            src="/spice-logo.png"
            alt="Logo"
            class="h-10 md:h-12 w-auto object-contain"
          />
          <span class="font-dm-serif font-bold font-sm md:text-2xl"
            >The Spicy Ethiopian</span
          >
        </div>

        <div class="flex items-center gap-6">
          <!-- <div
            class="flex cursor-pointer bg-base-clr/10 shadow-sm px-4 rounded-full items-center gap-2 font-dm-sans font-medium hover:opacity-70 transition-opacity group"
            @click="navigateWithTransition('/spice')"
          >
            <span class="hidden text-lg sm:inline-block text-black"
              >Spices</span
            >
            <div class="relative size-10 grid place-items-center">
              <i v-html="icons.badge" class="w-6 h-6" />
            </div>
          </div> -->

          <div
            class="flex cursor-pointer bg-base-clr/10 shadow-sm px-4 rounded-full items-center gap-2 font-dm-sans font-medium hover:opacity-70 transition-opacity group"
            @click="navigateWithTransition('/cart', 'Cart')"
          >
            <span class="hidden text-lg sm:inline-block text-black">Cart</span>

            <div class="relative size-10 grid place-items-center">
              <i v-html="icons.cart" class="w-6 h-6" />
              <ClientOnly>
                <span
                  v-if="cartStore.count > 0"
                  class="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] size-4 rounded-full flex items-center justify-center font-bold shadow-sm"
                >
                  {{ cartStore.count }}
                </span>
              </ClientOnly>
            </div>
          </div>

          <button
            @click="isMenuOpen = true"
            class="size-10 grid place-items-center bg-black text-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md"
          >
            <i v-html="icons.menu" class="scale-110 text-white" />
          </button>
        </div>
      </div>
    </nav>

    <div
      class="w-full pt-24 flex flex-col gap-8 relative z-10 overflow-x-hidden"
    >
      <Transition
        :css="false"
        mode="out-in"
        @enter="handleEnter"
        @leave="handleLeave"
      >
        <div :key="route.path">
          <slot />
        </div>
      </Transition>
      <Footer />
    </div>

    <TransitionOverlay ref="transitionOverlayRef" />
  </div>
</template>

<style scoped>
.__nav .router-link-exact-active {
  font-weight: 700;
}
</style>
