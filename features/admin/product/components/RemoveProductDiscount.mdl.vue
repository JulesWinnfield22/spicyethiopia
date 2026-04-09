<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import Button from "~/components/Button.vue";
import { removeProductDiscount } from "../../discount/api/discountApi";
import { toasted } from "~/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { type PropType } from "vue";
import type { Product } from "../../store/productsStore";
import { useProductsStore } from "../../store/productsStore";
import type { Discount } from "../../discount/store/discountsStore";

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const productReq = useApiMutation();
const productsStore = useProductsStore();

function removeDiscount() {
  if (productReq.pending.value) return;

  productReq.send(
    () => removeProductDiscount(props.data.id),
    (res) => {
      if (res.success) {
        // Update product to remove discount info
        productsStore.update(props.data.id, { ...props.data, ...res.data });
        toasted(
          res.success,
          "Product discount removed successfully",
          res.error,
        );
        closeModal();
      } else {
        toasted(res.success, "Failed to remove product discount", res.error);
      }
    },
  );
}
</script>

<template>
  <FormModalParent size="sm" title="Remove Product Discount">
    <div class="p-4 text-center">
      <p class="mb-4">
        Are you sure you want to remove the discount for this product?
      </p>
      <p class="mb-4 font-semibold">{{ data?.title }}</p>
      <p class="mb-4">
        Current discount:
        <span class="font-semibold">{{ data?.discountPercentage }}%</span>
      </p>
      <p class="text-sm text-gray-500 italic">
        This will revert the product to use the global discount if available.
        and remove if they are the same.
      </p>
    </div>
    <template #bottom>
      <div class="flex gap-4">
        <Button
          :pending="false"
          @click="closeModal"
          size="md"
          type="edge"
          class="w-full"
        >
          Cancel
        </Button>
        <Button
          :pending="productReq.pending.value"
          @click="removeDiscount"
          size="md"
          class="w-full"
        >
          Remove Discount
        </Button>
      </div>
    </template>
  </FormModalParent>
</template>
