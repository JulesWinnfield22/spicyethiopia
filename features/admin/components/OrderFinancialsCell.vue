<script setup lang="ts">
import { currencyFormat } from "~/utils/utils";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 py-1">
    <span class="text-sm font-bold text-gray-900">
      {{ currencyFormat(row.total) }}
    </span>
    <div class="flex items-center gap-1.5 flex-wrap">
      <span
        class="text-[10px] font-medium text-gray-500 uppercase tracking-tighter"
      >
        {{ row.paymentInfo?.paymentMethod?.replace("_", " ") || "STRIPE" }}
      </span>
      <span
        class="px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
        :class="{
          'bg-green-100 text-green-700': row.paymentStatus === 'PAID',
          'bg-yellow-100 text-yellow-700': row.paymentStatus === 'PENDING',
          'bg-red-100 text-red-700': row.paymentStatus === 'FAILED',
          'bg-orange-100 text-orange-700': row.paymentStatus === 'REFUNDED',
        }"
      >
        {{ row.paymentStatus || "PENDING" }}
      </span>
    </div>
  </div>
</template>
