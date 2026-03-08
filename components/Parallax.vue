<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps<{
  speed?: number; // Speed of parallax. Higher = faster movement. Negative = opposite direction
  direction?: 'vertical' | 'horizontal';
}>();

const target = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!target.value) return;

  gsap.registerPlugin(ScrollTrigger);

  const speed = props.speed ?? 0.5;
  const direction = props.direction ?? 'vertical';

  // Use yPercent/xPercent for more noticeable effect relative to component size
  // speed 0.5 will move it by 50% of its height/width
  const percentage = speed * 100;

  gsap.fromTo(target.value, 
    {
      yPercent: direction === 'vertical' ? percentage : 0,
      xPercent: direction === 'horizontal' ? percentage : 0,
    },
    {
      yPercent: direction === 'vertical' ? -percentage : 0,
      xPercent: direction === 'horizontal' ? -percentage : 0,
      ease: 'none',
      scrollTrigger: {
        trigger: target.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
});
</script>

<template>
  <div ref="target" class="parallax-container">
    <slot />
  </div>
</template>

<style scoped>
.parallax-container {
  will-change: transform;
}
</style>
