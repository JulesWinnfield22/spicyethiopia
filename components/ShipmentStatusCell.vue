<script setup lang="ts">
const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <span
    :class="{
      'bg-[#ADF7AA] text-[#094411]': row?.orderStatus === 'DELIVERED',
      'bg-yellow-100 text-yellow-800': row?.orderStatus === 'PENDING',
      'bg-blue-100 text-blue-800': row?.orderStatus === 'PROCESSING',
      'bg-[#aad7f7] text-[#093544]': row?.orderStatus === 'SHIPPED',
      'bg-red-100 text-red-600': row?.orderStatus === 'CANCELLED',
      'bg-orange-100 text-orange-600': row?.orderStatus === 'REFUNDED',
    }"
    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
  >
    {{ row?.orderStatus }}
  </span>
</template>
