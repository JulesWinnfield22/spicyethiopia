<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

useSeoMeta({
  title: 'Page Not Found | The Spicy Ethiopian',
  robots: 'noindex, nofollow',
});

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center space-y-8">
      <div>
        <h1 class="text-9xl font-extrabold text-[#7c2d12] tracking-widest">404</h1>
        <div class="bg-[#f97316] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
      </div>
      
      <div class="space-y-4">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          Oops! You've lost your way.
        </h2>
        <p class="text-md text-gray-600">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to the spice trail.
        </p>
      </div>

      <div class="mt-8">
        <button
          @click="goHome"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#7c2d12] hover:bg-[#9a3412] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c2d12] transition-colors duration-200"
        >
          Return Home
        </button>
      </div>
      
      <div class="mt-12">
        <img 
          src="~/assets/img/spicylogo.png" 
          alt="Spicy Ethiopia Logo" 
          class="mx-auto h-20 w-auto opacity-50 grayscale"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-12 {
  transform: rotate(12deg) translate(50%, -50%);
  margin-left: 20%;
  margin-top: -2rem;
}
</style>
