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

// Map platform names to icon keys
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
  <footer class="bg-dark flex flex-col gap-6 text-white p-4 pt-12 lg:p-16">
    <div class="border-b md:border-none border-gray/30 pb-6">
      <img :src="logo" alt="Logo" class="w-12" />
    </div>
    <div
      class="grid grid-cols-3 md:grid-cols-4 gap-6 border-b border-gray/30 pb-6"
    >
      <div class="hidden md:flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Contact</h3>
        <ul class="flex flex-col gap-5 text-xs md:text-sm">
          <li
            v-for="phone in contact?.phone_number"
            :key="phone"
            class="flex items-center gap-6"
          >
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.support" />
              {{ phone }}
            </span>
          </li>
          <li v-if="contact?.email" class="flex items-center gap-6">
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.mail" />
              {{ contact.email }}
            </span>
          </li>
          <li v-if="contact?.location" class="flex items-center gap-6">
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.location" />
              {{ contact.location }}
            </span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">About Us</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >FAQ</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Support</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Blog</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Events</a
            >
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Terms</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Privacy</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Careers</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Investors</a
            >
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Partners</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Support Center</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Knowledge Base</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Community</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Affiliates</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="navigateWithTransition('/')"
              class="hover:underline"
              >Become a Partner</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 md:flex-row items-center md:justify-between"
    >
      <div class="flex justify-center gap-6 items-center p-4">
        <template v-if="contact?.social_media?.length">
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
        </template>
      </div>
      <span class="truncate"
        >&copy; {{ new Date().getFullYear() }} All rights reserved.</span
      >
      <div class="text-sm grid gap-6 place-items-center">
        <div
          class="text-gray flex gap-4 justify-center flex-wrap *:underline underline-offset-4 font-light"
        >
          <a href="#" @click.prevent="navigateWithTransition('/')"
            >Privacy Policy</a
          >
          <a href="#" @click.prevent="navigateWithTransition('/')"
            >Terms of Service</a
          >
          <a href="#" @click.prevent="navigateWithTransition('/')"
            >Cookies Settings</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Add any additional styles here */
</style>
