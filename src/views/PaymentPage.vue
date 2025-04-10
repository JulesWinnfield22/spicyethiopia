<template>
  <div class="p-8 font-sans bg-gray-50 min-h-screen">

    <!-- Header -->
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
      <div class="flex items-center space-x-5 w-full">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center"><i class="fa-solid fa-cart-shopping text-xl text-white"></i></div>
          <span class="text-gray-500">Cart</span>
        </div>
        <div class="flex-1 h-1.5 rounded-md bg-gray-300"></div>
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 text-white text-xs flex items-center justify-center"><i class="fa-solid fa-location-dot text-2xl"></i></div>
          <span class="text-black font-semibold">Shipping Information</span>
        </div>
        <div class="flex-1 h-1.5 bg-gray-300 rounded-md"></div>
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-black text-xs flex items-center justify-center"><i class="fa-solid fa-credit-card text-xl text-white"></i></div>
          <span class="text-black font-bold">Payment</span>
        </div>
      </div>
    </div>

    <!-- Main Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Payment Form -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-6 rounded-xl shadow-md space-y-4">
          <!-- Delivery Address -->
          <div class="border p-4 rounded">
            <div class="flex justify-between items-center mb-4 border-b pb-3 border-[#D0D5DD]">
                <h2 class="font-semibold ">Delivery Address</h2>
                <router-link to="/shipping" style="font-size: 16px; font-weight: 400;" class="text-[rgb(17,17,17)] hover:underline">
                    <button class="text-sm text-gray-400 underline cursor-pointer">Change</button>
                </router-link>
                
            </div>          
            <div class=" flex justify-between items-center">      
              <div>
                <p class="font-medium"><i class="fa-solid fa-location-dot"></i> Home</p>
                <p class="text-sm text-gray-500">925 S Chugach St #APT 10, Alaska 99645</p>
              </div>             
            </div>
          </div>

          <!-- Card Details -->
          <div class="border p-4 rounded">
            <div class="mb-4 border-b pb-3 border-[#D0D5DD]">
                <h2 class="font-semibold mb-2"><i class="fa-solid fa-credit-card"></i> Add Debit or Credit Card</h2>
            </div>
            <div>
                <p class="mb-4 text-[#7E7E7E]">Card number</p>
                <input type="text" placeholder="Enter your card number" class="w-full h-[52px] border border-neutral-300 px-4 py-2 rounded-md text-sm mb-3 " />
            </div>
            
            <div class="grid grid-cols-2 gap-4 mt-3">
                <div>
                    <p class="mb-4 text-[#7E7E7E]">Expiry Date</p>
                    <input type="text" placeholder="MM/YY" class="w-full h-[52px] border border-neutral-300 px-4 py-2 rounded-md text-sm" />
                </div>
              <div>
                    <p class="mb-4 text-[#7E7E7E]">Security Code</p>
                    <input type="text" placeholder="CVC" class="w-full h-[52px] border border-neutral-300 px-4 py-2 rounded-md text-sm" />
                </div>
              
            </div>
          </div>
        </div>
      </div>

      <!-- Total Price Summary -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-semibold mb-4">Total Price</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span>Sub-total</span><span>$57.00</span></div>
          <div class="flex justify-between"><span>VAT (%)</span><span>$0.00</span></div>
          <div class="flex justify-between"><span>Shipping fee</span><span>$2.00</span></div>
          <hr class="my-2" />
          <div class="flex justify-between font-bold text-lg"><span>Total</span><span>$59.00</span></div>
        </div>
        <button @click.prevent="goToCheckout" class="bg-black text-white px-4 py-2 rounded-full w-full mt-64 flex items-center justify-between">
          <span>Checkout</span>
          <span>→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const total = ref(0);

    const loadCartTotal = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      total.value = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    };

    const goToCheckout = () => {
      router.push('/checkout');
    };

    onMounted(() => {
      loadCartTotal();
    });

    return {
      total,
      goToCheckout,
    };
  },
});
</script>

<style scoped>

</style>
