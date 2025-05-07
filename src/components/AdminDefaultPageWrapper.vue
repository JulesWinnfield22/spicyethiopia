<script setup lang="ts">
import icons from "@/utils/icons";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <div class="flex flex-col gap-7.5 min-h-full p-6 bg-base-clr">
    <div
      class="h-9.5 w-full sticky p-6top-0 z-20 flex justify-between items-center"
    >
      <div class="flex items-center gap-1">
        <button @click="$router.go(-1)" v-ripple class="cursor-pointer size-6 grid place-items-center">
          <i class="*:size-4" v-html="icons.back" />
        </button>
        <span class="font-bold flex gap-2 items-center text-base">
          {{ route.matched[route.matched.length - 1].name }}
        </span>
      </div>
      <slot name="actions" />
    </div>
    <div class="flex flex-col gap-7.5 max-w-[1224px] w-full mx-auto" >
      <slot />
    </div>
  </div>
</template>
