<script setup>

const props = defineProps({
	index: {
		type: Number,
		required: true
	},
  page: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 25,
  },
});

</script>
<template>
  <span class="text-center font-medium grid place-items-center" >
    {{ (page > 0 ? page - 1 : 0) * perPage + (index + 1) }}
  </span>
</template>
