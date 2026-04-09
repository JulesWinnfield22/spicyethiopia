<script lang="ts" setup>
import logo from "/spice-logo.png";
import navs from "~/config/navs";
import { groupBy } from "~/utils/array";
import {
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  provide,
  inject,
  type ShallowRef,
} from "vue";
import icons from "~/utils/icons";
import Lenis from "lenis";

const filterdNavs = groupBy(navs, "group");

const route = useRoute();

const open = ref(false);
const drawerOpen = ref(false);

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  if (process.client) {
    localStorage.clear();
    window.location.href = "/login";
  }
}

// Close drawer on route change
watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false;
  },
);
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Desktop sidebar (hidden on mobile) -->
    <nav
      class="__drawer w-64 bg-black text-white hidden md:flex flex-col justify-between shrink-0"
    >
      <div class="px-6 py-4">
        <NuxtLink to="/">
          <img :src="logo" alt="Logo" style="height: 40px" />
        </NuxtLink>
      </div>
      <div class="flex-1 overflow-auto flex flex-col gap-4">
        <div
          class="px-6 flex flex-col gap-1"
          v-for="key in Object.keys(filterdNavs)"
          :key="key"
        >
          <span
            v-if="!filterdNavs[key]?.[0]?.skip"
            class="capitalize opacity-60"
            >{{ key }}</span
          >
          <div class="flex flex-col gap-1">
            <NuxtLink
              :to="nav.path"
              :key="nav.name"
              v-for="nav in filterdNavs[key]"
              class="h-9.5 flex px-2 rounded items-center text-white"
            >
              <i v-html="nav.icon"></i>
              <span class="mx-2 text-sm">{{ nav.name }}</span>
            </NuxtLink>
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

    <!-- Mobile drawer overlay -->
    <Teleport to="body">
      <Transition name="drawer-fade">
        <div
          v-if="drawerOpen"
          class="fixed inset-0 bg-black/50 z-40 md:hidden"
          @click="drawerOpen = false"
        />
      </Transition>
      <Transition name="drawer-slide">
        <nav
          v-if="drawerOpen"
          class="__drawer fixed top-0 left-0 bottom-0 w-72 bg-black text-white z-50 flex flex-col justify-between md:hidden"
        >
          <div class="px-6 py-4 flex items-center justify-between">
            <NuxtLink to="/">
              <img :src="logo" alt="Logo" style="height: 40px" />
            </NuxtLink>
            <button
              @click="drawerOpen = false"
              class="size-8 grid place-items-center text-white/70 hover:text-white"
            >
              <i v-html="icons.close" class="*:size-4" />
            </button>
          </div>
          <div class="flex-1 overflow-auto flex flex-col gap-4">
            <div
              class="px-6 flex flex-col gap-1"
              v-for="key in Object.keys(filterdNavs)"
              :key="key"
            >
              <span
                v-if="!filterdNavs[key]?.[0]?.skip"
                class="capitalize opacity-60"
                >{{ key }}</span
              >
              <div class="flex flex-col gap-1">
                <NuxtLink
                  :to="nav.path"
                  :key="nav.name"
                  v-for="nav in filterdNavs[key]"
                  class="h-9.5 flex px-2 rounded items-center text-white"
                >
                  <i v-html="nav.icon"></i>
                  <span class="mx-2 text-sm">{{ nav.name }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              v-ripple
              @click="open = !open"
              class="border-t border-gray/10 cursor-pointer min-h-12 px-6 flex items-center justify-between"
            >
              <div class="flex items-center">
                <div class="w-3 h-3 bg-white rounded-full mr-2"></div>
                <span class="text-sm">Birhane Araya</span>
              </div>
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
      </Transition>
    </Teleport>

    <div class="relative flex-1 h-full overflow-y-auto bg-base-clr">
      <div class="flex flex-col gap-4 md:gap-7.5 p-3 md:p-6 min-h-full">
        <div
          class="w-full sticky h-14 md:h-16 top-0 z-20 flex justify-between items-center bg-base-clr/80 backdrop-blur-sm"
        >
          <div class="flex items-center gap-1">
            <!-- Hamburger button (mobile only) -->
            <button
              @click="drawerOpen = true"
              class="md:hidden cursor-pointer size-9 grid place-items-center rounded-lg hover:bg-black/5 mr-1"
            >
              <i v-html="icons.menu" class="*:size-5" />
            </button>
            <button
              @click="$router.go(-1)"
              v-ripple
              class="cursor-pointer size-6 grid place-items-center"
            >
              <i class="*:size-4" v-html="icons.back" />
            </button>
            <span class="font-bold flex gap-2 items-center text-sm md:text-base">
              {{ route.matched[route.matched.length - 1]?.name }}
            </span>
          </div>
          <div id="admin-actions">
            <slot name="actions" />
          </div>
        </div>
        <div
          class="flex flex-col bg-white/60 border border-gray-200 p-3 md:p-4 rounded-2xl gap-4 md:gap-7.5 max-w-[2000px] w-full mx-auto flex-1 h-full"
        >
          <slot />
        </div>
        <small class="mt-auto block text-xs p-2 font-semibold text-gray-800">
          ©{{ new Date().getFullYear() }}, The Spicy Ethiopian
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.__drawer a:hover,
.__drawer .router-link-exact-active {
  background-color: #fff1;
}

/* Drawer overlay fade */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

/* Drawer slide */
.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.3s ease;
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(-100%);
}
</style>
