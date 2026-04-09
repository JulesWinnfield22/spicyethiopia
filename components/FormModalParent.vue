<script setup lang="ts">
import UserForm from "~/features/admin/user/form/UserForm.vue";
import icons from "~/utils/icons";
import { closeModal } from "@customizer/modal-x";
import type { PropType } from "vue";
import { useWindowSize } from "~/composables/useWindowSize";

const props = defineProps({
  title: String,
  size: {
    type: String as PropType<"sm" | "md" | "lg" | "full">,
    default: "md",
  },
});

const windowSize = useWindowSize();
const isMobile = computed(() => windowSize.value.width < 768);
</script>
<template>
  <!-- Mobile: bottom sheet -->
  <div
    v-if="isMobile"
    class="fixed inset-0 z-50 flex flex-col justify-end"
    @click.self="closeModal()"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60" @click="closeModal()" />

    <!-- Sheet -->
    <div
      class="relative z-10 bg-white rounded-t-2xl max-h-[85vh] flex flex-col animate-slide-up shadow-2xl"
    >
      <!-- Drag handle -->
      <div class="flex justify-center pt-3 pb-1 shrink-0">
        <div class="w-10 h-1 bg-gray-300 rounded-full" />
      </div>
      <!-- Header -->
      <div
        class="h-12 border-b border-gray-200 flex justify-between items-center px-4 shrink-0"
      >
        <span class="font-bold text-base">{{ title }}</span>
        <button
          @click="closeModal()"
          class="size-8 grid place-items-center rounded-full hover:bg-gray-100"
          v-ripple
        >
          <i v-html="icons.close" class="*:size-4" />
        </button>
      </div>
      <!-- Content -->
      <div class="flex-1 overflow-auto p-4">
        <slot />
      </div>
      <!-- Footer -->
      <div class="border-t border-gray-200 p-4 pb-6 shrink-0">
        <slot name="bottom" />
      </div>
    </div>
  </div>

  <!-- Desktop: centered modal -->
  <div
    v-else
    @click.self="closeModal()"
    class="grid p-4 overflow-hidden min-h-full bg-black/80 place-items-center"
  >
    <div
      :class="[$style[size]]"
      class="h-full flex flex-col px-4 min-h-80 max-h-full shadow-2xl bg-white rounded"
    >
      <div
        class="h-12 border-b border-b-gray flex justify-between items-center"
      >
        <span class="font-bold text-base">{{ title }}</span>
        <button
          @click="closeModal()"
          class="size-6 grid place-items-center"
          v-ripple
        >
          <i v-html="icons.close" />
        </button>
      </div>
      <div class="mt-2 p-2 flex-1 overflow-auto">
        <slot />
      </div>
      <div class="border-t border-gray min-h-12 p-2">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<style module>
.sm {
  height: 20rem;
  width: 30rem;
}

.md {
  height: 35rem;
  width: 45rem;
}

.full {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>