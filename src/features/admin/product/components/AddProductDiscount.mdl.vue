<script setup lang="ts">
import FormModalParent from "@/components/FormModalParent.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import ProductDiscountForm from "@/features/admin/product/form/ProductDiscountForm.vue";
import { useForm } from "@/components/new_form_builder/useForm";
import Button from "@/components/Button.vue";
import { addProductDiscount } from "../../discount/api/discountApi";
import { toast } from "@/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { type PropType } from "vue";
import type { Product } from "../../store/productsStore";
import { useProductsStore } from "../../store/productsStore";

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const productReq = useApiRequest();
const { submit } = useForm("product-discount-form");
const productsStore = useProductsStore();

function addDiscount({ values }: { values: any }) {
  if (productReq.pending.value) return;

  const discountData = {
    ...values,
    id: crypto.randomUUID(),
    productId: props.data.id,
  };

  productReq.send(
    () => addProductDiscount(props.data.id, discountData),
    (res) => {
      if (res.success) {
        // Update product with discount info
        productsStore.update(props.data.id, {
          ...discountData,
          ...res.data
        });
        toast.success("Product discount added successfully");
        closeModal();
      } else {
        toast.error("Failed to add product discount");
      }
    }
  );
}
</script>

<template>
  <FormModalParent :title="`Add Product Discount for ${data.title}`">
    <ProductDiscountForm :product="data" />
    <template #bottom>
      <Button
        :pending="productReq.pending.value"
        @click="submit?.(addDiscount)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Add Product Discount
      </Button>
    </template>
  </FormModalParent>
</template>
