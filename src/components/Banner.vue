<script setup lang="ts">
import ImageChangeFileInput from './ImageChangeFileInput.vue';

</script>

<template>
	 <section>
		<ImageChangeFileInput :outline="$route.path.includes('admin')" height="30rem" name="banner" />
	</section>
</template>