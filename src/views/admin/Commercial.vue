<template>
  <AdminDefaultPageWrapper>
    <header>
			<span class="font-medium text-lg mb-4">Banner</span>
		</header>
    <Banner />

    <header>
      <span class="font-medium text-lg">Gallery</span>
    </header>
    <Gallery />

    <DealsOfTheMonth />

    <Ad />

    <Ad2 />
  </AdminDefaultPageWrapper>
</template>

<script lang="ts" setup>
import DealsOfTheMonth from "@/components/DealsOfTheMonth.vue";
import Ad from "@/components/Ad.vue";
import banner from "@/assets/img/banner.png";
import spices1 from "@/assets/img/spiceSpoonRight.png";
import spices2 from "@/assets/img/spiceSpoonLeft.png";
import spices3 from "@/assets/img/coffee.png";
import flag from "@/assets/img/flagEth.png";
import berbereImage from "@/assets/img/berbereImage.png";
import gelila1 from "@/assets/img/gelila1.png";
import gelila2 from "@/assets/img/gelila2.png";
import gelila3 from "@/assets/img/gelila3.png";
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import TextEditable from "@/components/TextEditable.vue";
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Gallery from "@/components/Gallery.vue";
import Ad2 from "@/components/Ad2.vue";
import Banner from "@/components/Banner.vue";
</script>
