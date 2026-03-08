<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import gsap from "gsap";
import icons from "~/utils/icons";
import { useTransitionHelper } from "~/composables/useTransition";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();
const { navigateWithTransition } = useTransitionHelper();
const menuContainer = ref<HTMLElement | null>(null);
const menuItems = ref<HTMLElement[]>([]);

const setMenuItemRef = (el: any) => {
  if (el && !menuItems.value.includes(el)) {
    menuItems.value.push(el);
  }
};

const close = (path?: string) => {
  const tl = gsap.timeline({
    onComplete: () => {
      emit("update:modelValue", false);
      if (path) navigateWithTransition(path);
    },
  });

  tl.to(menuItems.value, {
    x: 20,
    opacity: 0,
    stagger: 0.02,
    duration: 0.15,
    ease: "power2.in",
  }).to(
    menuContainer.value,
    {
      xPercent: 100,
      duration: 0.3,
      ease: "power2.in",
    },
    "-=0.05",
  );
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.set(menuContainer.value, { xPercent: 100 })
        .set(menuItems.value, { x: 50, opacity: 0 })
        .to(menuContainer.value, {
          xPercent: 0,
          duration: 0.8,
          ease: "expo.out",
        })
        .to(
          menuItems.value,
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.4",
        );
    } else {
      document.body.style.overflow = "";
    }
  },
);

onMounted(() => {
  if (props.modelValue) {
    gsap.set(menuContainer.value, { xPercent: 0 });
  } else {
    gsap.set(menuContainer.value, { xPercent: 100 });
  }
});
</script>

<template>
  <div
    v-show="modelValue"
    class="fixed inset-0 z-100 flex justify-end overflow-hidden"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-sm"
      @click="close()"
    ></div>

    <!-- Menu Sidebar -->
    <div
      ref="menuContainer"
      class="relative w-full max-w-xl h-full bg-[#FAF9F6] shadow-2xl flex flex-col p-8 md:p-16 z-10"
    >
      <!-- Header -->
      <div class="flex justify-end">
        <button
          @click="close()"
          class="size-12 rounded-full border border-black/10 grid place-items-center hover:bg-black hover:text-white transition-colors duration-300"
        >
          <i v-html="icons.close" class="scale-150" />
        </button>
      </div>

      <!-- Nav Links -->
      <nav class="flex flex-col overflow-y-auto">
        <div
          v-for="(item, index) in [
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: 'Contact', path: '/contact' },
            { name: 'About', path: '/about' },
            // { name: 'Recipes', path: '/recipes' },
          ]"
          :key="index"
          :ref="setMenuItemRef"
          class="group flex flex-col py-2"
        >
          <button
            @click.stop.prevent="close(item.path)"
            class="inline-block text-6xl md:text-7xl shrink-0 items-start text-left font-dm-serif font-bold text-black transition-transform duration-500 group-hover:translate-x-4 leading-normal"
          >
            {{ item.name }}
          </button>
        </div>
      </nav>

      <!-- Footer Info -->
      <div
        class="mt-auto pt-12 border-t border-black/10 flex flex-col gap-4 text-gray-500 font-dm-sans"
      >
        <p class="text-sm">Ready to savor the bold flavors of Ethiopia?</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-black transition-colors">Instagram</a>
          <a href="#" class="hover:text-black transition-colors">Facebook</a>
          <a href="#" class="hover:text-black transition-colors">Twitter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-dm-serif {
  font-family: "DM Serif Display", serif;
}
.font-dm-sans {
  font-family: "DM Sans", sans-serif;
}
</style>
