<script setup lang="ts">
import {
  ref,
  inject,
  watch,
  nextTick,
  onUnmounted,
  unref,
  computed, // Added computed
  type Ref,
} from "vue";
import { useWindowSize } from "~/composables/useWindowSize"; // Added useWindowSize import

const triggerRef = inject<Ref<HTMLElement | null>>("triggerRef");
const isOpen = inject<Ref<boolean>>("open");
const alignment = inject<Ref<string>>("position" as any, ref("left-bottom"));

const size = useWindowSize(); // Added useWindowSize
const isMobile = computed(() => size.value.width < 768); // Added isMobile computed property

const contentRef = ref<HTMLElement | null>(null);
const ready = ref(false);
const dropdownStyles = ref({
  top: "0px",
  left: "0px",
  maxHeight: "none",
});

function updatePosition() {
  if (!isOpen?.value) return;

  if (isMobile.value) { // Added mobile-specific logic
    dropdownStyles.value = {
      top: "auto",
      left: "0px",
      maxHeight: "80vh",
    };
    ready.value = true;
    return;
  }

  if (!triggerRef?.value || !contentRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const contentRect = contentRef.value.getBoundingClientRect();
  const margin = 10;

  let top = triggerRect.bottom;
  let left = triggerRect.left;
  let maxHeight: number;

  const spaceBelow = window.innerHeight - triggerRect.bottom - margin;
  const spaceAbove = triggerRect.top - margin;

  if (spaceBelow < contentRect.height && spaceAbove > spaceBelow) {
    // Open upward
    maxHeight = spaceAbove;
    top = Math.max(
      margin,
      triggerRect.top - Math.min(contentRect.height, spaceAbove),
    );
  } else {
    // Open downward
    maxHeight = spaceBelow;
    top = triggerRect.bottom;
  }

  // Horizontal Alignment
  const alignVal = unref(alignment);
  if (alignVal === "right-bottom") {
    left = triggerRect.right - contentRect.width;
  }

  // Viewport boundary check
  if (left < margin) left = margin;
  if (left + contentRect.width > window.innerWidth - margin) {
    left = window.innerWidth - contentRect.width - margin;
  }

  dropdownStyles.value = {
    top: `${top}px`,
    left: `${left}px`,
    maxHeight: `${maxHeight}px`,
  };
  ready.value = true;
}

function handleEvents() {
  if (isOpen?.value) updatePosition();
}

watch(
  () => isOpen?.value,
  (val) => {
    if (val) {
      nextTick(() => {
        updatePosition();
        requestAnimationFrame(updatePosition);
      });
      window.addEventListener("scroll", handleEvents, true);
      window.addEventListener("resize", handleEvents);
    } else {
      ready.value = false;
      window.removeEventListener("scroll", handleEvents, true);
      window.removeEventListener("resize", handleEvents);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  window.removeEventListener("scroll", handleEvents, true);
  window.removeEventListener("resize", handleEvents);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen && isMobile"
        class="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[9998]"
        @click="isOpen = false"
      />
    </Transition>

    <Transition :name="isMobile ? 'slide-up' : 'fade'">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="fixed z-[9999] overflow-hidden flex flex-col"
        :class="
          isMobile
            ? 'bottom-0 left-0 right-0 w-full bg-white rounded-t-[32px] shadow-2xl border border-gray-100 py-4 pb-10'
            : ''
        "
        :style="{
          ...dropdownStyles,
          visibility: ready ? 'visible' : 'hidden',
          pointerEvents: ready ? 'auto' : 'none',
        }"
      >
        <!-- Mobile Handle -->
        <div
          v-if="isMobile"
          class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200"
        />
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fixed {
  position: fixed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}
</style>
