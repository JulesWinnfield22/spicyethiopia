<template>
  <div class="mx-auto">
    <AboutInfo />
    <OwnerInfo />
  </div>
</template>

<script setup>
definePageMeta({ title: "About Us" });
useSeoMeta({
  title: "About Us | The Spicy Ethiopian",
  description:
    "Learn about The Spicy Ethiopian — our mission to bring authentic, premium Ethiopian spices from the vibrant markets of Addis Ababa to your kitchen.",
  ogTitle: "About Us | The Spicy Ethiopian",
  ogDescription:
    "Our mission is to bring authentic Ethiopian spices from Addis Ababa to your kitchen.",
});
import packageGroup from "~/assets/img/packageGroup.png";
import gelila1 from "~/assets/img/gelila1.png";
import gelila2 from "~/assets/img/gelila2.png";
import gelila3 from "~/assets/img/gelila3.png";
import AboutInfo from "~/components/new_form_elements/AboutInfo.vue";
import OwnerInfo from "~/components/OwnerInfo.vue";
</script>
