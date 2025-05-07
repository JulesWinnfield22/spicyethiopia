<script lang="ts" setup>
import logo from "@/assets/img/spicylogo.png";
import { useDashboardCounts } from "../composables/useDashboardCounts";
import navs from "@/config/navs";
import { RouterLink } from "vue-router";
import { groupBy } from "@/utils/array";
import { ref } from "vue";
import icons from "@/utils/icons";
const filterdNavs = groupBy(navs, "group");
const { totalOrdersCount } = useDashboardCounts();

const open = ref(false);

function logout() {
  localStorage.clear()
  location.href = '/login'
}
</script>

<template>
  <div class="flex h-full w-full">
    <nav
      class="__drawer overflow-hidden w-64 bg-black text-white flex flex-col justify-between"
    >
      <div class="px-6 py-4">
        <a href="/">
          <img :src="logo" alt="Logo" style="height: 40px" />
        </a>
      </div>
      <div class="flex-1 overflow-auto flex flex-col gap-4">
        <div
          class="px-6 flex flex-col gap-1"
          v-for="key in Object.keys(filterdNavs)"
        >
          <span
            v-if="!filterdNavs[key]?.[0]?.skip"
            class="capitalize opacity-60"
            >{{ key }}</span
          >
          <div class="flex flex-col gap-1">
            <RouterLink
              :to="nav.path"
              :key="nav.name"
              v-for="nav in filterdNavs[key]"
              class="h-9.5 flex px-2 rounded items-center text-white"
            >
              <i v-html="nav.icon"></i>
              <span class="mx-2 text-sm">{{ nav.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
      <div
        :class="[open ? 'h-24' : 'h-12']"
        class="transition-all flex flex-col"
      >
        <div
          v-ripple
          @click="open = !open"
          class="border-t border-gray/10 cursor-pointer min-h-12 px-6 flex items-center justify-between"
        >
          <div class="flex items-center">
            <div class="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span class="text-sm">Birhane Araya</span>
          </div>
          <i
            :class="[open ? 'rotate-90' : 'rotate-0']"
            class="fa-solid fa-chevron-right text-sm"
          ></i>
        </div>
        <button
          @click="logout"
          v-ripple
          class="cursor-pointer flex items-center text-red-500 px-4 gap-3 bg-white/10 min-h-12"
        >
          <i v-html="icons.logout" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
    <div class="relative flex-1 h-full overflow-y-auto">
      <router-view />
      <small class="mt-4 block text-xs bg-gray p-2 font-semibold text-gray-800">
        ©{{ new Date().getFullYear() }}, The Spicy Ethiopian
      </small>
    </div>
  </div>
</template>

<style scoped>
.__drawer a:hover,
.__drawer .router-link-exact-active {
  background-color: #fff1;
}
</style>
