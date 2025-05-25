<script setup lang="ts">
import icons from "@/utils/icons";
import { inject, ref, watch, type PropType } from "vue";

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  fullwidth: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"xs" | "sm" | "md" | "lg" | 'full'>,
    default: "sm",
  },
  type: {
    type: String as PropType<"primary" | "secondary" | "edge">,
  },
});

let pend = inject('pending', false)
let pending = ref(pend || !!props.pending)
watch(() => pend, () => {
  pending.value = pend
})
</script>
<template>
  <button
    v-ripple
    :class="[
      $style?.[size],
      $style?.[type ? type : ''],
      fullwidth && 'fullwidth',
    ]"
    class="cursor-pointer hover:bg-gray relative btn flex items-center justify-center rounded capitalize"
  >
    <slot></slot>
    <p
      class="absolute bg-inherit backdrop-blur-xl inset-0 z-20 grid place-items-center"
      v-if="pending"
      v-html="icons.spinner"
    />
  </button>
</template>
<style scoped>
.btn {
  padding: 0 15px;
}

[class*="_sm"].fullwidth {
  min-width: 5rem;
}

[class*="_md"].fullwidth {
  min-width: 15rem;
}

</style>
<style module>
.xs {
  width: auto;
  height: auto;
}

.sm {
  height: 2.375rem;
}

.link:hover::before {
  font-style: italic;
  transform: translateX(0);
}

.md {
  min-width: 6.8rem;
  height: 3rem;
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
}

.lg {
  min-width: 6.8rem;
  min-height: 2.5rem;
}

.secondary {
  background-color: var(--color-dark);
  color: var(--color-base-clr);
}

.edge {
  border: 1px solid rgba(var(--dark) / 0.1);
  color: var(--color-dark);
}

.primary {
  background-color: var(--color-white);
  color: var(--color-dark);
}
</style>
