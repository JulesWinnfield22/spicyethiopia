<script setup lang="ts">
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import TextEditable from "@/components/TextEditable.vue";
import icons from "@/utils/icons";
import AdWrapper from "./AdWrapper.vue";
</script>
<template  >
  <AdWrapper class="bg-dark text-white" switch-left>
    <template #left>
      <a href="#" class="text-xs lg:text-base underline underline-offset-4">
        <TextEditable id="link-text-1" text="Learn About Berbere" />
      </a>
      <h2
        class="text-2xl lg:text-5xl max-w-[25ch] font-dm-serif font-semibold leading-tight"
      >
        <TextEditable
          textarea
          :rows="2"
          id="text-5"
          text="The premier card transcending borders."
        />
      </h2>
      <TextEditable
        class="text-xs lg:text-base max-w-[55ch]"
        textarea
        :rows="2"
        id="text-11"
        text="Experience the versatility of a Capital Guard card. Spend freely, anywhere in the world, anytime."
      />
      <ul class="space-y-3 text-sm lg:text-base">
        <li class="flex items-center gap-3">
          <span
            class="bg-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i v-html="icons.check"></i>
          </span>
          Accepted worldwide.
        </li>
        <li class="flex items-center gap-3">
          <span
            class="bg-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i v-html="icons.check"></i>
          </span>
          Monitor spending.
        </li>
        <li class="flex items-center gap-3">
          <span
            class="bg-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <i v-html="icons.check"></i>
          </span>
          Zero minimum balance requirement.
        </li>
      </ul>
    </template>
    <template #right>
      <ImageChangeFileInput
        :outline="$route.path.includes('admin')"
        name="com5"
      />
    </template>
  </AdWrapper>
</template>
