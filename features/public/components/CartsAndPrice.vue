<script setup lang="ts">
import Button from "~/components/Button.vue";
import { useCartStore } from "~/stores/cartStore";
import icons from "~/utils/icons";
import { staticRoute } from "~/utils/utils";
import TotalPrice from "./TotalPrice.vue";

const cartStore = useCartStore();

const props = defineProps({
  next: {
    type: Function,
    required: true,
  },
});

function canGoNext() {
  return cartStore.items.length > 0;
}

defineExpose({
  canGoNext,
});
</script>
<template>
  <div class="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-2 p-4 flex flex-col gap-4">
      <div class="col-span-2 flex justify-between items-center">
        <span class="font-bold text-xs md:text-lg">Items in cart</span>
        <span class="font-bold text-xs md:text-lg"
          >{{ cartStore.items?.length || 0 }} items</span
        >
      </div>
      <div
        class="border rounded-md gap-4 md:gap-6 flex p-2 md:p-4 border-dark/20"
        v-for="item in cartStore.items"
        :key="item.product"
      >
        <div class="md:self-start">
          <img
            class="max-w-full size-24 md:size-36 rounded-md object-cover"
            :src="`${staticRoute}/${item.image}`"
          />
        </div>
        <div
          class="flex flex-col max-w-[calc(100%-11rem)] gap-1 md:gap-4 justify-between flex-1"
        >
          <div class="flex flex-col gap-1">
            <span class="md:text-2xl truncate font-normal leading-tight">{{
              item.title
            }}</span>
            <p class="text-xs md:text-sm text-gray-500 line-clamp-1">
              {{ item.description }}
            </p>
          </div>
          <span
            class="block font-bold md:font-semibold border-gray-2 text-xs md:text-xl border-b pb-2"
            >${{ item.price }}</span
          >
          <div class="flex items-center justify-between">
            <div
              class="ml-auto ml:ml-none mr-3 bg-gray-2 font-medium text-xs md:h-10 md:px-2 rounded-full flex items-center gap-2"
            >
              <button
                @click.prevent.stop="cartStore.increment(item.product)"
                class="rounded-full size-8 grid place-items-center"
              >
                <i v-html="icons.plus" />
              </button>
              {{ cartStore.thisItem(item.product)?.quantity }}
              <button
                @click.prevent.stop="cartStore.decrement(item.product)"
                class="rounded-full size-8 grid place-items-center"
              >
                <i v-html="icons.minus" />
              </button>
            </div>
            <Button
              @click.stop.prevent="cartStore.removeItem(item.product)"
              class="flex gap-2 items-center rounded-full bg-red-400 text-white"
            >
              <i v-html="icons.trash1" class="*:size-4" />
              <span class="hidden md:inline">Remove Item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <TotalPrice>
      <Button
        @click="() => next()"
        size="md"
        type="secondary"
        class="mt-auto rounded-3xl flex gap-4"
      >
        Shipping Information
        <i v-html="icons.rightArrow" />
      </Button>
    </TotalPrice>
  </div>
</template>
