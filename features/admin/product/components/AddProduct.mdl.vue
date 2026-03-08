<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import ProductForm from "~/features/admin/product/form/ProductForm.vue";
import { useForm } from "~/components/new_form_builder/useForm";
import Button from "~/components/Button.vue";
import type { Product } from "../../store/productsStore";
import { createProduct } from "../../api/productApi";
import { useProductsStore } from "../../store/productsStore";
import { appToast } from "~/utils/utils";
import { closeModal } from "@customizer/modal-x";

const productReq = useApiRequest();
const { submit } = useForm("product-form");

const productsStore = useProductsStore();

function addProduct({ values }: { values: Product }) {
  if (productReq.pending.value) return;

  // Generate a unique ID for the product
  const productData = {
    ...values,
    id: crypto.randomUUID(),
  };

  productReq.send(
    () => createProduct(productData),
    (res) => {
      if (res.success) {
        productsStore.add(res.data || productData);
        appToast.success("Product added successfully");
        closeModal();
      } else {
        appToast.error("Failed to add product");
      }
    },
  );
}
</script>

<template>
  <FormModalParent title="Add Product">
    <ProductForm />
    <template #bottom>
      <Button
        :pending="productReq.pending.value"
        @click="submit?.(addProduct)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Add Product
      </Button>
    </template>
  </FormModalParent>
</template>
