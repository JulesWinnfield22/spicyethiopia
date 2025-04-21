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

    <section
        class="bg-black text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center"
      >
        <div class="md:w-1/2 space-y-4 px-8">
          <a href="#" class="text-sm underline">Learn About Berbere</a>
          <h2 class="text-5xl font-bold">
            The premier card transcending borders.
          </h2>
          <p class="text-gray-300 font-sans text-lg">
            Experience the versatility of a Capital Guard card. Spend freely,
            anywhere in the world, anytime.
          </p>
          <ul class="space-y-2 gap-3 text-lg font-sans">
            <li class="flex items-center gap-3 space-x-2">
              <span
                class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i class="fa-solid fa-check"></i>
              </span>
              Accepted worldwide.
            </li>
            <li class="flex items-center gap-3 space-x-4">
              <span
                class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i class="fa-solid fa-check fa-2"></i>
              </span>
              Monitor spending.
            </li>
            <li class="flex items-center gap-3 space-x-2">
              <span
                class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                <i class="fa-solid fa-check"></i>
              </span>
              Zero minimum balance requirement.
            </li>
          </ul>
          <button
            class="bg-white text-black font-sans font-medium px-4 py-2 rounded-4xl"
          >
            Learn More
          </button>
        </div>
        <div class="container mx-auto px-4 relative flex flex-col items-end">
         
            <div class="md:w-1/2 h-[560px] flex mt-6 md:mt-0">
          <img
            :src="berbereImage"
            alt="Berbere Spice"
            class="rounded-lg shadow-lg w-full md:w-auto"
          />
        </div>
         <div class="flex w-1/2 -mt-14 items-center backdrop-blur-2xl justify-end p-2">
            <div class="flex gap-2">
                 <button
                     class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
                    >Change
                 </button>
            </div>
         </div>
        </div>
        
      </section>

      <section
        class="bg-white text-black py-12 px-6 md:px-12 flex flex-col md:flex-row items-center"
      >

      <div class="container mx-auto px-4 relative flex flex-col items-start">

        <div class="md:w-1/2 h-[560px] flex justify-center mb-6 md:mb-0">
          <img
            :src="flag"
            alt="Ethiopian Flag"
            class="rounded-lg shadow-lg w-full md:w-auto"
          />
        </div>
        <div class="flex w-1/2 -mt-14 items-center backdrop-blur-2xl justify-end p-2">
            <div class="flex gap-2">
                 <button
                     class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
                    >Change
                 </button>
            </div>
         </div>
      </div>
        
        <div class="md:w-1/2 space-y-4 px-12">
          <a href="#" class="text-lg underline">Learn About Ethiopia</a>
          <h2 class="text-5xl font-bold">
            Getting started with Capital Guard is easy
          </h2>
          <p class="font-sans text-lg font-medium">
            Begin your financial journey with Capital Guard. Download the app,
            sign up in minutes, and start managing your money effortlessly. No
            hassle, just progress.
          </p>
          <div class="space-y-2">
            <div class="space-y-6">
              <div
                v-for="(step, index) in steps"
                :key="index"
                :class="{
                  'bg-gray-100 text-black': step.expanded,
                  'bg-white': !step.expanded,
                }"
                class="p-4 rounded-lg font-sans cursor-pointer flex justify-between items-center"
                @click="toggleStep(index)"
              >
                <div class="flex items-start">
                  <span
                    :class="{
                      'bg-black text-white': step.expanded,
                      'bg-[#F2F5F6] text-gray-600': !step.expanded,
                    }"
                    class="rounded-full w-8 h-8 flex items-center justify-center mr-2"
                    style="min-width: 32px"
                  >
                    <strong>{{ index + 1 }}</strong>
                  </span>
                  <div class="flex flex-col">
                    <span class="font-medium">{{ step.title }}</span>
                    <p v-if="step.expanded" class="mt-1 text-[#454745]">
                      {{ step.description }}
                    </p>
                  </div>
                </div>
                <span>
                  <i
                    :class="
                      step.expanded
                        ? 'fa-solid fa-chevron-up'
                        : 'fa-solid fa-chevron-down'
                    "
                  ></i>
                </span>
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
        }

    }
}
</script>