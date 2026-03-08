<template>
    <div class="p-8 font-sans bg-gray-50 min-h-screen">
        <!-- Header -->
    <div class="flex justify-between items-center border-b pb-6">
       <router-link to="/cart" style="font-size: 24px; font-weight: 500;" class="text-[rgb(17,17,17)] hover:underline">
           <i class="fa-solid fa-arrow-left" style="margin-right: 8px;"></i> Cart
        </router-link>
    </div>
        <div class="mt-44 flex flex-col items-center justify-center bg-gray-50 font-sans text-center">
    <!-- Confirmation Box -->
    <div class="max-w-md w-full bg-gray-50">
      <div class="text-5xl mb-6"><i class="fa-solid fa-circle-check text-9xl"></i></div>
      <h1 class="text-2xl font-semibold mb-2">Your order was successful!</h1>
      <p class="text-gray-500 mb-4">
        Thank you for your purchase. A confirmation email with your order details has been sent to your inbox.
       <br/> We'll notify you when your items are on the way!
      </p>
      <p class="text-sm text-gray-400 mb-6">
        Need help?
        <a href="#" class="underline text-gray-600">Contact Support</a>
      </p>
      <button class="bg-black text-white px-6 py-3 gap-3 rounded-full w-full flex items-center justify-center space-x-2">
        <span>Check your email</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
    </div>
  
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
