<script setup lang="ts">
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import TextEditable from "@/components/TextEditable.vue";
import icons from "@/utils/icons";
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
          text="Getting started with Capital Guard is easy"
        />
      </h2>
      <TextEditable
        class="text-xs lg:text-base max-w-[55ch]"
        textarea
        :rows="3"
        id="text-11"
        text="Begin your financial journey with Capital Guard. Download the app, sign up in minutes, and start managing your money effortlessly. No hassle, just progress."
      />
      <!-- Steps -->
      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs"
            id="link-text-3"
            text="Sign up for your Capital Guard account."
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-7"
            text="Initiate your registration either online or through the Paymint app. We'll request certain personal details such as your contact information, nationality, and passport"
          />
        </div>
      </div>

      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs"
            id="link-text-4"
            text="Enter your transfer details"
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-8"
            text="Initiate your registration either online or through the Paymint app. We'll request certain personal details such as your contact information, nationality, and passport"
          />
        </div>
      </div>

      <div class="bg-gray p-3 md:p-5 rounded space-y-3">
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            class="text-xs"
            id="link-text-5"
            text="Send funds for your transfer"
          />
        </div>
        <div class="bg-white p-3 md:p-5 rounded">
          <TextEditable
            textarea
            :rows="3"
            id="text-9"
            text="Initiate your registration either online or through the Paymint app. We'll request certain personal details such as your contact information, nationality, and passport"
          />
        </div>
      </div>
    </template>
    <template #right>
      <ImageChangeFileInput
        :outline="$route.path.includes('admin')"
        class="m-auto"
        name="com6"
      />
    </template>
  </AdWrapper>
</template>
