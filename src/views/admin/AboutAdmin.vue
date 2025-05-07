<template>
  <AdminDefaultPageWrapper>
    <AboutInfo />
    <OwnerInfo />    
  </AdminDefaultPageWrapper>
</template>

<script setup lang="ts">
import gelila1 from "@/assets/img/gelila1.png";
import gelila2 from "@/assets/img/gelila2.png";
import gelila3 from "@/assets/img/gelila3.png";
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import AboutInfo from "@/components/new_form_elements/AboutInfo.vue";
import OwnerInfo from "@/components/OwnerInfo.vue";
import TextEditable from "@/components/TextEditable.vue";
</script>
