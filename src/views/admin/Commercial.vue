<template>
  <div class="p-6 space-y-8 font-sans">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h1 class="text-lg font-medium text-gray-800">Commercial</h1>
      </div>
    </div>
    
    <!-- Editing Sections -->
    <section>
        
        <div class="container mx-auto px-4 relative flex flex-col items-center"> 
         
        <div class="w-full h-[300px] sm:h-[400px] md:h-[480px] flex justify-center mb-6 md:mb-0">
            <img :src="banner" alt="Shop Banner" class="w-full h-full object-cover" />
         </div>    
         <div class="flex w-full -mt-14 backdrop-blur-3xl items-center  justify-end p-2">
            <div class="flex gap-2">
                <button class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium">
                    Change
                </button>
            </div>
         </div>
        </div>
    </section>

    <section class="">
      <div class="container mx-auto px-4 relative flex flex-col items-center">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          <div class="flex justify-center">
            <img
              :src="spices2"
              alt="Spices"
              class="rounded-lg w-full h-full object-cover shadow-lg"
            />
          </div>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:mt-0">
            <div class="flex justify-center">
              <img
                :src="spices3"
                alt="Spices"
                class="rounded-lg w-full h-full object-cover shadow-lg"
              />
            </div>
            <div
              class="text-center mt-6 text-5xl sm:text-6xl font-serif font-bold relative z-10"
            >
              ETHIOPIAN <br />
              <span
                class="text-[105px] sm:text-[106px] font-serif leading-tight"
                style="webkit-text-stroke: 1px gray; color: white"
              >
                SPICES
              </span>
            </div>
            <div class="flex justify-center">
              <img
                :src="spices4"
                alt="Spices"
                class="rounded-lg w-full h-full object-cover shadow-lg"
              />
            </div>
          </div>
          <div class="flex justify-center">
            <img
              :src="spices1"
              alt="Spices"
              class="rounded-lg w-full h-full object-cover shadow-lg"
            />
          </div>
        </div>
        <div class="flex w-full -mt-14 items-center backdrop-blur-2xl justify-end p-2">
            <div class="flex gap-2">
                 <button
                     class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
                    >Change
                 </button>
            </div>
        </div>
      </div>
    </section>
    <section class="bg-[#F2F5F6] text-black py-12 px-6 md:px-12 flex flex-col md:flex-row gap-10">
  

        <!-- Text Area -->
        <div class="w-full bg-white rounded flex flex-col justify-center md:w-1/2 px-12">
          <div class="p-5 bg-[#F2F3F6] rounded mt-4">
            <h2 class="text-5xl font-bold">
            Deals of The Month
          </h2>
          </div>
          
        <div class="p-5 bg-[#F2F3F6] rounded mt-4">
          <p class="font-sans text-lg mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin 
          </p>
        </div>
          
        </div>

        <!-- Image Area -->
  <div class="w-full md:w-1/2 grid grid-cols-3 gap-4">
  <!-- Image 1 -->
  <div class="relative">
    <img
      :src="spices2"
      alt=""
      class="rounded-lg shadow-lg object-cover w-full h-full"
    />
    <div class="absolute bottom-1 left-0 w-full flex justify-end p-2 backdrop-blur-2xl">
      <button
        class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
      >
        Change
      </button>
    </div>
  </div>

  <!-- Image 2 -->
  <div class="relative">
    <img
      :src="spiceFour"
      alt=""
      class="rounded-lg shadow-lg object-cover w-full h-full"
    />
    <div class="absolute bottom-2 left-0 w-full flex justify-end p-2 backdrop-blur-2xl">
      <button
        class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
      >
        Change
      </button>
    </div>
  </div>

  <!-- Image 3 -->
  <div class="relative">
    <img
      :src="spiceTwo"
      alt=""
      class="rounded-lg shadow-lg object-cover w-full h-full"
    />
    <div class="absolute bottom-2 left-0 w-full flex justify-end p-2 backdrop-blur-2xl">
      <button
        class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
      >
        Change
      </button>
    </div>
  </div>
</div>

