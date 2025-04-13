<template>
  <div class="flex min-h-screen">
    <!-- Left Side Image -->
    <div class="w-2/3 bg-cover bg-center" :style="{ backgroundImage: `url(${login})` }"></div>

    <!-- Right Side Form -->
    <div class="w-1/3 flex flex-col items-center justify-center px-8">
      
      <div class="w-full max-w-md space-y-8">

        <!-- Logo -->
        <div class="flex justify-center">
          <img :src="login2" alt="Spice Bottle" class="h-56" />
        </div>

        <!-- Welcome Text -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-5">Nice to see you again</h2>
          <p class="text-sm text-gray-600 font-sans">
            Oversee your spice inventory and ensure timely follow-ups regarding your Authentic Ethiopian Spices.
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4 font-sans">
          <div>
            <div>
              <p class="mb-2 text-[#7E7E7E]">
                Email
              </p>
              <label for="email" class="sr-only">Email or phone number</label>
            <input id="email" v-model="email" type="text" placeholder="Email or phone number"
              class="w-full h-[52px] bg-[#F2F2F2] border border-[#E5E5E5] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>
              <p class="mb-2 text-[#7E7E7E]">
                Password
              </p>
          <div class="relative mb-8">
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter password"
              class="w-full h-[52px] bg-[#F2F2F2] border border-[#E5E5E5] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" />
            <button type="button" @click="togglePassword" class="absolute right-3 top-4 text-[#4D4D4D]">  
              <i v-if="showPassword" class="fa-solid fa-eye-slash"></i>
              <i v-else class="fa-solid fa-eye"></i>    
            </button>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-sm text-gray-600 mb-8">
            <div class="flex items-center space-x-2">
              <button @click.prevent="rememberMe = !rememberMe" :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
                rememberMe ? 'bg-black' : 'bg-[#F2F2F2] border-[0.5px] border-[#E5E5E5]'
              ]">
                <span :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200',
                  rememberMe ? 'translate-x-6' : 'translate-x-1'
                ]"></span>
              </button>
              <span class="text-black">Remember me</span>
            </div>
            <a href="#" class="hover:underline text-black">Forgot password?</a>
          </div>

          <!-- Login Button -->
          <button type="submit"
            class="w-full h-[56px] bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200">
            Login
          </button>
        </form>

        <!-- Footer -->
        <p class="text-center text-sm text-[#666666] mt-28 font-sans">
          Designed and Developed by <a href="#" class="underline hover:text-black">Encoverse</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import login from '@/assets/img/login.png';
import login2 from '@/assets/img/login2.png';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = () => {
  console.log('Logging in with:', { email: email.value, password: password.value, rememberMe: rememberMe.value });
};
</script>

<style scoped>

</style>
