<script setup lang="ts">
import {
  ref,
  inject,
  watch,
  nextTick,
  onUnmounted,
  unref,
  type Ref,
} from "vue";

const triggerRef = inject<Ref<HTMLElement | null>>("triggerRef");
const isOpen = inject<Ref<boolean>>("open");
const alignment = inject<Ref<string>>("position" as any, ref("left-bottom"));

const contentRef = ref<HTMLElement | null>(null);
const ready = ref(false);
const dropdownStyles = ref({
  top: "0px",
  left: "0px",
  maxHeight: "none",
});

function updatePosition() {
  if (!triggerRef?.value || !contentRef.value || !isOpen?.value) return;

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
    <div
      v-if="isOpen"
      ref="contentRef"
      class="fixed z-[9999]"
      :style="{
        ...dropdownStyles,
        visibility: ready ? 'visible' : 'hidden',
        pointerEvents: ready ? 'auto' : 'none',
      }"
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
.fixed {
  position: fixed;
}
</style>
