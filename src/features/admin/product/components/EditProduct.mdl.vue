<script setup lang="ts">
import FormModalParent from "@/components/FormModalParent.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import ProductForm from "@/features/admin/product/form/ProductForm.vue";
import { useForm } from "@/components/new_form_builder/useForm";
import Button from "@/components/Button.vue";
import type { Product } from "../../store/productsStore";
import { updateProduct } from "../../api/productApi";
import { useProductsStore } from "../../store/productsStore";
import { toast } from "@/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    required: true
  }
});

const productReq = useApiRequest();
const { submit } = useForm("product-form");

const productsStore = useProductsStore();

function editProduct({ values }: { values: Product }) {
  if (productReq.pending.value) return;

  const productData = {
    ...props.data,
    ...values,
  };

  productReq.send(
    () => updateProduct(productData.id, productData),
    (res) => {
      if (res.success) {
        productsStore.update(productData.id, res.data || productData);
        toast.success("Product updated successfully");
        closeModal();
      } else {
        toast.error("Failed to update product");
      }
    }
  );
}
</script>

<template>
  <FormModalParent title="Edit Product">
    <ProductForm :product="data" />
    <template #bottom>
      <Button
        :pending="productReq.pending.value"
        @click="submit?.(editProduct)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Update Product
      </Button>
    </template>
  </FormModalParent>
</template>
