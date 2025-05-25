<script setup lang="ts">
import logo from "@/assets/img/spicylogo.png";
import { RouterLink, useRoute } from "vue-router";
import icons from "@/utils/icons";
import Footer from "@/components/Footer.vue";
import { useCartStore } from "@/stores/cartStore";
import { openModal } from "@customizer/modal-x";

const route = useRoute();
const cartStore = useCartStore();

const activeStyle =
  "font-weight: bold; text-decoration: underline; color: white;";
const defaultStyle = "text-decoration: none; color: white;";
</script>
<template>
  <div>
    <nav
      class="__nav sticky top-0 z-50 flex bg-dark h-18 gap-6 px-4 md:px-12 items-center justify-between"
    >
      <div>
        <img :src="logo" alt="Logo" />
      </div>

      <div
        class="hidden font-light text-base md:flex flex-1 gap-6 underline-offset-4 justify-center"
      >
        <RouterLink
          to="/"
          :style="route.path === '/' ? activeStyle : defaultStyle"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/shop"
          :style="route.path === '/shop' ? activeStyle : defaultStyle"
        >
          Shop
        </RouterLink>
        <RouterLink
          to="/contact"
          :style="route.path === '/contact' ? activeStyle : defaultStyle"
        >
          Contact
        </RouterLink>
        <RouterLink
          to="/about"
          :style="route.path === '/about' ? activeStyle : defaultStyle"
        >
          About
        </RouterLink>
        <RouterLink
          to="/recipes"
          :style="route.path === '/recipes' ? activeStyle : defaultStyle"
        >
          Recipes
        </RouterLink>
      </div>
      <div class="flex items-center gap-6">
        <RouterLink
          class="bg-white relative px-3 py-1 rounded-full max-h-12 ml-auto flex items-center gap-2 flex-nowrap"
          to="/cart"
        >
          <i v-html="icons.cart" />
          <span
            class="absolute sm:static -top-2 p-1 text-xs rounded-full -right-2 shadow-2xl text-white sm:text-dark bg-red-500 sm:bg-transparent md:inline truncate"
          >
            <span class="hidden sm:inline">Cart</span>
            ({{ cartStore.count }})</span
          >
        </RouterLink>
        <button @click="openModal('Menu')" class="md:hidden siez-8 grid place-items-center">
          <i v-html="icons.menu" />
        </button>
      </div>
    </nav>
    <div class="flex flex-col gap-7.5 w-full mx-auto">
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.__nav .router-link-exact-active {
  font-weight: 700;
}
</style>
