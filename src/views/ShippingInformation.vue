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
          <div class="w-10 h-10 rounded-full bg-black text-white text-xs flex items-center justify-center"><i class="fa-solid fa-location-dot text-2xl"></i></div>
          <span class="text-black font-semibold">Shipping Information</span>
        </div>
        <div class="flex-1 h-1.5 bg-black rounded-md"></div>
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 rounded-full bg-gray-300 text-xs flex items-center justify-center"><i class="fa-solid fa-credit-card text-xl text-white"></i></div>
          <span class="text-gray-500">Payment</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 px-12">
      <!-- Shipping Form -->
      <form class="lg:col-span-2 space-y-6 w-[800px] h-[770px] bg-[#FFFFFF] p-4 shadow-lg rounded-lg">
        <div>
          <h2 class="text-lg font-semibold mb-6 border-b-2 pb-5 border-[#D0D5DD]">Personal Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="mb-4 text-[#7E7E7E]">First name</p>
              <input type="text" placeholder="Enter first name" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Last name</p>
              <input type="text" placeholder="Enter last name" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Phone number</p>
              <input type="text" placeholder="+251" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Email</p>
              <input type="email" placeholder="Enter your email" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-6 border-b-2 pb-5 border-[#D0D5DD]">Shipping Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="mb-4 text-[#7E7E7E]">Street Address</p>
              <input type="text" placeholder="Enter Street" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Apt / Unit / Suite #</p>
              <input type="text" placeholder="Enter Apt / Unit / Suite #" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">City</p>
              <input type="text" placeholder="Select City" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Province</p>
              <input type="text" placeholder="Select State / Province / Region" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Postal Code</p>
              <input type="text" placeholder="Enter Zip / Postal Code" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-4 text-[#7E7E7E]">Country</p>
              <input type="text" placeholder="Select Country" class="w-full h-[52px] border border-gray-300 px-4 py-2 rounded-md" />
            </div>
            
          </div>
        </div>

        <div class="flex justify-end mt-2">
          <button
            @click.prevent="goToPayment"
            class="bg-black text-white px-6 py-2 rounded-full flex items-center space-x-2"
          >
            <span>Payment</span>
            <span>→</span>
          </button>
        </div>
      </form>

      <!-- Total Summary -->
      <div class="bg-white rounded-xl shadow-md p-6 h-fit">
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

    const goToPayment = () => {
      router.push('/payment');
    };

    onMounted(() => {
      loadCartTotal();
    });

    return {
      total,
      goToPayment,
    };
  },
});
</script>

<style scoped>

</style>
