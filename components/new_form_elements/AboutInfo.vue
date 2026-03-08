<script setup lang="ts">
import ImageChangeFileInput from "../ImageChangeFileInput.vue";
import TextEditable from "../TextEditable.vue";
</script>

<template>
  <section class="container mx-auto p-4 md:p-12 grid md:grid-cols-2 gap-12">
    <div class="md:max-w-[50ch] flex flex-col gap-4 pt-12 md:pt-0 md:m-auto">
      <div class="flex items-center">
        <h2 class="header-size font-dm-serif font-semibold">
          <TextEditable id="about-head" text="About" />
        </h2>
      </div>
      <hr class="border-t-2 border-black/40" />
      <p class="md:text-lg text-[rgb(118_118_118)] mt-4">
        <TextEditable
          textarea
          :rows="5"
          id="about-text-1"
          text="Based in Toronto, Ontario, The Spicy Ethiopian is your trusted source for authentic Ethiopian spices online in Canada. We specialize in premium, organic spice blends like Berbere, Mitmita, and Shiro powder, crafted with traditional recipes and delivered fresh to your door."
        />
      </p>
      <p class="md:text-lg text-[rgb(118_118_118)] mt-4">
        <TextEditable
          textarea
          :rows="5"
          id="about-text-2"
          text="Our online shop makes it easy for Canadians to experience the bold, rich flavors of Ethiopian cuisine — whether you're in Toronto, Ottawa, Vancouver, or anywhere across Canada. Every product is carefully sourced and hand-packed to preserve freshness, flavor, and authenticity."
        />
      </p>
    </div>
    <div class="flex flex-col justify-center">
      <ImageChangeFileInput
        :outline="$route.path.includes('admin')"
        name="about"
      />
    </div>
  </section>
</template>
