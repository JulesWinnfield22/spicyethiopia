<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, onUnmounted, watch } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staticRoute, slugify } from "~/utils/utils";
import { useTransitionHelper } from "~/composables/useTransition";

const { navigateWithTransition } = useTransitionHelper();

const props = defineProps<{
  products: {
    id: string | number;
    title: string;
    image?: string;
    images?: string[];
    price: string | number;
    discountedPrice?: string | number;
    discountPercentage?: number;
    discountExpiry?: string;
    discount?: string;
  }[];
}>();

const container = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

let ctx: gsap.Context;
const timeRemaining = ref<{ [key: string]: string }>({});
let timer: any = null;

const calculateTimeRemaining = (expiry: string) => {
  const total = Date.parse(expiry) - Date.parse(new Date().toString());
  if (total <= 0) return "Expired";

  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${minutes}m`;
};

const updateTimers = () => {
  props.products.forEach((product: any) => {
    if (product.discountExpiry) {
      timeRemaining.value[product.id] = calculateTimeRemaining(
        product.discountExpiry,
      );
    }
  });
};

const initScroll = () => {
  if (ctx) ctx.revert();
  if (!container.value || !wrapper.value || props.products.length === 0) return;

  ctx = gsap.context(() => {
    const containerEl = container.value;
    const wrapperEl = wrapper.value;
    if (!containerEl || !wrapperEl) return;

    // If we have few products, we don't need horizontal scroll
    if (props.products.length < 3) {
      gsap.set(wrapperEl, { justifyContent: "center", paddingLeft: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollDistance = () =>
        wrapperEl.scrollWidth - containerEl.clientWidth + 100;

      gsap.to(wrapperEl, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (props.products.length > 1) {
              activeIndex.value = Math.round(self.progress * (props.products.length - 1));
            }
          },
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(wrapperEl, { x: 0, clearProps: "all" });
    });
  }, container.value);

  ScrollTrigger.refresh();
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  updateTimers();
  timer = setInterval(updateTimers, 60000);
  initScroll();
});

watch(
  () => props.products,
  () => {
    updateTimers();
    setTimeout(initScroll, 100); // Give DOM time to update
  },
  { deep: true },
);

onUnmounted(() => {
  ctx?.revert();
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section
    ref="container"
    class="min-h-screen lg:h-screen w-full flex overflow-hidden bg-base-clr/5 relative py-12 md:py-20 lg:py-32 px-4 md:px-12 lg:px-24"
  >
    <div
      ref="wrapper"
      class="flex flex-col lg:flex-row min-h-full w-full items-center justify-center lg:items-center lg:justify-start px-0 md:px-12 lg:px-32 gap-12 lg:gap-0"
    >
      <!-- Intro Panel -->
      <div
        class="panel flex-shrink-0 w-full lg:w-[400px] lg:pr-20 flex flex-col justify-center text-center lg:text-left"
      >
        <h2
          class="text-4xl md:text-5xl lg:text-7xl font-bold text-dark mb-4 md:mb-6 font-serif leading-tight"
        >
          Deals of<br class="hidden lg:block" />The Month
        </h2>
        <p
          class="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
        >
          Discover our curated selection of premium Ethiopian spices and blends
          at exceptional prices this month.
        </p>

        <div class="flex gap-2 mt-8">
          <template v-if="products.length > 0">
            <span
              v-for="(_, i) in products"
              :key="i"
              :class="i === activeIndex ? 'bg-dark' : 'bg-transparent'"
              class="w-3 h-3 rounded-full border border-dark cursor-pointer transition-colors duration-300"
            ></span>
          </template>
          <template v-else>
            <span
              v-for="i in 3"
              :key="i"
              class="w-3 h-3 rounded-full bg-gray-200 border border-gray-200"
            ></span>
          </template>
        </div>
      </div>

      <!-- Products -->
      <div
        @click.prevent="
          navigateWithTransition(
            `/spice/${slugify(product.title)}`,
            product.title,
          )
        "
        v-for="product in products"
        :key="product.id"
        class="panel flex-shrink-0 w-full md:w-[400px] lg:w-[400px] h-[50vh] lg:h-[60vh] mx-0 lg:mx-4 relative group overflow-hidden rounded-3xl shadow-xl block cursor-pointer"
      >
        <img
          :src="product.image || (product.images && product.images[0])"
          :alt="product.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <!-- Countdown Timer -->
        <div
          v-if="product.discountExpiry"
          class="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold border border-white/10"
        >
          Ends in: {{ timeRemaining[product.id] || "..." }}
        </div>

        <!-- Overlay -->
        <div
          class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
        >
          <div
            v-if="product.discountPercentage"
            class="text-yellow-400 text-sm font-bold mb-1 uppercase tracking-wider"
          >
            {{ product.discountPercentage }}% OFF
          </div>
          <h3 class="text-2xl font-bold mb-2 font-serif">
            {{ product.title }}
          </h3>

          <div class="flex items-center gap-3">
            <span class="text-2xl font-bold text-white"
              >${{ product.discountedPrice || product.price }}</span
            >
            <span
              v-if="product.discountedPrice"
              class="text-lg line-through text-gray-400 opacity-80"
              >${{ product.price }}</span
            >
          </div>
        </div>

        <!-- Floating Tag if provided (optional badge) -->
        <div
          v-if="product.discount"
          class="absolute bottom-10 right-6 bg-black/95 text-white p-4 rounded-3xl backdrop-blur-sm border border-white/10 z-10"
        >
          <div class="text-2xl font-bold text-yellow-400">
            {{ product.discount }}
          </div>
        </div>
      </div>

      <!-- Skeleton placeholders when no products -->
      <template v-if="products.length === 0">
        <div
          v-for="i in 3"
          :key="'skeleton-' + i"
          class="panel flex-shrink-0 w-full md:w-[400px] lg:w-[400px] h-[50vh] lg:h-[60vh] mx-0 lg:mx-4 rounded-3xl overflow-hidden relative"
        >
          <div class="w-full h-full bg-gray-100 rounded-3xl relative">
            <div class="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-gray-200/80 to-transparent rounded-b-3xl" />
            <div class="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <div class="h-2.5 bg-gray-200 rounded-full w-1/4"></div>
              <div class="h-5 bg-gray-200 rounded-full w-2/3"></div>
              <div class="h-4 bg-gray-200 rounded-full w-1/5"></div>
            </div>
          </div>
          <!-- Expired overlay (only on first skeleton) -->
          <div
            v-if="i === 1"
            class="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/70 backdrop-blur-sm"
          >
            <span class="text-3xl">🌶</span>
            <p class="text-dark font-semibold text-lg font-serif text-center px-6">This month's offers have ended</p>
            <p class="text-gray-400 text-sm text-center px-8">Check back soon for new deals</p>
          </div>
        </div>
      </template>

      <!-- Padding right -->
      <div class="w-20 flex-shrink-0"></div>
    </div>
  </section>
</template>

<style scoped>
/* Optional specific styles */
</style>
