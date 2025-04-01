<template>
  <div class="overflow-x-hidden">
    <section class="bg-black text-white py-16 text-center">
      <div class="container mx-auto px-8">
        <h1 class="text-6xl font-semibold leading-tight font-serif">Authentic Ethiopian Spices<br>Delivered to Your Door.</h1>
        <p class="mt-4 font-sans max-w-3xl mx-auto text-lg">
          Enhance your culinary creations with our authentic Ethiopian spices, now available for easy online ordering and
          home delivery. Savor the rich, bold flavors of Ethiopia with our premium, organic selections. From Berbere to Mitmita,
          we bring you the essence of Ethiopian cuisine—sourced directly, bursting with flavor, and delivered swiftly across Canada.
        </p>
        <div class="mt-8 flex justify-center gap-6">
          <button class="bg-white text-black font-sans px-6 py-3 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-gray-100">
            Featured Spices <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>
          <button class="border border-white font-sans px-6 py-3 cursor-pointer rounded-full font-semibold flex items-center gap-2 transition duration-300 hover:bg-gray-800">
            Explore Ethiopian Recipes <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="container mx-auto px-4 relative flex flex-col items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <div class="flex justify-center">
            <img :src="spices2" alt="Spices" class="rounded-lg w-full h-full object-cover shadow-lg">
          </div>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:mt-0">
            <div class="flex justify-center">
              <img :src="spices3" alt="Spices" class="rounded-lg w-full h-full object-cover shadow-lg">
            </div>
            <div class="text-center mt-6 text-5xl sm:text-6xl font-serif font-bold relative z-10">
              ETHIOPIAN <br/> 
              <span class="text-[105px] sm:text-[106px] font-serif leading-tight" style="WebkitTextStroke: 1px gray; color: white;">
                SPICES
              </span>
            </div>
            <div class="flex justify-center">
              <img :src="spices4" alt="Spices" class="rounded-lg w-full h-full object-cover shadow-lg">
            </div>
          </div>
          <div class="flex justify-center">
            <img :src="spices1" alt="Spices" class="rounded-lg w-full h-full object-cover shadow-lg">
          </div>
        </div>
      </div>
    </section>
    <section class="bg-gray-100 py-10">
      <div class="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="flex items-center gap-2  space-x-4">
          <i class="fa-solid fa-ranking-star fa-3x"></i>
          <div>
            <h3 class="text-lg font-sans font-semibold">High Quality</h3>
            <p class="text-gray-500 font-sans text-sm">Crafted from top materials</p>
          </div>
        </div>

        <div class="flex items-center font-sans space-x-4">
          <i class="fa-solid fa-award fa-3x"></i>
          <div>
            <h3 class="text-lg font-sans font-semibold">Warranty Protection</h3>
            <p class="text-gray-500 font-sans text-sm">Over 2 years</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <i class="fa-solid fa-box fa-3x"></i>
          <div>
            <h3 class="text-lg font-sans font-semibold">Free Shipping</h3>
            <p class="text-gray-500 font-sans text-sm">Order over 150$</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <i class="fa-solid fa-phone-volume fa-3x"></i>
          <div>
            <h3 class="text-lg font-sans font-semibold">24/7 Support</h3>
            <p class="text-gray-500 font-sans text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
     <div>
    <SpiceShopping />
  </div>
  <div><SpiceCarousel/></div>
  <div>
      <section class="bg-black text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 space-y-4 px-8">
          <a href="#" class="text-sm underline">Learn About Berbere</a>
          <h2 class="text-5xl font-bold">The premier card transcending borders.</h2>
          <p class="text-gray-300 font-sans text-lg">Experience the versatility of a Capital Guard card. Spend freely, anywhere in the world, anytime.</p>
          <ul class="space-y-2 gap-3 text-lg font-sans">
            <li class="flex items-center gap-3 space-x-2">
    <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
        <i class="fa-solid fa-check"></i>
    </span>
    Accepted worldwide.
</li>
<li class="flex items-center gap-3 space-x-4">
    <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
        <i class="fa-solid fa-check fa-2"></i>
    </span>
    Monitor spending.
