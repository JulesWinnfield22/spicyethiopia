<template>

  <section class="py-8 px-4 sm:px-8 lg:px-24">

    <!-- Back Link -->
    <div class="mb-12 border-b border-[#A3A3A3] pb-4">
        <router-link to="/shop" style="font-size: 24px;" class="text-[#111111] hover:underline">
           <i class="fa-solid fa-arrow-left" style="margin-right: 8px;"></i> Spice Category
        </router-link>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Image -->
      <div class="lg:w-1/2">
        <img :src="spice.image" :alt="spice.name" class="w-full rounded-lg object-cover h-80" />
      </div>

      <!-- Details -->
      <div class="lg:w-1/2 space-y-4">
        <div class=" border-b border-[#A3A3A3] pb-4">
          <div class="flex justify-between items-start">
          <h2 class="text-[32px] font-medium">{{ spice.name }}</h2>
          <select
            v-model="selectedSize"
            class="text-black font-sans font-semibold rounded-md px-2 py-1 text-[20px] focus:outline-none"
          >
            <option value="250g">250g</option>
            <option value="500g">500g</option>
            <option value="1kg">1kg</option>
          </select>
        </div>

        <p class="text-[#B88C39] text-[34px] font-sans font-semibold">${{ spice.price.toFixed(2) }}</p>
      </div>
        
      <div class=" border-b border-[#A3A3A3] pb-8 mb-6">
        <p class="text-black text-lg font-sans">
          Lorem ipsum dolor sit amet consectetur. Egestas magna sit id ut mauris massa. Vestibulum facilisi orci sit
          etiam proin est. Commodo massa amet suspendisse adipiscing amet quis eget donec. Purus convallis commodo
          mauris imperdiet tristique ipsum.
        </p>
      </div>
        

        <!-- Quantity & Add to Cart -->
        <div class="flex items-center gap-4 mt-4 font-sans">
          <div class="flex items-center space-x-2 bg-gray-200 rounded-4xl">
                    <button @click="decrement(value)" class=" px-2 py-1 rounded">-</button>
                        <span>{{ quantity }}</span>
                    <button @click="increment(index)" class=" px-2 py-1 rounded">+</button>
                </div>
          <button class="bg-black text-white px-6 py-2 rounded-full text-sm hover:opacity-90">
            Add to cart
          </button>
        </div>

        <!-- Tabs -->
       <div class="mt-6 font-sans" style="max-width: 600px; margin: auto; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); background-color: white;">
  <div class="flex gap-4 border-b mb-2" style="border-bottom: 2px solid #e0e0e0;">
    <button
      class="py-2 px-4 text-sm"
      :class="{ 'border-b-2 border-black font-semibold': tab === 'ingredients' }"
      @click="tab = 'ingredients'"
      style="flex: 1; cursor: pointer; background: none; border: none; outline: none; text-align: center;"
    >
      Ingredient Details
    </button>
    <button
      class="py-2 px-4 text-sm"
      :class="{ 'border-b-2 border-black font-semibold': tab === 'instructions' }"
      @click="tab = 'instructions'"
      style="flex: 1; cursor: pointer; background: none; border: none; outline: none; text-align: center;"
    >
      Use Instructions
    </button>
  </div>
  <div class="text-sm text-gray-600" style="padding: 20px 0;">
    <div v-if="tab === 'ingredients'" style="margin: 0;"><p>
      Lorem ipsum dolor sit amet consectetur. Egestas sagittis sit at nibh maecenas tortor. Veneniatis malesuada nisl porttitor congue pellentesque. Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit tortor.
    </p>
    <ul class="list-decimal pl-5 space-y-1" style="list-style-type: decimal; padding-left: 20px;">
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
    </ul>
  </div>
    <div v-else >
    <ul class="list-decimal pl-5 space-y-1" style="list-style-type: decimal; padding-left: 20px;">
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
      <li>Cursus in nunc eu amet. Suspendisse sit ipsum urna vulputate sapien nunc elit.</li>
    </ul>
  </div>
    
  </div>
