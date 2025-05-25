<script setup lang="ts">
import logo from "@/assets/img/spicylogo.png";
import icons from "@/utils/icons";
import { closeModal } from "@customizer/modal-x";

const activeStyle =
  "font-weight: bold; text-decoration: underline;";
const defaultStyle = "text-decoration: none;";
</script>

<template>
  <nav class="flex flex-col h-full w-full bg-white">
    <div class="h-18 p-2 bg-dark flex items-center justify-between">
      <img :src="logo" alt="Logo" />
      <button
        v-ripple
        @click="closeModal()"
        class="bg-gray rounded-full size-8 grid place-items-center"
      >
        <i v-html="icons.close" />
      </button>
    </div>
    <div
			@click="closeModal()"
      class="flex flex-col gap-8 p-4 font-light text-3xl text-dark"
    >
      <RouterLink
        to="/"
        :style="$route.path === '/' ? activeStyle : defaultStyle"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/shop"
        :style="$route.path === '/shop' ? activeStyle : defaultStyle"
      >
        Shop
      </RouterLink>
      <RouterLink
        to="/contact"
        :style="$route.path === '/contact' ? activeStyle : defaultStyle"
      >
        Contact
      </RouterLink>
      <RouterLink
        to="/about"
        :style="$route.path === '/about' ? activeStyle : defaultStyle"
      >
        About
      </RouterLink>
      <RouterLink
        to="/recipes"
        :style="$route.path === '/recipes' ? activeStyle : defaultStyle"
      >
        Recipes
      </RouterLink>
    </div>
  </nav>
</template>
