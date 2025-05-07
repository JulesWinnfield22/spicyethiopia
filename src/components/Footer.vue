<template>
  <footer class="bg-dark flex flex-col gap-6 text-white p-4 pt-12 lg:p-16">
    <div class="border-b md:border-none border-gray/30 pb-6" >
      <img :src="logo" alt="Logo" class=" w-12" />
    </div>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-6 border-b border-gray/30 pb-6">
      <div class="hidden md:flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Contact</h3>
        <ul class="flex flex-col gap-5 text-xs md:text-sm">
          <li class="flex items-center gap-6" >
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.support" />
              +16478305994
            </span>
          </li>
          <li class="flex items-center gap-6" >
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.mail" />
              spicyethiopian@gmail.com
            </span>
          </li>
          <li class="flex items-center gap-6" >
            <span class="flex-1 flex items-center gap-2">
              <i v-html="icons.location" />
              175 Queen St E, Toronto, ON M5A 1S2, Canada
            </span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">About Us</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li><a href="#" class="hover:underline">Services</a></li>
          <li><a href="#" class="hover:underline">FAQ</a></li>
          <li><a href="#" class="hover:underline">Support</a></li>
          <li><a href="#" class="hover:underline">Blog</a></li>
          <li><a href="#" class="hover:underline">Events</a></li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Terms</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li><a href="#" class="hover:underline">Privacy</a></li>
          <li><a href="#" class="hover:underline">Careers</a></li>
          <li><a href="#" class="hover:underline">Investors</a></li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-sm md:text-xl font-bold">Partners</h3>
        <ul class="flex flex-col gap-2 text-xs md:text-sm">
          <li><a href="#" class="hover:underline">Support Center</a></li>
          <li><a href="#" class="hover:underline">Knowledge Base</a></li>
          <li><a href="#" class="hover:underline">Community</a></li>
          <li><a href="#" class="hover:underline">Affiliates</a></li>
          <li><a href="#" class="hover:underline">Become a Partner</a></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-4 md:flex-row items-center md:justify-between" >
      <div class="flex justify-center gap-6 items-center p-4" >
        <button>
          <i v-html="icons.fb" />
        </button>
        <button>
          <i v-html="icons.ig" />
        </button>
        <button>
          <i v-html="icons.x" />
        </button>
        <button>
          <i v-html="icons.li" />
        </button>
        <button>
          <i v-html="icons.yt" />
        </button>
      </div>
      <span class="truncate" >&copy; {{ (new Date()).getFullYear() }} All rights reserved.</span>
      <div class="text-sm grid gap-6 place-items-center" >
        <div class="text-gray flex gap-4 justify-center flex-wrap *:underline underline-offset-4 font-light" >
          <a href="#" >Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Settings</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts" >
import logo from "@/assets/img/footerLogo.png"; // Adjust the path as necessary
import icons from "@/utils/icons";
</script>

<style scoped>
/* Add any additional styles here */
</style>