</div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="mt-16 font-sans">
      <h3 class="text-lg font-semibold border-b border-[#A3A3A3] pb-8 mb-6 font-sans">Related Products</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div
  v-for="related in relatedSpices"
  :key="related.id"
  class="bg-white p-4 sm:p-6 shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-200"
>
  <router-link :to="`/spice/${related.id}`" class="flex-grow">
    <img :src="related.image" :alt="related.name" class="w-full h-40 object-cover rounded" />
    <h4 class="mt-3 font-semibold text-xl">{{ related.name }}</h4>
  </router-link>
  <div class="flex justify-between items-center mt-4 sm:mt-6">
    <p class="text-2xl text-[#484848]">${{ related.price.toFixed(2) }}</p>
    <button  class="bg-black text-white px-4 py-2 cursor-pointer rounded-full flex justify-center items-center gap-2">
      Add <i class="fas fa-shopping-cart"></i>
    </button>
  </div>
</div>
         
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed  } from 'vue';
import { useRoute } from 'vue-router';


import spiceOne from '@/assets/img/spiceOne.png';
import spiceTwo from '@/assets/img/spiceTwo.png';
import spiceThree from '@/assets/img/spiceThree.png';
import spiceFour from '@/assets/img/spiceFour.png';
import spiceFive from '@/assets/img/spiceFive.png';
import spiceSix from '@/assets/img/spiceSix.png';
import spiceSeven from '@/assets/img/spiceSeven.png';
import spiceEight from '@/assets/img/spiceEight.png';
import spiceNine from '@/assets/img/spiceNine.png';
import spiceTen from '@/assets/img/spiceTen.png';
import spiceEleven from '@/assets/img/spiceEleven.png';
import spiceTwelve from '@/assets/img/spiceTwelve.png';

const route = useRoute();
const spiceId = computed(() => parseInt(route.params.id)); 

// Spice data array
const spices = [
  { id: 1, name: 'Berbere', price: 95.5, image: spiceOne, category: 'Berbere', rating: 5 },
  { id: 2, name: 'Shiro', price: 80.0, image: spiceTwo, category: 'Shiro', rating: 5 },
  { id: 3, name: 'Tiratire', price: 105.0, image: spiceThree, category: 'Tiratire', rating: 5 },
  { id: 4, name: 'Special Blend', price: 120.0, image: spiceFour, category: 'Special Spices', rating: 4 },
  { id: 5, name: 'Nechshinkurt', price: 90.0, image: spiceFive, category: 'Nechshinkurt', rating: 5 },
  { id: 6, name: 'Kundo Berbere', price: 115.0, image: spiceSix, category: 'Kundo Berbere', rating: 5 },
  { id: 7, name: 'Hot Mitmita', price: 99.0, image: spiceSeven, category: 'Berbere', rating: 4 },
  { id: 8, name: 'Sweet Shiro', price: 85.0, image: spiceEight, category: 'Shiro', rating: 5 },
  { id: 9, name: 'Spice Blend', price: 110.0, image: spiceNine, category: 'Special Spices', rating: 4 },
  { id: 10, name: 'Classic Shiro', price: 88.0, image: spiceTen, category: 'Shiro', rating: 4 },
  { id: 11, name: 'Premium Berbere', price: 130.0, image: spiceEleven, category: 'Berbere', rating: 5 },
  { id: 12, name: 'Authentic Mitmita', price: 102.0, image: spiceTwelve, category: 'Berbere', rating: 4 },
];


const spice = computed(() => spices.find((s) => s.id === spiceId.value) || spices[0]);


const relatedSpices = computed(() => spices.filter((s) => s.id !== spiceId.value).slice(0, 6));

const selectedSize = ref('500g');
const quantity = ref(1);
const tab = ref('ingredients');

const increment = () => quantity.value++;
const decrement = () => {
  if (quantity.value > 1) quantity.value--;
};
</script>
