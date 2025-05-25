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
			'bg-[#ADF7AA] text-[#094411]': row?.orderStatus === 'Delivered',
			'bg-yellow-100 text-yellow-800': row?.orderStatus === 'PENDING',
			'bg-[#aad7f7] text-[#093544]': row?.orderStatus === 'Shipped',
			'bg-red-100 text-red-600': row?.orderStatus === 'Refunded',
		}"
		class="px-4 py-2 rounded-lg text-xs font-medium"
	>
		{{ row?.orderStatus }}
	</span>
</template>