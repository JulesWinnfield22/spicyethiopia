<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const props = defineProps<{
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  stagger?: number;
  once?: boolean;
}>();

const target = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!target.value) return;

  gsap.registerPlugin(ScrollTrigger);

  const y = props.y ?? 50;
  const x = props.x ?? 0;
  const opacity = props.opacity ?? 0;
  const scale = props.scale ?? 1;
  const duration = props.duration ?? 1;
  const delay = props.delay ?? 0;
  const stagger = props.stagger ?? 0;
  const once = props.once ?? true;

  gsap.from(target.value.children, {
    y,
    x,
    opacity,
    scale,
    duration,
    delay,
    stagger,
    ease: "expo.out",
    scrollTrigger: {
      trigger: target.value,
      start: "top 85%",
      toggleActions: once ? "play none none none" : "play none none reverse",
    },
  });
});
</script>

<template>
  <div ref="target" class="reveal-container">
    <slot />
  </div>
</template>

<style scoped>
.reveal-container {
  will-change: transform, opacity;
}
</style>
