<script setup lang="ts">
definePageMeta({ title: "Spicy Ethiopian" });
useSeoMeta({
  title: "The Spicy Ethiopian | Authentic Ethiopian Spices",
  description:
    "Experience the true essence of Ethiopian cuisine. From the vibrant markets of Addis Ababa to your doorstep, we bring you the finest, most aromatic spices. Berbere, Mitmita, and more.",
  ogTitle: "The Spicy Ethiopian | Authentic Ethiopian Spices",
  ogDescription:
    "Premium, organic Ethiopian spices sourced directly and delivered across Canada. Shop Berbere, Mitmita, and more.",
});
import { onMounted, ref, computed, inject, type ShallowRef } from "vue";
import type Lenis from "lenis";
import spices1 from "~/assets/img/spiceSpoonRight.png";
import spices2 from "~/assets/img/spiceSpoonLeft.png";
import spices3 from "~/assets/img/coffee.png";
import spices4 from "~/assets/img/spiceSpoonBottom.png";
import qualityIcon from "~/assets/img/quality.png";
import warrantyIcon from "~/assets/img/warranty.png";
import shippingIcon from "~/assets/img/shipping.png";
import supportIcon from "~/assets/img/support.png";
import berbereImage from "~/assets/img/berbereImage.png";
import flag from "~/assets/img/flagEth.png";
import SpiceShopping from "~/components/SpiceShopping.vue";
import SpiceCarousel from "~/components/SpiceCarousel.vue";
import Footer from "~/components/Footer.vue";
import Gallery from "~/components/Gallery.vue";
import icons from "~/utils/icons";
import DealsOfTheMonth from "~/components/sections/DealsOfTheMonth.vue";
import Ad from "~/components/Ad.vue";
import Ad2 from "~/components/Ad2.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import { getDealsOfTheMonth } from "~/features/admin/api/productApi";
import { staticRoute } from "~/utils/utils";
import Parallax from "~/components/Parallax.vue";
import Reveal from "~/components/Reveal.vue";
import gsap from "gsap";

const dealsReq = useApiMutation();

const dealsProducts = computed(() => {
  const res = (dealsReq.response.value || []).map((product: any) => ({
    ...product,
    id: product.id,
    title: product.title,
    image: `${staticRoute}/${product.images[0]}`,
    // Keep raw values for DealsOfTheMonth to handle formatting/strikethrough
    price: product.price,
    discountedPrice: product.discountedPrice,
    discountExpiry: product.discountExpiry,
    discountPercentage: product.discountPercentage,
  }));

  return res;
});

const steps = [
  {
    title: "Sign up for your Capital Guard account.",
    description:
      "Initiate your registration either online or through the Paymint app. We'll request certain personal details such as your contact information, nationality, and passport.",
    expanded: false,
  },
  {
    title: "Enter your transfer details",
    description:
      "Provide the necessary banking details and confirm the transaction.",
    expanded: false,
  },
  {
    title: "Send funds for your transfer",
    description: "Complete the payment securely through your preferred method.",
    expanded: false,
  },
];

const featuere = [
  {
    icon: icons.high_quality,
    title: "High Quality",
    description: "Crafted from top materials",
  },
  {
    icon: icons.badge,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: icons.shipping,
    title: "Free Shipping",
    description: "Order over 150$",
  },
  {
    icon: icons.support,
    title: "24/7 Support",
    description: "Dedicated support",
  },
];

const titleRef = ref<HTMLElement | null>(null);
const lenis = inject<ShallowRef<Lenis | null>>("lenis");

const scrollToSpices = () => {
  if (lenis?.value) {
    lenis.value.scrollTo("#featured-spices", {
      offset: -120,
      duration: 1.5,
    });
  } else {
    const el = document.getElementById("featured-spices");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

onMounted(() => {
  dealsReq.send(() => getDealsOfTheMonth());
  if (titleRef.value) {
    const text = titleRef.value.innerText;
    titleRef.value.innerHTML = text
      .split(" ")
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] mr-[0.2em]"><span class="inline-block translate-y-[110%] opacity-0 whitespace-nowrap">${word}</span></span>`,
      )
      .join("");

    gsap.to(titleRef.value.querySelectorAll("span span"), {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "expo.out",
      delay: 0.8,
    });

    gsap.to("#hero-p", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 1.5,
      ease: "power2.out",
    });

    gsap.to("#hero-btns", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.8,
      ease: "power2.out",
    });
  }
});
</script>

