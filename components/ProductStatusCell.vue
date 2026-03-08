<script setup lang="ts">
defineProps<{
  row: Object;
}>();

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-[#ADF7AA] text-[#094411]";
    case "Hidden":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<template>
  <span
    class="px-3 py-2 rounded-lg text-xs font-medium"
    :class="getStatusColor(row?.status)"
  >
    {{ row?.status }}
  </span>
</template>
