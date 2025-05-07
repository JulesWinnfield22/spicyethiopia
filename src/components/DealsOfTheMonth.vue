<script setup lang="ts">
import TextEditable from './TextEditable.vue';
import spices2 from "@/assets/img/spiceSpoonLeft.png";
import spiceFour from "@/assets/img/spiceFour.png";
import spiceTwo from "@/assets/img/spiceTwo.png";

</script>
<template>
	<section class="rounded-md bg-gray py-4 md:py-12 gap-12">
		<div class="grid grid-cols-2 place-items-center"  >
      <div
        class="w-full max-w-max self-start rounded flex flex-col justify-center"
      >
        <div class="p-2 bg-gray rounded">
          <h2 class="text-4xl font-semibold font-dm-serif">
            <TextEditable id="text-2" text="Deals of The Month" />
          </h2>
        </div>

        <div class="p-2 font-light text-base bg-gray rounded">
          <TextEditable
            id="text-3"
            textarea
            class="max-w-[45ch] font-light text-xs"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin"
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="relative">
          <img
            :src="spices2"
            alt=""
            class="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <div
            class="absolute bottom-1 left-0 w-full flex justify-end p-2 backdrop-blur-2xl"
          >
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
          <div
            class="absolute bottom-2 left-0 w-full flex justify-end p-2 backdrop-blur-2xl"
          >
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
            :src="spiceTwo"s
            alt=""
            class="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <div
            class="absolute bottom-2 left-0 w-full flex justify-end p-2 backdrop-blur-2xl"
          >
            <button
              class="w-24 h-12 bg-black text-white px-4 py-2 cursor-pointer rounded text-sm font-medium"
            >
              Change
            </button>
          </div>
        </div>
      </div>
		</div>
    </section>
</template>