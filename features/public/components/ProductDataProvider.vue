<script setup lang="ts">
import { usePagination } from "~/composables/usePagination";
import { getProducts } from "~/features/admin/api/productApi";
import type { Product } from "~/features/admin/store/productsStore";

const props = defineProps<{
  status?: string;
}>();

const pagination = usePagination({
  auto: true,
  cb: (query: any) =>
    getProducts({
      ...query,
      status: props.status !== "ALL" ? props.status : undefined,
    }),
  watch: [() => props.status],
});
</script>
<template>
  <slot
    :products="pagination.data.value as any as Product[]"
    :pending="pagination.pending.value"
    :search="pagination.search"
  />
</template>
