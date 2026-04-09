<script setup lang="ts">
import icons from "~/utils/icons";
import TotalPrice from "./TotalPrice.vue";
import Button from "~/components/Button.vue";
import { openModal } from "@customizer/modal-x";
import { genCheckOutUrl } from "../api/orderApi";
import { useApiMutation } from "~/composables/useApiMutation";
import { useCartStore } from "~/stores/cartStore";
import { toasted } from "~/utils/utils";

const props = defineProps({
  goTo: {
    type: Function,
    required: true,
  },
});

const store = useCartStore();
const req = useApiMutation();

function order() {
  const orderData = {
    orderItems: store.items,
    customerInfo: store.info.customerInfo,
    shippingAddress: store.info.shippingAddress,
  };

  const savedOrderId = localStorage.getItem("pending_order_id");
  const savedOrderData = localStorage.getItem("pending_order_data");

  let orderIdToUse: string | undefined = undefined;

  if (savedOrderId && savedOrderData === JSON.stringify(orderData)) {
    orderIdToUse = savedOrderId;
  } else {
    localStorage.removeItem("pending_order_id");
    localStorage.removeItem("pending_order_data");
  }

  openModal("Confirmation", {}, (res) => {
    if (res) {
      req.send(
        () => genCheckOutUrl(orderData, orderIdToUse),
        (res: any) => {
          console.log("response", res);

          if (res.success) {
            const returnedOrderId = res.data.response.data.orderId;
            localStorage.setItem("pending_order_id", returnedOrderId);
            localStorage.setItem(
              "pending_order_data",
              JSON.stringify(orderData),
            );
            location.href = res.data.response.stripe.url;
          }

          toasted(res.success, "Order Is Pending", res.error);
        },
      );
    }
  });
}

function canGoNext() {
  return true;
}

defineExpose({
  canGoNext,
});
</script>

<template>
  <div class="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-2 flex flex-col gap-4">
      <div class="border border-gray-2 rounded-md flex flex-col gap-2">
        <div
          class="flex pb-2 justify-between items-center border-b border-gray-2 p-4 rounded-lg"
        >
          <p class="text-base">Delivery Address</p>
          <span
            @click="goTo('Shipping Information')"
            class="cursor-pointer underline"
            >Change</span
          >
        </div>
        <div class="flex items-start gap-4 px-2">
          <div class="self-start size-6 grid place-items-center">
            <i v-html="icons.location1" />
          </div>
          <div class="flex flex-col">
            <span class="text-base">Home</span>
            <span class="">
              {{ store.info.shippingAddress?.streetAddress }}
              {{ store.info.shippingAddress?.apartment }}
              {{ store.info.shippingAddress?.city }}
              {{ store.info.shippingAddress?.postalCode }}
              {{ store.info.shippingAddress?.province }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <TotalPrice>
      <Button
        :pending="req.pending.value"
        @click="order"
        class="px-8 flex gap-4 rounded-full"
        size="md"
        type="secondary"
      >
        Checkout <i v-html="icons.rightArrow" />
      </Button>
    </TotalPrice>
  </div>
</template>
