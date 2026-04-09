<script setup lang="ts">
import Button from "~/components/Button.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import { createProduct } from "~/features/admin/api/productApi";
import ProductForm from "~/features/admin/product/form/ProductForm.vue";
import { getFakeProductFormData } from "~/features/admin/product/utils/populateStore";
import {
  useProductsStore,
  type Product,
  type ProductImage,
} from "~/features/admin/store/productsStore";
import { toasted, toFormData } from "~/utils/utils";

const productsStore = useProductsStore();

const productReq = useApiMutation();

const fakeProduct = import.meta.dev ? getFakeProductFormData() : undefined;

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
    },
  );
}
</script>

<template>
  <Teleport to="#admin-actions" defer>
    <Button type="edge"> Email Customer </Button>
  </Teleport>
  <div class="border border-gray rounded p-4">
    <ProductForm
      :product="fakeProduct"
      :onSubmit="addProduc"
      :pending="productReq.pending.value"
    />
  </div>
</template>
<style scoped></style>
