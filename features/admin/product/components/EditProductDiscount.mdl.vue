<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import ProductDiscountForm from "~/features/admin/product/form/ProductDiscountForm.vue";
import { useForm } from "~/components/new_form_builder/useForm";
import Button from "~/components/Button.vue";
import { updateProductDiscount } from "../../discount/api/discountApi";
import { appToast } from "~/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { type PropType } from "vue";
import type { Product } from "../../store/productsStore";
import { useProductsStore } from "../../store/productsStore";
import type { Discount } from "../../discount/store/discountsStore";

const props = defineProps({
  data: {
    type: Object as PropType<{ product: Product; discount: Discount }>,
    required: true,
  },
});

const productReq = useApiMutation();
const { submit } = useForm("product-discount-form");
const productsStore = useProductsStore();

function editDiscount({ values }: { values: any }) {
  if (productReq.pending.value) return;

  const discountData = {
    ...props.data.discount,
    ...values,
    productId: props.data.product.id,
  };

  productReq.send(
    () => updateProductDiscount(props.data.product.id, discountData),
    (res) => {
      if (res.success) {
        // Update product with updated discount info
        productsStore.update(props.data.product.id, discountData);
        appToast.success("Product discount updated successfully");
        closeModal();
      } else {
        appToast.error("Failed to update product discount");
      }
    },
  );
}
</script>

<template>
  <FormModalParent title="Edit Product Discount">
    <ProductDiscountForm
      :product="data.product"
      :productDiscount="data.discount"
    />
    <template #bottom>
      <Button
        :pending="productReq.pending.value"
        @click="submit?.(editDiscount)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Update Product Discount
      </Button>
    </template>
  </FormModalParent>
</template>
