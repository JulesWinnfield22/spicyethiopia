<template>
  <div class="p-8 font-sans bg-gray-50 min-h-screen">
    <!-- Header with Add Items -->
    <div class="flex justify-between items-center mb-6 border-b pb-6">
       <router-link to="/cart" style="font-size: 24px; font-weight: 500;" class="text-[rgb(17,17,17)] hover:underline">
           <i class="fa-solid fa-arrow-left" style="margin-right: 8px;"></i> Cart
        </router-link>
        <router-link to="/shop" style="font-size: 16px; font-weight: 300;" class="text-[rgb(17,17,17)] hover:underline">
            <button class="bg-black text-white px-4 py-2 rounded-full cursor-pointer">+ Add Items</button>
        </router-link>
    </div>

    <!-- Progress Bar -->
    <div class="flex bg-[#FFFFFF] h-[90px] p-2 rounded-lg items-center justify-between mb-8">
      <div class="flex items-center space-x-8 w-full">
        <!-- Step 1 -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-black text-white text-xs flex items-center justify-center"><i class="fa-solid fa-cart-shopping text-xl"></i></div>
          <span class="text-black font-semibold">Cart</span>
        </div>
        <div class="flex-1 h-1.5 rounded-md bg-black"></div>

        <!-- Step 2 -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center"><i class="fa-solid fa-location-dot text-white text-2xl"></i></div>
          <span class="text-gray-500">Shipping Information</span>
        </div>
        <div class="flex-1 h-0.5 bg-gray-300"></div>

        <!-- Step 3 -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center"><i class="fa-solid fa-credit-card text-white text-xl"></i></div>
          <span class="text-gray-500">Payment</span>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 px-12">
      <!-- Cart Items -->
      <div class="lg:col-span-2 w-[800px] bg-white shadow-md p-6 rounded-2xl space-y-6">
        <h2 class="text-lg font-semibold mb-2">Items in cart ({{ cart.length }} Items)</h2>

        <div
          v-for="(item, index) in cart"
          :key="item.id"
          class="bg-white p-4 rounded-2xl border border-black  shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center space-x-4">
            <img :src="item.image" alt="Spice" class="w-24 h-24 object-cover rounded" />
            <div>
                <div class="border-b-2 border-[#D0D5DD] w-full"> 
                    <h3 class="text-xl font-semibold">{{ item.name }}</h3>
                    <p class="text-gray-500 mt-1">${{ item.price.toFixed(2) }}</p>       
                </div> 
                     <p class="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur.</p>
              <div class="flex gap-6">
                <div class="flex items-center space-x-2 bg-gray-200 rounded-4xl">
                    <button @click="decreaseQty(index)" class=" px-2 py-1 rounded">-</button>
                        <span>{{ item.quantity }}</span>
                    <button @click="increaseQty(index)" class=" px-2 py-1 rounded">+</button>
                </div>
                <button @click="removeItem(index)" class="w-36 h-9 flex bg-[#FF7E7E] text-white px-4 py-2 gap-2 font-medium rounded-full text-sm">
            <i class="fa-solid fa-trash-can py-1 "></i>  Remove Item
                </button>
            </div>
            </div>
            
          </div>

          <div class="flex flex-col items-end -mt-24">
           
             <select
            v-model="selectedSize"
            class="text-black font-sans font-semibold rounded-md px-2 py-1 text-[20px] focus:outline-none"
          >
            <option value="250g">250g</option>
            <option value="500g">500g</option>
            <option value="1kg">1kg</option>
          </select>
            
          </div>
        </div>
      </div>

      <!-- Total Price Summary -->
      <div class="bg-white w-[360px] h-[675px] rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Total Price</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Sub-total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>VAT (%)</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping fee</span>
            <span>$2.00</span>
          </div>
          <hr class="my-2" />
          <div class="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${{ (total + 2).toFixed(2) }}</span>
          </div>
        </div>

        <!-- Go to Shipping Button -->
         <div class="pl-8">
            <button
          @click="goToShipping"
          class="bg-black w-[255px] h-[52px] text-white px-4 py-2 rounded-full  mt-96 flex items-center justify-between cursor-pointer"
        >
          <span>Shipping Information</span>
          <span><i class="fa-solid fa-arrow-right"></i></span>
        </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

export default defineComponent({
  setup() {
    const cart = ref<CartItem[]>([]);
    const total = ref(0);
    const router = useRouter();
    const selectedSize = ref<string>('500g')

    const loadCart = () => {
      const stored = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.value = stored;
      updateTotal();
    };

    const updateTotal = () => {
      total.value = cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(cart.value));
      window.dispatchEvent(new Event('cart-updated'));
    };

    const increaseQty = (index: number) => {
      cart.value[index].quantity++;
      updateTotal();
    };

    const decreaseQty = (index: number) => {
      if (cart.value[index].quantity > 1) {
        cart.value[index].quantity--;
      } else {
        cart.value.splice(index, 1);
      }
      updateTotal();
    };

    const removeItem = (index: number) => {
      cart.value.splice(index, 1);
      updateTotal();
    };

    

    const goToShipping = () => {
      router.push('/shipping');
    };

    

    onMounted(() => {
      loadCart();
    });

    return {
      cart,
      total,
      increaseQty,
      decreaseQty,
      removeItem,
      goToShipping,
      selectedSize: '500g' as string,
    };
  },
});
</script>
