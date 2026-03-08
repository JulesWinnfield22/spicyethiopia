<script setup lang="ts">
import { usePagination } from "~/composables/usePagination";
import { getProducts } from "~/features/admin/api/productApi";
import { useProductsStore } from "~/features/admin/store/productsStore";

const productsStore = useProductsStore();

const pagination = usePagination({
  auto: false,
  store: productsStore,
  cb: getProducts,
});

const { data, pending } = await useAsyncData("products-list", async () => {
  if (productsStore.products.length > 0) return productsStore.products;
  const res = await getProducts({ page: 1, limit: 25 });
  if (res.success) {
    const responseData: any = res.data;
    const data = responseData?.response || [];
    productsStore.set(data);
    return data;
  }
  return [];
});
</script>
<template>
  <slot
    :products="productsStore.products"
    :pending="pending"
    :search="pagination.search"
  />
</template>
