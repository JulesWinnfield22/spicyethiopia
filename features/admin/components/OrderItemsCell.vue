<script setup lang="ts">
import { staticRoute } from "~/utils/utils";
import { computed } from "vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
});

const itemsCount = computed(() => props.row.orderItems?.length || 0);
const firstItem = computed(() => props.row.orderItems?.[0] || {});
const totalQuantity = computed(
  () =>
    props.row.orderItems?.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0,
    ) || 0,
);
</script>

<template>
  <div class="flex flex-col gap-1 py-1 max-w-[200px]">
    <div class="flex items-center gap-1.5 overflow-hidden">
      <img
        :src="`${staticRoute}/${firstItem.image}`"
        class="w-6 h-6 rounded object-cover flex-shrink-0"
        v-if="firstItem.image"
      />
      <span class="text-xs font-medium text-gray-800 truncate">
        {{ firstItem.title || "No Title" }}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <span
        class="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold"
      >
        {{ totalQuantity }} {{ totalQuantity === 1 ? "item" : "items" }}
      </span>
      <span v-if="itemsCount > 1" class="text-[10px] text-gray-400">
        +{{ itemsCount - 1 }} more products
      </span>
    </div>
  </div>
</template>
