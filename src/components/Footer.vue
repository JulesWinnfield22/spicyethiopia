<template>
  <footer class="bg-[#111111] text-white py-10">
    <div class="container font-sans mx-auto flex flex-col lg:flex-row justify-between flex-wrap">
      <div class="px-12 mb-8 lg:mb-0">
        <img :src="logo" alt="Logo" class="mb-4 w-12" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 lg:mb-0">
        <div class="flex flex-col">
          <h3 class="text-lg font-sans font-bold">About Us</h3>
          <ul class="mt-2 space-y-1">
            <li><a href="#" class="hover:underline">Services</a></li>
            <li><a href="#" class="hover:underline">FAQ</a></li>
            <li><a href="#" class="hover:underline">Support</a></li>
            <li><a href="#" class="hover:underline">Blog</a></li>
            <li><a href="#" class="hover:underline">Events</a></li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="text-lg font-sans font-bold">Terms</h3>
          <ul class="mt-2 space-y-1">
            <li><a href="#" class="hover:underline">Privacy</a></li>
            <li><a href="#" class="hover:underline">Careers</a></li>
            <li><a href="#" class="hover:underline">Investors</a></li>
          </ul>
        </div>
        <div class="flex flex-col">
          <h3 class="text-lg font-sans font-bold">Partners</h3>
          <ul class="mt-2 space-y-1">
            <li><a href="#" class="hover:underline">Support Center</a></li>
            <li><a href="#" class="hover:underline">Knowledge Base</a></li>
            <li><a href="#" class="hover:underline">Community</a></li>
            <li><a href="#" class="hover:underline">Affiliates</a></li>
            <li><a href="#" class="hover:underline">Become a Partner</a></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col w-full lg:w-1/2 pl-0 lg:pl-24">
        <h3 class="text-lg font-sans font-bold">Subscribe</h3>
        <p class="mt-2">Stay updated with our latest features and releases.</p>
        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <input
            type="email"
            placeholder="Enter email address"
            class="w-full sm:w-[377px] h-[48px] mt-2 mr-0 sm:mr-3 p-2 rounded-4xl font-sans bg-[#0C0C0C] text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            class="w-full sm:w-[107px] h-[48px] mt-2 bg-white text-black font-sans font-semibold p-2 rounded-4xl hover:bg-green-600 transition"
          >
            Subscribe
          </button>
        </div>
        <p class="mt-4 text-sm">
          By subscribing, you agree to our <a href="#" class="underline">Privacy Policy</a> and consent to receive updates.
        </p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row mt-10 font-sans px-4 lg:px-10 border-t border-[#FFFFFF]/40 pt-4 text-center lg:text-left space-y-4 lg:space-y-0">
      <p class="text-sm px-0 lg:px-8 mt-1">© 2023. All rights reserved.</p>
      <div class="flex justify-center space-x-4">
        <a href="#" class="hover:underline">Privacy Policy</a>
        <a href="#" class="hover:underline">Terms of Service</a>
        <a href="#" class="hover:underline">Cookies Settings</a>
      </div>
    </div>
  </footer>
</template>

<script>
import logo from '@/assets/img/footerLogo.png';

export default {
  name: 'FooterComponent',
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
</style>
