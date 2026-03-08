<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import DiscountForm from "~/features/admin/discount/form/DiscountForm.vue";
import { useForm } from "~/components/new_form_builder/useForm";
import Button from "~/components/Button.vue";
import type { Discount } from "../store/discountsStore";
import { updateDiscount } from "../api/discountApi";
import { useDiscountsStore } from "../store/discountsStore";
import { appToast } from "~/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { type PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<Discount>,
    required: true,
  },
});

const discountReq = useApiRequest();
const { submit } = useForm("discount-form");

const discountsStore = useDiscountsStore();

function editDiscount({ values }: { values: Discount }) {
  if (discountReq.pending.value) return;

  const discountData = {
    ...props.data,
    ...values,
  };

  discountReq.send(
    () => updateDiscount(discountData.id, discountData),
    (res) => {
      if (res.success) {
        discountsStore.update(discountData.id, res.data || discountData);
        appToast.success("Discount updated successfully");
        closeModal();
      } else {
        appToast.error("Failed to update discount");
      }
    },
  );
}
</script>

<template>
  <FormModalParent title="Edit Discount">
    <DiscountForm :discount="data" />
    <template #bottom>
      <Button
        :pending="discountReq.pending.value"
        @click="submit?.(editDiscount)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Update Discount
      </Button>
    </template>
  </FormModalParent>
</template>
