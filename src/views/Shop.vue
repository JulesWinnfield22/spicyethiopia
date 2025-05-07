<script setup lang="ts" scoped>
import spiceOne from "@/assets/img/spiceOne.png";
import spiceTwo from "@/assets/img/spiceTwo.png";
import spiceThree from "@/assets/img/spiceThree.png";
import spiceFour from "@/assets/img/spiceFour.png";
import spiceFive from "@/assets/img/spiceFive.png";
import spiceSix from "@/assets/img/spiceSix.png";
import spiceSeven from "@/assets/img/spiceSeven.png";
import spiceEight from "@/assets/img/spiceEight.png";
import spiceNine from "@/assets/img/spiceNine.png";
import spiceTen from "@/assets/img/spiceTen.png";
import spiceEleven from "@/assets/img/spiceEleven.png";
import spiceTwelve from "@/assets/img/spiceTwelve.png";
import banner from "@/assets/img/banner.png";
import SpiceShopping from "@/components/SpiceShopping.vue";
import { staticRoute } from "@/utils/utils";
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import Banner from "@/components/Banner.vue";
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- <section class="bg-dark text-white relative">
      <div class="z-10 absolute gap-4 sm:gap-0 font-semibold inset-0 p-6 sm:p-16 md:py-24 flex flex-col justify-end" >
        <span class="header-size font-dm-serif" >THE SPICES OF LIFE.</span>
        <div class="header-description flex flex-col" >
          <span class="font-normal" >Original Ethiopian Spices to experience life in full. </span>
          <span class="font-normal" >UP to 80% OFF. </span>
        </div>
      </div>
      <div>
        <ImageChangeFileInput 
          :outline="$route.path.includes('admin')"
          height="30rem" name="banner" 
        />
      </div>
    </section> -->
    <Banner />
    <SpiceShopping searching :show-header="false" />
  </div>
</template>
