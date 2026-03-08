<script setup lang="ts">
import Button from "~/components/Button.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "~/features/admin/api/productApi";
import ProductForm from "~/features/admin/product/form/ProductForm.vue";
import { getFakeProductFormData } from "~/features/admin/product/utils/populateStore";
import {
  useProductsStore,
  type Product,
  type ProductImage,
} from "~/features/admin/store/productsStore";
import icons from "~/utils/icons";
import { toasted, toFormData } from "~/utils/utils";
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
    },
  );
}
const productReq = useApiRequest();

function editProduct(values: Product) {
  if (productReq.pending.value || product.value?.id == undefined) return;

  const fd = toFormData(values, ["ingredients", "instructions"]);

  values.images.forEach((image) => {
    fd.append("images", (image as ProductImage).file);
  });

  productReq.send(
    () => updateProduct(product.value.id as string, fd),
    (res) => {
      if (res.success) {
        productsStore.update(product.value.id, {
          ...product.value,
          ...res.data,
        });
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
  <div
    v-if="!getProductReq.pending.value && product"
    class="border border-gray rounded p-4"
  >
    <ProductForm
      :product="product"
      :onSubmit="editProduct"
      :pending="productReq.pending.value"
    />
  </div>
  <div
    v-else-if="getProductReq.pending.value"
    class="h-full grid place-items-center"
  >
    <i class="*:size-12" v-html="icons.spinner" />
  </div>
</template>
<style scoped></style>
