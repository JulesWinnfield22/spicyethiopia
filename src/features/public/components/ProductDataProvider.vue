<script setup lang="ts">
import { usePagination } from "@/composables/usePagination";
import { getProducts } from "@/features/admin/api/productApi";
import { useProductsStore } from "@/features/admin/store/productsStore";

const productsStore = useProductsStore();

const pagination = usePagination({
  auto: false,
  store: productsStore,
  cb: getProducts,
});

if (!productsStore.products.length) {
  pagination.send();
}
</script>
<template>
  <slot
    :products="productsStore.products"
    :pending="pagination.pending.value"
		:search="pagination.search"
  />
</template>
