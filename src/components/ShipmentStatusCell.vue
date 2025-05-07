<script setup lang="ts" >
	const props = defineProps({
		row: {
			type: Object,
			required: true
		}
	})
</script>
<template>
	<span
		:class="{
			'bg-[#ADF7AA] text-[#094411]': row?.status === 'Delivered',
			'bg-yellow-100 text-yellow-800': row?.status === 'Waiting',
			'bg-[#aad7f7] text-[#093544]': row?.status === 'Shipped',
			'bg-red-100 text-red-600': row?.status === 'Refunded',
		}"
		class="px-4 py-2 rounded-lg text-xs font-medium"
	>
		{{ row?.status }}
	</span>
</template>