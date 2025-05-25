<script setup lang="ts">
import FormModalParent from "@/components/FormModalParent.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import DiscountForm from "@/features/admin/discount/form/DiscountForm.vue";
import { useForm } from "@/components/new_form_builder/useForm";
import Button from "@/components/Button.vue";
import type { Discount } from "../store/discountsStore";
import { createDiscount } from "../api/discountApi";
import { useDiscountsStore } from "../store/discountsStore";
import { toast, toasted } from "@/utils/utils";
import { closeModal } from "@customizer/modal-x";

const discountReq = useApiRequest();
const { submit } = useForm("discount-form");

const discountsStore = useDiscountsStore();

function addDiscount({ values }: { values: Discount }) {
  if (discountReq.pending.value) return;

  // Generate a unique ID for the discount
  const discountData = {
    ...values,
    id: crypto.randomUUID(),
  };

  
  discountReq.send(
    () => createDiscount(discountData),
    (res) => {
      if (res.success) {
        discountsStore.add(res.data || discountData);
        toasted(res.success, "Discount added successfully", res.error);
        closeModal();
      } else {
        toasted(res.success, "Failed to add discount", res.error);
      }
    }
  );
}
</script>

<template>
  <FormModalParent title="Add Discount">
    <DiscountForm />
    <template #bottom>
      <Button
        :pending="discountReq.pending.value"
        @click="submit?.(addDiscount)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Add Discount
      </Button>
    </template>
  </FormModalParent>
</template>