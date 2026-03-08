<script setup lang="ts">
import {
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
  watchEffect,
  toRef,
} from "vue";

const props = defineProps({
  position: {
    type: String, // "left-bottom" | "right-bottom"
    default: "left-bottom",
  },
});

const openDropdown = ref(false);

watchEffect((cleanUP) => {
  function clieckHandler() {
    openDropdown.value = false;
  }

  document.addEventListener("click", clieckHandler);
  return cleanUP(() => {
    document.removeEventListener("click", clieckHandler);
  });
});

function toggle(value?: boolean) {
  openDropdown.value = value ?? !openDropdown.value;
}

const triggerRef = ref<HTMLElement | null>(null);

provide("triggerRef", triggerRef);
provide("open", openDropdown);
provide("position", toRef(props, "position"));
</script>

<template>
  <div
    ref="triggerRef"
    @click.prevent.stop="() => {}"
    class="relative inline-flex"
  >
    <slot :open="openDropdown" :toggle="toggle" :triggerRef="triggerRef" />
  </div>
</template>

<style>
/* Base dropdown styles can be removed if handled by children */
</style>