</section>

    <section class="bg-black text-white py-12 flex flex-row justify-center">
  <div class="flex flex-row gap-6 max-w-[90%] w-full">
    
    <!-- Right Section -->
    <div class="w-[48%] space-y-6 px-6 py-8 bg-white text-black rounded-lg shadow">
      <div class="bg-[#F2F3F6] p-5 rounded">
        <a href="#" class="text-sm">Learn About Berbere</a>
      </div>
      <div class="bg-[#F2F3F6] p-5 rounded">
        <h2 class="text-5xl font-bold leading-tight">
          The premier card transcending borders.
        </h2>
      </div>
      <div class="bg-[#F2F3F6] p-5 rounded">
        <p class="text-lg font-sans">
          Experience the versatility of a Capital Guard card. Spend freely,
          anywhere in the world, anytime.
        </p>
      </div>
      <div class="bg-[#F2F3F6] p-5 rounded">
        <ul class="space-y-3 text-lg font-sans">
          <li class="flex items-center gap-3">
            <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
              <i class="fa-solid fa-check"></i>
            </span>
            Accepted worldwide.
          </li>
          <li class="flex items-center gap-3">
            <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
              <i class="fa-solid fa-check"></i>
            </span>
            Monitor spending.
          </li>
          <li class="flex items-center gap-3">
            <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
              <i class="fa-solid fa-check"></i>
            </span>
            Zero minimum balance requirement.
          </li>
        </ul>
      </div>
    </div>

    <!-- Left Section -->
    <div class="w-[48%] flex flex-col items-end relative">
      <div class="w-full h-[560px] overflow-hidden rounded-lg shadow-lg">
        <img
          :src="berbereImage"
          alt="Berbere Spice"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex -mt-14 w-full justify-end px-4 py-3 backdrop-blur-2xl">
        <button class="w-24 h-12 bg-black text-white rounded text-sm font-medium">
          Change
        </button>
      </div>
    </div>

  </div>
</section>

<section class="bg-white text-black py-12 flex flex-row justify-center">
  <div class="flex flex-row gap-6 max-w-[90%] w-full">

    <!-- Left Section -->
    <div class="w-[48%] flex flex-col items-start relative">
      <div class="w-full h-[560px] flex justify-center mb-4">
        <img
          :src="flag"
          alt="Ethiopian Flag"
          class="rounded-lg shadow-lg w-full h-full object-cover"
        />
      </div>
      <div class="flex -mt-20 w-full justify-end px-4 py-3 backdrop-blur-2xl">
        <button
          class="w-24 h-12 bg-black text-white rounded text-sm font-medium"
        >
          Change
        </button>
      </div>
    </div>

    <!-- Right Section -->
    <div class="w-[48%] space-y-6">
      <div class="bg-[#F2F3F6] p-5 rounded">
        <a href="#" class="text-lg">Learn About Ethiopia</a>
      </div>

      <div class="bg-[#F2F3F6] p-5 rounded">
        <h2 class="text-5xl font-bold leading-tight">
          Getting started with Capital Guard is easy
        </h2>
      </div>

      <div class="bg-[#F2F3F6] p-5 rounded">
        <p class="text-lg font-sans font-medium">
          Begin your financial journey with Capital Guard. Download the app,
          sign up in minutes, and start managing your money effortlessly. No
          hassle, just progress.
        </p>
      </div>

      <!-- Steps -->
      <div class="space-y-4">
        <div class="bg-[#F2F3F6] p-5 rounded space-y-3">
          <div class="bg-white p-5 rounded">
            <p>Sign up for your Capital Guard account.</p>
          </div>
          <div class="bg-white p-5 rounded">
            <p>
              Initiate your registration either online or through the Paymint
              app. We'll request certain personal details such as your contact
              information, nationality, and passport
            </p>
          </div>
        </div>

        <div class="bg-[#F2F3F6] p-5 rounded space-y-3">
          <div class="bg-white p-5 rounded">
            <p>Enter your transfer details</p>
          </div>
          <div class="bg-white p-5 rounded">
            <p>
              Initiate your registration either online or through the Paymint
              app. We'll request certain personal details such as your contact
              information, nationality, and passport
            </p>
          </div>
        </div>

        <div class="bg-[#F2F3F6] p-5 rounded space-y-3">
          <div class="bg-white p-5 rounded">
            <p>Send funds for your transfer</p>
          </div>
          <div class="bg-white p-5 rounded">
            <p>
              Initiate your registration either online or through the Paymint
              app. We'll request certain personal details such as your contact
              information, nationality, and passport
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

     
    
  </div>
</template>

<script lang="ts">
import banner from '@/assets/img/banner.png';
import spices1 from "@/assets/img/spiceSpoonRight.png";
import spices2 from "@/assets/img/spiceSpoonLeft.png";
import spices3 from "@/assets/img/coffee.png";
import spices4 from "@/assets/img/spiceSpoonBottom.png";
import flag from "@/assets/img/flagEth.png";
import berbereImage from "@/assets/img/berbereImage.png";
import gelila1 from "@/assets/img/gelila1.png";
import gelila2 from "@/assets/img/gelila2.png";
import gelila3 from "@/assets/img/gelila3.png";
import spiceTwo from "@/assets/img/spiceTwo.png";
import spiceFour from "@/assets/img/spiceFour.png";

export default {
    data () {
        return {
            banner,
            spices1,
            spices2,
            spices3,
            spices4,
            flag,
            berbereImage,
            spiceTwo,
            spiceFour,
        }

    }
}
</script>