<script setup lang="ts">
import { useRoute } from "vue-router";
import ImageChangeFileInput from "./ImageChangeFileInput.vue";
import TextEditable from "./TextEditable.vue";

const route = useRoute();
const edit = route.path.includes("admin");
</script>

<template>
  <section
    :class="[
      edit ? 'max-h-full bg-[#FAF9F6]' : 'mx-auto max-w-[85rem] p-4 md:p-12',
    ]"
    class="gallery-grid gap-4"
  >
    <ImageChangeFileInput class="area-l" name="com1" />
    <ImageChangeFileInput class="area-t" name="com2" />
    <ImageChangeFileInput class="area-b" name="com3" />
    <div
      class="text-center self-center flex justify-center items-center flex-col area-m font-serif font-bold relative z-10"
    >
      <TextEditable
        text="ETHIOPIAN"
        class="text-[15vw] sm:text-5xl lg:text-6xl md:text-4xl"
        id="gallery-text-1"
      />
      <TextEditable
        class="text-[25vw] sm:text-5xl lg:text-8xl font-serif leading-tight"
        style="webkit-text-stroke: 1px gray; color: white"
        text="SPICES"
        id="gallery-text-2"
      />
    </div>
    <ImageChangeFileInput class="area-r" name="com4" />
  </section>
</template>

<style scoped>
.size-small {
  font-size: clamp(30px, 4vw, 76px);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: start;
  grid-template-areas:
    "l t r"
    "l m r"
    "l b r";
}
.area-l {
  grid-area: l;
  width: 100%;
  height: auto;
}
.area-t {
  grid-area: t;
  width: 100%;
  height: auto;
}
.area-m {
  grid-area: m;
}
.area-b {
  grid-area: b;
  width: 100%;
  height: auto;
}
.area-r {
  grid-area: r;
  width: 100%;
  height: auto;
}

@media (width < 646px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, max-content);
    align-items: center;
    justify-content: start;
    grid-template-areas:
      "l l"
      "t t"
      "m m"
      "b b";
  }

  .area-l,
  .area-r {
    display: none;
  }
}
</style>
