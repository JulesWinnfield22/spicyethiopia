<script setup lang="ts">
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "./store/toast";
import Toast from "./Toast.vue";

const toastStore = useToast();
const { toasts } = storeToRefs(toastStore);
</script>
<template>
  <Suspense>
    <div
      v-if="toasts.length"
      class="z-[502] fixed bottom-8 right-8 w-full max-w-sm h-0 flex flex-col items-end pointer-events-none"
    >
      <div class="relative w-full">
        <Toast
          v-for="({ id, toast }, idx) in toasts"
          :key="id"
          :id="id"
          :toast="toast"
          :index="idx"
          :total="toasts.length"
        />
      </div>
    </div>
  </Suspense>
</template>
