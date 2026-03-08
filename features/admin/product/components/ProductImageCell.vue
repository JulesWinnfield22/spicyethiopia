<script setup lang="ts">
import { staticRoute } from '~/utils/utils';

defineProps<{
  row: {
    images: string[] | { name: string; file: File }[];
  };
}>();

function getImageUrl(image: string | { name: string; file: File }): string {
  if (typeof image === 'string') {
    return `${staticRoute}/${image}`;
  } else if (image.file instanceof File) {
    return URL.createObjectURL(image.file);
  }
  return '';
}
</script>

<template>
  <div class="flex -space-x-2 overflow-hidden">
    <template v-if="row.images && row.images.length">
      <img 
        v-for="(image, idx) in row.images.slice(0, 2)" 
        :key="idx"
        :src="getImageUrl(image)"
        class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover"
        :title="`Product image ${idx + 1}`"
      />
      <div 
        v-if="row.images.length > 2" 
        class="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs font-medium"
      >
        +{{ row.images.length - 2 }}
      </div>
    </template>
    <div v-else class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
      <span class="text-gray-400 text-xs">No img</span>
    </div>
  </div>
</template>