</li>
<li class="flex items-center gap-3 space-x-2">
    <span class="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
        <i class="fa-solid fa-check"></i>
    </span>
    Zero minimum balance requirement.
</li>
          </ul>
          <button class="bg-white text-black font-sans font-medium px-4 py-2 rounded-4xl">Learn More</button>
        </div>
        <div class="md:w-1/2 h-[560px] flex justify-center mt-6 md:mt-0">
          <img :src="berbereImage" alt="Berbere Spice" class="rounded-lg shadow-lg w-full md:w-auto" />
        </div>
      </section>
  
   
      <section class="bg-white text-black py-12 px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 h-[560px] flex justify-center mb-6 md:mb-0">
          <img :src="flag" alt="Ethiopian Flag" class="rounded-lg shadow-lg w-full md:w-auto" />
        </div>
        <div class="md:w-1/2 space-y-4 px-12">
          <a href="#" class="text-lg underline">Learn About Ethiopia</a>
          <h2 class="text-5xl font-bold">Getting started with Capital Guard is easy</h2>
          <p class="font-sans text-lg font-medium">Begin your financial journey with Capital Guard. Download the app, sign up in minutes, and start managing your money effortlessly. No hassle, just progress.</p>
          <div class="space-y-2">
  <div class="space-y-6">
 <div v-for="(step, index) in steps" :key="index" 
     :class="{'bg-gray-100 text-black': step.expanded, 'bg-white': !step.expanded}" 
     class="p-4 rounded-lg font-sans cursor-pointer flex justify-between items-center" 
     @click="toggleStep(index)">
    <div class="flex items-start">
        <span :class="{'bg-black text-white': step.expanded, 'bg-[#F2F5F6] text-gray-600': !step.expanded}" 
              class="rounded-full w-8 h-8 flex items-center justify-center mr-2" 
              style="min-width: 32px;">
            <strong>{{ index + 1 }}</strong>
        </span>
        <div class="flex flex-col">
            <span class="font-medium">{{ step.title }}</span>
            <p v-if="step.expanded" class="mt-1 text-[#454745]">{{ step.description }}</p>
        </div>
    </div>
    <span>
        <i :class="step.expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
    </span>
</div>
</div>
</div>
        </div>
      </section>
    </div>
  <div><Footer/></div>
  
  </div>
</template>

<script>
import spices1 from '@/assets/img/spiceSpoonRight.png';
import spices2 from '@/assets/img/spiceSpoonleft.png';
import spices3 from '@/assets/img/coffee.png';
import spices4 from '@/assets/img/spiceSpoonBottom.png';
import qualityIcon from '@/assets/img/quality.png';
import warrantyIcon from '@/assets/img/warranty.png';
import shippingIcon from '@/assets/img/shipping.png';
import supportIcon from '@/assets/img/support.png';
import berbereImage from '@/assets/img/berbereImage.png';
import flag from '@/assets/img/flagEth.png';
import SpiceShopping from "@/components/SpiceShopping.vue";
import SpiceCarousel from '@/components/SpiceCarousel.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'EthiopianSpices',
  data() {
    return {
      spices1,
      spices2,
      spices3,
      spices4,
      qualityIcon,
      warrantyIcon,
      shippingIcon,
      supportIcon,
      berbereImage,
      flag,
       steps: [
          { title: "Sign up for your Capital Guard account.", description: "Initiate your registration either online or through the Paymint app. We'll request certain personal details such as your contact information, nationality, and passport.", expanded: false },
          { title: "Enter your transfer details", description: "Provide the necessary banking details and confirm the transaction.", expanded: false },
          { title: "Send funds for your transfer", description: "Complete the payment securely through your preferred method.", expanded: false }
        ]
    };
  },
  methods: {
      toggleStep(index) {
        this.steps[index].expanded = !this.steps[index].expanded;
      }
    },
  
components: {
    SpiceShopping,
    SpiceCarousel,
    Footer,
  },
};
</script>


