<template>
  <div class="space-y-6 font-sans px-6 py-4">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-chevron-left text-sm"></i>
        <h1 class="text-lg font-medium text-gray-800">Orders detail</h1>
      </div>
      <button class="text-xs border px-4 py-2 rounded border-gray-300 hover:bg-gray-100">Email Customer</button>
    </div>

    <!-- Main Content -->
    <div class="bg-[#F5F5F5] p-6">
      <div class="grid grid-cols-3 gap-4">

        <!-- Order Items -->
        <div class="bg-white p-4 space-y-4">
          <h2 class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3">Order Items</h2>
          <div class="flex justify-between bg-[#F4F4F4] p-3 text-sm">
            <div class="space-y-1">
              <p class="text-gray-500">Order ID</p>
              <p class="text-gray-500">Order created</p>
            </div>
            <div class="text-right space-y-1">
              <p>45629846254738</p>
              <p>12-5-2025</p>
            </div>
          </div>

          <!-- Items List -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <img :src="spiceOne" class="w-16 h-16 rounded border" />
              <div>
                <div class="flex items-center justify-between border-b-2 border-black/5 pb-3">
                <p class="text-sm font-medium">Spice Three</p>
                <p class="text-sm text-gray-500 ml-56">500g</p>
               </div> 
                <p class="text-sm mt-1 font-bold">$40.99</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <img :src="spiceTwo" class="w-16 h-16 rounded border" />
              <div>
                <div class="flex items-center justify-between border-b-2 border-black/5 pb-3">
                <p class="text-sm font-medium">Spice Three</p>
                <p class="text-sm text-gray-500 ml-56">500g</p>
               </div> 
                <p class="text-sm mt-1 font-bold">$12.99</p>
              </div>
            </div>
          </div>

          <!-- Price Details -->
          <div class=" pt-3 mt-3 text-sm space-y-1">
            <div class="flex justify-between">
              <span class="text-gray-500">Sub-total</span>
              <span>$57.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">VAT (5%)</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Shipping fee</span>
              <span>$2.00</span>
            </div>
            <div class="flex justify-between font-semibold pt-1">
              <span>Total</span>
              <span>$59.00</span>
            </div>
          </div>
        </div>

        <!-- Customer Section -->
        <div class="bg-white h-[375px] p-4 space-y-4">
          <h2 class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3 ">Customer</h2>
          <div class="text-sm space-y-2 bg-[#F4F4F4] p-3">
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Full Name</span>
              <span>Girma Biru</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Phone Number</span>
              <span>+1 8736438292</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Email</span>
              <span>girmaibiru@gmail.com</span>
            </div>
          </div>

          <!-- Previous Orders -->
          <div class="bg-[#F4F4F4] p-3">
            <h3 class="text-sm font-medium border-b-2 border-black/5 pb-3 mb-2">Previous orders</h3>
            <div class="text-sm space-y-1">
              <div class="flex justify-between">
                <span class="text-black">1 KB Berbere</span>
                <span class="text-black font-bold">Shipped</span>
              </div>
              <div class="flex justify-between">
                <span>2 KG Mitmita</span>
                <span class="text-black font-bold">Shipped</span>
              </div>
              <div class="flex justify-between">
                <span>1 KG Coffee</span>
                <span class="text-red-500 font-bold">Shipping Pending</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Address Section -->
        <div class="bg-white p-4 space-y-4">
          <h2 class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3">Shipping Address</h2>
          <div class="text-sm bg-[#F4F4F4] p-3 space-y-2">
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Street Address</span>
              <span>Girma Biru</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Apt / Unit / Suite #</span>
              <span>+1 8736438292</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">City</span>
              <span>Toronto</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Province</span>
              <span>Ontario</span>
            </div>
            <div class="flex justify-between border-b-2 border-black/5 pb-3">
              <span class="text-gray-500">Postal Code</span>
              <span>1232</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Country</span>
              <span>Canada</span>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="mt-4">
            <h3 class="text-sm font-medium border-b-2 border-black/5 pb-3 mb-3">Map</h3>
            <div class="bg-[#D9D9D9] h-28 w-full rounded"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between">
      <button class="w-36 h-12 bg-[#FFFFFF] border border-black/60 text-black px-4 py-2 rounded text-sm font-medium">
        Email Customer
      </button>
      <div class="flex gap-2">
        <button class="w-52 h-12 bg-gray-50 border border-black/10 text-black px-4 py-2 rounded text-sm font-medium">
          Cancel Order and Refund
        </button>
        <button class="w-52 h-12 bg-black text-white px-4 py-2 rounded text-sm font-medium">
          Ship To Customer
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import spiceOne from '@/assets/img/spiceOne.png'
import spiceTwo from '@/assets/img/spiceTwo.png'
</script>

