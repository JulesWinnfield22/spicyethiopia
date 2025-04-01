<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center">Spices</h2>
      <p class="text-center max-w-xl font-sans text-gray-500 mt-2 mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
      </p>

      <!-- Categories' tab -->
      <div class="flex justify-center font-sans mt-6 space-x-6 sm:space-x-12 flex-wrap">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full cursor-pointer font-semibold transition"
          :class="selectedCategory === category ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'"
        >
          {{ category }}
        </button>
      </div>

      <!-- Spices' Grid -->
      <div class="grid grid-cols-1 font-sans sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
        <div
          v-for="spice in filteredSpices"
          :key="spice.id"
          class="bg-white p-6 shadow-lg rounded-lg overflow-hidden flex flex-col"
        >
          <img :src="spice.image" :alt="spice.name" class="w-full h-48 object-cover rounded-lg">
          <div class="p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start mt-4">
            
            <!-- Left Side: Name and Price -->
            <div class="sm:w-2/3">
              <h3 class="text-lg font-semibold">{{ spice.name }}</h3>
              <p class="text-gray-500 text-sm">Spice</p>
              <p class="text-3xl font-semibold mt-4">${{ spice.price }}</p>
            </div>
            
            <!-- Right Side: Stars and Cart Button -->
            <div class="flex flex-col items-end sm:w-1/3 sm:mt-0 mt-4">
              
              <!-- Stars -->
              <div class="flex mb-2">
                <i
                  v-for="n in spice.rating"
                  :key="n"
                  class="fas fa-star text-black"
                ></i>
                <i
                  v-for="n in (5 - spice.rating)"
                  :key="5 - n"
                  class="fas fa-star text-gray-300"
                ></i>
              </div>
              
              <!-- Cart Button -->
              <button class="mt-4 sm:mt-12 bg-black text-white px-4 py-2 cursor-pointer rounded-full flex justify-center items-center gap-2">
                Add <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
       <!-- wishlist Button -->
              <button class="mt-4 sm:mt-12 font-sans bg-black text-white px-4 py-2 rounded-full flex justify-center items-center cursor-pointer mx-auto gap-2">
                Wishlist
              </button>
    </div>
  </section>
</template>

<script scoped>
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

export default {
  data() {
    return {
      selectedCategory: "All",
      categories: ["All", "Berbere", "Shiro", "Tiratire", "Special Spices", "Nechshinkurt", "Kundo Berbere"],
      spices: [
        { id: 1, name: "Berbere", price: 95.5, category: "Berbere", image: spiceOne, rating: 5 },
        { id: 2, name: "Shiro", price: 80.0, category: "Shiro", image: spiceTwo, rating: 5 },
        { id: 3, name: "Tiratire", price: 105.0, category: "Tiratire", image: spiceThree, rating: 5 },
        { id: 4, name: "Special Blend", price: 120.0, category: "Special Spices", image: spiceFour, rating: 4 },
        { id: 5, name: "Nechshinkurt", price: 90.0, category: "Nechshinkurt", image: spiceFive, rating: 5 },
        { id: 6, name: "Kundo Berbere", price: 115.0, category: "Kundo Berbere", image: spiceSix, rating: 5 },
        { id: 7, name: "Hot Mitmita", price: 99.0, category: "Berbere", image: spiceSeven, rating: 4 },
        { id: 8, name: "Sweet Shiro", price: 85.0, category: "Shiro", image: spiceEight, rating: 5 },
        { id: 9, name: "Spice Blend", price: 110.0, category: "Special Spices", image: spiceNine, rating: 4 },
        { id: 10, name: "Classic Shiro", price: 88.0, category: "Shiro", image: spiceTen, rating: 4 },
        { id: 11, name: "Premium Berbere", price: 130.0, category: "Berbere", image: spiceEleven, rating: 5 },
        { id: 12, name: "Authentic Mitmita", price: 102.0, category: "Berbere", image: spiceTwelve, rating: 4 },
      ],
    };
  },
  computed: {
    filteredSpices() {
      return this.selectedCategory === "All" ? this.spices : this.spices.filter(s => s.category === this.selectedCategory);
    },
  },
};
</script>

<style scoped>

</style>


