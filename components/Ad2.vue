<script setup lang="ts">
import ImageChangeFileInput from "~/components/ImageChangeFileInput.vue";
import TextEditable from "~/components/TextEditable.vue";
import icons from "~/utils/icons";
import AdWrapper from "./AdWrapper.vue";
</script>
<template>
  <AdWrapper class="" switch-right>
    <template #left>
      <a href="#" class="text-xs lg:text-base underline underline-offset-4">
        <TextEditable id="link-text-2" text="Learn About Ethiopia" />
      </a>
      <h2
        class="text-2xl lg:text-5xl max-w-[30ch] font-dm-serif font-semibold leading-tight"
      >
        <TextEditable
          textarea
          :rows="2"
          id="text-12"
          text="Authentic flavors, straight to your kitchen"
        />
      </h2>
      <TextEditable
        class="text-xs lg:text-base max-w-[55ch]"
        textarea
        :rows="3"
        id="text-11"
        text="Experience the true essence of Ethiopian cuisine. From the vibrant markets of Addis Ababa to your doorstep, we bring you the finest, most aromatic spices."
      />
      <!-- Steps -->
      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs font-bold"
            id="link-text-3"
            text="01. Browse our unique collections"
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-7"
            text="Explore our wide range of organic spices, from the fiery Mitmita to the savory Shiro. Each blend is crafted with care using traditional methods."
          />
        </div>
      </div>

      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs font-bold"
            id="link-text-4"
            text="02. Select your favorite blends"
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-8"
            text="Choose the spices that inspire you. Whether you're a seasoned chef or a home cook, our spices will elevate every dish you create."
          />
        </div>
      </div>

      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs font-bold"
            id="link-text-5"
            text="03. Enjoy fast, reliable delivery"
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-9"
            text="We deliver straight to your door, ensuring your spices arrive fresh and full of flavor. Experience the taste of Ethiopia in no time."
          />
        </div>
      </div>
    </template>
    <template #right>
      <ImageChangeFileInput
        height="100%"
        :outline="$route.path.includes('admin')"
        class="w-full h-full min-h-[400px] lg:min-h-[600px] rounded-3xl object-cover shadow-2xl"
        name="com6"
      />
    </template>
  </AdWrapper>
</template>