<template>
  <div class="relative bg-[#FAF9F6]">
    <!-- Background Atmospheric Elements -->
    <div
      class="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      <!-- Large Blurred Blobs -->
      <div
        class="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-200/20 blur-[120px]"
      ></div>
      <div
        class="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-100/30 blur-[150px]"
      ></div>
      <div
        class="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-green-100/20 blur-[100px]"
      ></div>
      <div
        class="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-red-100/10 blur-[180px]"
      ></div>

      <div
        class="absolute top-[20%] left-[40%] w-4 h-4 rounded-full bg-orange-400/20 blur-sm"
      ></div>
      <div
        class="absolute bottom-[40%] right-[30%] w-3 h-3 rounded-full bg-green-400/20 blur-sm"
      ></div>
      <div
        class="absolute top-[70%] left-[20%] w-6 h-6 rounded-full bg-red-400/10 blur-xl"
      ></div>
    </div>

    <!-- Hero Section -->
    <section
      class="min-h-[70vh] flex items-center justify-center p-4 md:p-6 text-gray-900 text-center relative z-10"
    >
      <Parallax :speed="0.05">
        <Reveal :y="100" :duration="2">
          <div class="grid place-items-center">
            <h1
              ref="titleRef"
              class="max-w-[30ch] p-4 md:p-8 font-dm-serif header-size font-bold leading-tight text-black"
            >
              Authentic Ethiopian Spices Delivered to Your Door.
            </h1>
            <p
              class="header-description p-2 md:p-8 max-w-[105ch] text-gray-700 font-dm-sans font-medium opacity-0"
              id="hero-p"
            >
              Enhance your culinary creations with our authentic Ethiopian
              spices, now available for easy online ordering and home delivery.
              Savor the rich, bold flavors of Ethiopia with our premium, organic
              selections. From Berbere to Mitmita, we bring you the essence of
              Ethiopian cuisine—sourced directly, bursting with flavor, and
              delivered swiftly across Canada.
            </p>
            <div
              class="p-6 flex-col md:flex-row flex items-center justify-center gap-4 opacity-0"
              id="hero-btns"
            >
              <button
                @click="scrollToSpices"
                class="bg-black text-white font-sans px-8 py-4 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-gray-800 shadow-lg"
              >
                Featured Spices
                <span class="*:size-5" v-html="icons.rightArrow" />
              </button>
              <!-- <button
                class="border-2 border-black text-black font-sans px-8 py-4 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-black hover:text-white"
              >
                Explore Ethiopian Recipes
                <span><i class="fa-solid fa-arrow-right"></i></span>
              </button> -->
            </div>
          </div>
        </Reveal>
      </Parallax>
    </section>

    <Parallax :speed="0.12">
      <Reveal :y="80" :duration="1.2">
        <Gallery />
      </Reveal>
    </Parallax>

    <section class="p-4 md:p-12 relative z-20">
      <Parallax :speed="0.05">
        <Reveal :stagger="0.15" :y="30">
          <div
            class="bg-gray p-4 sm:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <div
              v-for="item in featuere"
              :key="item.title"
              class="flex items-center gap-2 space-x-4"
            >
              <i v-html="item.icon" />
              <div>
                <h3 class="text-sm sm:text-xl font-medium">{{ item.title }}</h3>
                <p class="text-gray-500 text-xs sm:text-base">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Parallax>
    </section>

    <ClientOnly>
      <Parallax :speed="0.08">
        <Reveal :y="50" :duration="0.5">
          <SpiceShopping />
        </Reveal>
      </Parallax>
      <template #fallback>
        <div class="min-h-[50vh] flex items-center justify-center">
          <div class="animate-pulse text-gray-400 text-lg">
            Loading products...
          </div>
        </div>
      </template>
    </ClientOnly>

    <ClientOnly>
      <DealsOfTheMonth :products="dealsProducts" />
      <template #fallback>
        <div class="min-h-[50vh] flex items-center justify-center">
          <div class="animate-pulse text-gray-400 text-lg">
            Loading deals...
          </div>
        </div>
      </template>
    </ClientOnly>

    <Parallax :speed="0.15">
      <Reveal :y="30" :duration="0.5">
        <Ad />
      </Reveal>
    </Parallax>

    <Parallax :speed="0.1">
      <Reveal :y="30" :duration="0.5">
        <Ad2 />
      </Reveal>
    </Parallax>
  </div>
</template>

<style>
.header-size {
  font-size: clamp(
    32px,
    calc(32px + (72 - 32) * ((100vw - 400px) / (1200 - 400))),
    100px
  );
}

.header-description {
  font-size: clamp(
    12px,
    calc(12px + (18 - 12) * ((100vw - 400px) / (1200 - 400))),
    18px
  );
}
</style>
