<script setup lang="ts">
import { useCartStore } from "~/stores/cartStore";

const cartStore = useCartStore();
</script>
<template>
  <div class="bg-white flex flex-col gap-6 shadow-2xl p-4">
    <div class="col-span-2 flex justify-between items-center">
      <span class="font-bold text-lg">Total Price</span>
    </div>
    <div class="flex flex-col gap-2 pb-4 border-b border-gray">
      <div class="opacity-60 flex items-center justify-between">
        <span class="text-base"> Sub-total </span>
        <span class="text-base">
          ${{
            cartStore.items
              .reduce((sum: number, el) => (sum += el.price * el.quantity), 0)
              .toFixed(2)
          }}
        </span>
      </div>
      <div class="opacity-60 flex items-center justify-between">
        <span class="text-base"> VAT (%) </span>
        <span class="text-base"> $0.00 </span>
      </div>
      <div class="opacity-60 flex items-center justify-between">
        <span class="text-base">Shipping fee </span>
        <span class="text-base"> $2.00 </span>
      </div>
    </div>
    <div class="text-xl font-bold flex items-center justify-between">
      <span class=""> Total Price </span>
      <span class="text-base">
        ${{
          cartStore.items
            .reduce((sum: number, el) => (sum += el.price * el.quantity), 0)
            .toFixed(2)
        }}
      </span>
    </div>
    <slot> </slot>
  </div>
</template>
