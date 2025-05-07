<script setup lang="ts">
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Button from "@/components/Button.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import { createProduct, getProductById, updateProduct } from "@/features/admin/api/productApi";
import ProductForm from "@/features/admin/product/form/ProductForm.vue";
import { getFakeProductFormData } from "@/features/admin/product/utils/populateStore";
import {
  useProductsStore,
  type Product,
  type ProductImage,
} from "@/features/admin/store/productsStore";
import icons from "@/utils/icons";
import { toasted } from "@/utils/utils";
import { ref } from "vue";
import { useRoute } from "vue-router";

const productsStore = useProductsStore();
const route = useRoute();

const productId = route.params.productId;

const product = ref<Product>();

let found = productsStore.products.find((el) => el.id == productId);

if (found) {
  product.value = found;
}

const getProductReq = useApiRequest();
if (!found && productId) {
  getProductReq.send(
    () => getProductById(productId as string),
    (res) => {
      if (res.success) {
        product.value = res.data;
      } else {
        toasted(false, "", res.error);
      }
    }
  );
}
const productReq = useApiRequest();

function editProduct(values: Product) {
  if (productReq.pending.value || product.value?.id == undefined) return;

  const fd = new FormData();

  Object.keys(values).forEach((el: any) => {
    if (el == "images") {
      (values.images as ProductImage[]).forEach((image) => {
        fd.append(el, image.file);
      });
    } else {
      fd.append(el, values[el]);
    }
  });

  productReq.send(
    () => updateProduct(product.value.id as string, fd),
    (res) => {
      if (res.success) {
        productsStore.update(product.value.id, {...product.value, ...res.data});
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
      <div v-if="(!getProductReq.pending.value && product)" class="border border-gray rounded p-4">
        <ProductForm :product="product" :onSubmit="editProduct" />
      </div>
      <div v-else-if="getProductReq.pending.value" class="h-full grid place-items-center">
        <i class="*:size-12" v-html="icons.spinner" />
      </div>
    </template>
  </AdminDefaultPageWrapper>
</template>
<style scoped></style>
