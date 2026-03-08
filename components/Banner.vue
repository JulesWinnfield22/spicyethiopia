<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Parallax from "./Parallax.vue";
import gsap from "gsap";

// Image imports
import berbereImage from "~/assets/img/berbereImage.png";
import spiceOne from "~/assets/img/spiceOne.png";
import spiceTwo from "~/assets/img/spiceTwo.png";
import spiceThree from "~/assets/img/spiceThree.png";
import spiceFive from "~/assets/img/spiceFive.png";

const slides = [
  {
    title: "Berbere Bliss",
    subtitle: "The soul of Ethiopian cuisine, a fiery and complex blend.",
    image: berbereImage,
  },
  {
    title: "Mitmita Magic",
    subtitle: "A spicy kick with bird's eye chili and cardamom warmth.",
    image: spiceOne,
  },
  {
    title: "Korerima Aroma",
    subtitle: "Black cardamom that brings a smoky, floral depth.",
    image: spiceThree,
  },
  {
    title: "Shuro Savvy",
    subtitle: "Comfort in every bite, our signature roasted chickpea flour.",
    image: spiceFive,
  },
  {
    title: "Niter Kibbeh",
    subtitle: "The aromatic foundation of every traditional dish.",
    image: spiceTwo,
  },
];

const currentSlide = ref(0);
const bannerRef = ref(null);
let interval: any = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetInterval();
};

const resetInterval = () => {
  if (interval) clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
};

onMounted(() => {
  resetInterval();

  // Floating animation for free movement around the WHOLE box
  gsap.to(".floating-circle-1", {
    x: "random(-400, 400)",
    y: "random(-200, 200)",
    duration: "random(8, 12)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(".floating-circle-2", {
    x: "random(-600, 200)",
    y: "random(-300, 300)",
    duration: "random(10, 15)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <section
    ref="bannerRef"
    class="relative isolate w-full h-[350px] md:h-[448px] overflow-hidden bg-[#1A1A1A] text-white flex items-center"
  >
    <!-- Background Images (Full cover on mobile, side rectangle on desktop) -->
    <div
      class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
    >
      <transition-group name="fade">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          v-show="currentSlide === index"
          class="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-1/2 overflow-hidden"
        >
          <img
            :src="slide.image"
            class="w-full h-full object-cover md:object-right opacity-40 md:opacity-60"
            alt=""
          />
        </div>
      </transition-group>
    </div>

    <!-- Parallax Circles -->
    <div
      class="absolute mix-blend-difference inset-0 pointer-events-none overflow-hidden z-[1]"
    >
      <!-- Circle 1 -->
      <Parallax :speed="0.6" class="absolute left-1/4 top-1/4">
        <div
          class="floating-circle-1 w-48 h-48 md:w-[300px] md:h-[300px] rounded-full border-2 border-white/10 bg-white backdrop-blur-[2px]"
        ></div>
      </Parallax>

      <!-- Circle 2 -->
      <Parallax :speed="-0.5" class="absolute right-1/4 bottom-1/4">
        <div
          class="floating-circle-2 w-24 h-24 md:w-[150px] md:h-[150px] rounded-full border-2 border-white/20 bg-white"
        ></div>
      </Parallax>
    </div>

    <!-- Content Container -->
    <div
      class="container mix-blend-difference mx-auto px-6 md:px-12 relative z-10"
    >
      <div class="max-w-2xl overflow-hidden">
        <transition-group
          name="slide-fade"
          tag="div"
          class="relative h-[220px]"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            v-show="currentSlide === index"
            class="absolute top-0 left-0 w-full"
          >
            <h1
              class="text-4xl md:text-[72px] font-dm-serif leading-[1.1] mb-6 animate-slide-up"
            >
              {{ slide.title }}
            </h1>
            <p
              class="text-base md:text-[22px] leading-[24px] md:leading-[30px] opacity-90 font-dm-sans max-w-[40ch] animate-slide-up-delayed"
            >
              {{ slide.subtitle }}
            </p>
          </div>
        </transition-group>
      </div>

      <!-- Indicators -->
      <div class="flex gap-3 mt-8 md:mt-12">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="h-1 transition-all duration-300 rounded-full"
          :class="[
            currentSlide === index ? 'w-12 bg-white' : 'w-4 bg-white/30',
          ]"
          :aria-label="'Go to slide ' + (index + 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-dm-serif {
  font-family: "DM Serif Display", serif;
}

.slide-fade-enter-active,
.slide-fade-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up-delayed {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
