<script setup lang="ts">
defineProps<{
  row: Object;
}>();

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "SUSPENDED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
</script>

<template>
  <div
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="getStatusColor(row?.status)"
  >
    <span class="w-1.5 h-1.5 mr-1.5 rounded-full" :class="getStatusColor(row?.status).replace('bg-', 'bg-').replace('text-', 'bg-')"></span>
    {{ row?.status }}
  </div>
</template>
