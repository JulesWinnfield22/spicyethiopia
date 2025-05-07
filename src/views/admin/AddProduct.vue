<script setup lang="ts">
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Button from "@/components/Button.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import { createProduct } from "@/features/admin/api/productApi";
import ProductForm from "@/features/admin/product/form/ProductForm.vue";
import { getFakeProductFormData } from "@/features/admin/product/utils/populateStore";
import {
  useProductsStore,
  type Product,
  type ProductImage,
} from "@/features/admin/store/productsStore";
import { toasted, toFormData } from "@/utils/utils";

const productsStore = useProductsStore();

const productReq = useApiRequest();

function addProduc(values: Product) {
  if (productReq.pending.value) return;

  const fd = toFormData(values, ["ingredients", "instructions"]);

  values.images.forEach((image) => {
    fd.append("images", (image as ProductImage).file);
  });

  productReq.send(
    () => createProduct(fd),
    (res) => {
      if (res.success) {
        productsStore.add(res.data);
      }
      toasted(res.success, "Successfully Created", res.error);
    }
  );
}
</script>

<template>
  <AdminDefaultPageWrapper>
    <template #actions>
      <Button type="edge"> Email Customer </Button>
    </template>
    <template #default>
      <div class="border border-gray rounded p-4">
        <ProductForm
          :product="getFakeProductFormData()"
          :onSubmit="addProduc"
        />
      </div>
    </template>
  </AdminDefaultPageWrapper>
</template>
<style scoped></style>
