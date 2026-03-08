<script setup lang="ts">
import ImageChangeFileInput from "./ImageChangeFileInput.vue";
import TextEditable from "./TextEditable.vue";
</script>

<template>
  <section
    class="w-[99.3vw] bg-dark p-4 md:12 lg:p-20 grid md:grid-cols-2 gap-10"
  >
    <div
      class="sm:min-w-[29rem] gap-2 sm:min-h-[26rem] grid grid-rows-2 grid-cols-2"
    >
      <ImageChangeFileInput
        :outline="$route.path.includes('admin')"
        name="about-gallery-1"
      />
      <div class="row-span-2 my-auto">
        <ImageChangeFileInput
          :outline="$route.path.includes('admin')"
          name="about-gallery-3"
        />
      </div>
      <ImageChangeFileInput
        :outline="$route.path.includes('admin')"
        name="about-gallery-2"
      />
    </div>
    <div
      class="flex py-8 sm:py-0 bg-dark sm:backdrop-blur-3xl flex-col md:mx-auto justify-center gap-2 md:gap-4 text-white"
    >
      <h2
        class="text-2xl flex md:text-5xl items-center font-bold px-2 rounded-md"
      >
        <img class="absolute" src="~/assets/img/gelilaFlower.png" />
        <TextEditable
          class="truncate flex-1 h-10 items-center flex ml-12 backdrop-blur-3xl px-2"
          id="about-head"
          text="Gelila Belete"
        />
      </h2>
      <h3 class="p-2 rounded-md md:font-normal text-base md:text-2xl font-bold">
        <TextEditable
          id="about-text-7"
          text="The Owner of The Spicy Ethiopian"
        />
      </h3>
      <p class="p-2 md:text-base md:max-w-[50ch]">
        <TextEditable
          textarea
          :rows="5"
          id="about-text-3"
          text="The Spicy Ethiopian started as a food truck in Toronto, where Gelila’s passion for authentic Ethiopian food quickly gained a loyal following. Now, she brings her signature flavors to a full-service Ethiopian restaurant, serving up traditional dishes that capture the essence of Ethiopian culture."
        />
      </p>
      <p class="p-2 md:text-base md:max-w-[50ch]">
        <TextEditable
          textarea
          :rows="4"
          id="about-text-4"
          text="Whether you’re looking for a casual dining experience, catering for an event, or Ethiopian food delivery, Gelila and her team are here to bring you the best Ethiopian food in Toronto."
        />
      </p>
    </div>
  </section>
</template>
