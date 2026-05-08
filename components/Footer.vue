<script setup lang="ts">
import { onMounted, computed } from "vue";
import logo from "~/assets/img/footerLogo.png";
import icons from "~/utils/icons";
import { getContactInfo } from "~/features/public/api/contactApi";
import { useApiMutation } from "~/composables/useApiMutation";
import { useTransitionHelper } from "~/composables/useTransition";

const { navigateWithTransition } = useTransitionHelper();
const { response, send } = useApiMutation();

onMounted(() => {
  send(() => getContactInfo());
});

const contact = computed(() => response.value || null);

const platformIconMap: Record<string, string> = {
  Facebook: "fb",
  Instagram: "ig",
  "Twitter (X)": "x",
  LinkedIn: "li",
  YouTube: "yt",
  TikTok: "tik",
  WhatsApp: "support",
  Telegram: "support",
  Pinterest: "ig",
};

function getSocialIcon(platform: string) {
  const key = platformIconMap[platform] || "ig";
  return (icons as any)[key] || icons.ig;
}
</script>

<template>
  <footer class="bg-dark text-white">
    <!-- Main grid -->
    <div
      class="px-6 py-12 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10"
    >
      <!-- Brand -->
      <div class="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
        <img :src="logo" alt="Logo" class="w-10" />
        <p class="text-sm text-gray-400 leading-relaxed max-w-xs">
          Authentic Ethiopian spices and blends, brought straight to your
          kitchen.
        </p>
        <div v-if="contact?.social_media?.length" class="flex gap-4 mt-1">
          <a
            v-for="social in contact.social_media"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:opacity-70 transition-opacity"
          >
            <i v-html="getSocialIcon(social.platform)" />
          </a>
        </div>
      </div>

      <!-- Explore -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Explore
        </h3>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="text-gray-300 hover:text-white transition-colors"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/shop')"
              class="text-gray-300 hover:text-white transition-colors"
              >Shop</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/about')"
              class="text-gray-300 hover:text-white transition-colors"
              >About Us</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/contact')"
              class="text-gray-300 hover:text-white transition-colors"
              >Contact</a
            >
          </li>
        </ul>
      </div>

      <!-- Order -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Order
        </h3>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/cart')"
              class="text-gray-300 hover:text-white transition-colors"
              >Cart</a
            >
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="flex flex-col gap-4">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Get in Touch
        </h3>
        <ul class="flex flex-col gap-3 text-sm text-gray-300">
          <li
            v-for="phone in contact?.phone_number"
            :key="phone"
            class="flex items-center gap-2"
          >
            <i v-html="icons.support" class="shrink-0 opacity-50" />
            {{ phone }}
          </li>
          <li v-if="contact?.email" class="flex items-center gap-2">
            <i v-html="icons.mail" class="shrink-0 opacity-50" />
            {{ contact.email }}
          </li>
          <li v-if="contact?.location" class="flex items-start gap-2">
            <i v-html="icons.location" class="shrink-0 opacity-50 mt-0.5" />
            {{ contact.location }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500"
    >
      <span
        >&copy; {{ new Date().getFullYear() }} The Spicy Ethiopian. All rights
        reserved.</span
      >
      <div class="flex gap-5">
        <a
          href="#"
          @click.prevent="navigateWithTransition('/shipping')"
          class="hover:text-white transition-colors"
          >Shipping Policy</a
        >
        <a
          href="#"
          @click.prevent="navigateWithTransition('/contact')"
          class="hover:text-white transition-colors"
          >Contact Us</a
        >
      </div>
    </div>
  </footer>
</template>
