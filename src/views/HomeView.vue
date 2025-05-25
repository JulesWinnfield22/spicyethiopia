<script setup lang="ts">
import spices1 from "@/assets/img/spiceSpoonRight.png";
import spices2 from "@/assets/img/spiceSpoonLeft.png";
import spices3 from "@/assets/img/coffee.png";
import spices4 from "@/assets/img/spiceSpoonBottom.png";
import qualityIcon from "@/assets/img/quality.png";
import warrantyIcon from "@/assets/img/warranty.png";
import shippingIcon from "@/assets/img/shipping.png";
import supportIcon from "@/assets/img/support.png";
import berbereImage from "@/assets/img/berbereImage.png";
import flag from "@/assets/img/flagEth.png";
import SpiceShopping from "@/components/SpiceShopping.vue";
import SpiceCarousel from "@/components/SpiceCarousel.vue";
import Footer from "@/components/Footer.vue";
import Gallery from "@/components/Gallery.vue";
import icons from "@/utils/icons";
import DealsOfTheMonth from "@/components/DealsOfTheMonth.vue";
import Ad from "@/components/Ad.vue";
import Ad2 from "@/components/Ad2.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import { getTopDeals } from "@/features/admin/api/productApi";

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
</script>

<template>
  <div class="">
    <section class="bg-black p-4 md:p-6 text-white text-center">
      <div class="grid place-items-center">
        <h1
          class="max-w-[30ch] p-4 md:p-8 header-size font-semibold leading-tight font-serif"
        >
          Authentic Ethiopian Spices Delivered to Your Door.
        </h1>
        <p class="header-description p-2 md:p-8 max-w-[105ch]">
          Enhance your culinary creations with our authentic Ethiopian spices,
          now available for easy online ordering and home delivery. Savor the
          rich, bold flavors of Ethiopia with our premium, organic selections.
          From Berbere to Mitmita, we bring you the essence of Ethiopian
          cuisine—sourced directly, bursting with flavor, and delivered swiftly
          across Canada.
        </p>
        <div
          class="p-6 flex-col md:flex-row flex items-center justify-center gap-4"
        >
          <button
            class="bg-white text-black font-sans px-6 py-3 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-gray-100"
          >
            Featured Spices <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>
          <button
            class="border border-white font-sans px-6 py-3 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-gray-800"
          >
            Explore Ethiopian Recipes
            <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
      </div>
    </section>

    <Gallery />

    <section class="p-4 md:p-12">
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
    </section>

    <SpiceShopping />
    
    <DealsOfTheMonth />
    
    <Ad />

    <Ad2 />
  </div>
</template>

<style>
.header-size {
  font-size: clamp(
    32px,
    calc(32px + (72 - 32) * ((100vw - 400px) / (1200 - 400))),
    72px
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
