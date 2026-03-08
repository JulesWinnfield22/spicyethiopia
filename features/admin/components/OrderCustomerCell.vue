<script setup lang="ts">
import { phoneFormat } from "~/utils/utils";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-0.5 py-1">
    <span class="font-semibold text-gray-900 leading-tight">
      {{ row.customerInfo?.fullName || "Guest" }}
    </span>
    <span class="text-xs text-gray-500 whitespace-nowrap">
      {{ phoneFormat(row.customerInfo?.phoneNumber) }}
    </span>
    <span class="text-[10px] text-gray-400 italic">
      {{ row.customerInfo?.email }}
    </span>
  </div>
</template>
