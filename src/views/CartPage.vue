<script setup lang="ts">
import Button from "@/components/Button.vue";
import CartsAndPrice from "@/features/public/components/CartsAndPrice.vue";
import Payment from "@/features/public/components/Payment.vue";
import ShippingInformation from "@/features/public/components/ShippingInformation.vue";
import { useCartStore } from "@/stores/cartStore";
import icons from "@/utils/icons";
import { staticRoute } from "@/utils/utils";
import { computed, ref, shallowRef } from "vue";

const componetns = shallowRef([
  {
    icon: icons.cart,
    name: "Cart",
    com: CartsAndPrice,
  },
  {
    icon: icons.location1,
    name: "Shipping Information",
    com: ShippingInformation,
  },
  {
    icon: icons.payment,
    com: Payment,
    name: "Payment",
  },
]);

const active = ref(componetns.value[0].name);
const activeIdx = computed(() =>
  componetns.value.findIndex((el) => el.name == active.value)
);

function next() {
  if (activeIdx.value + 1 <= componetns.value.length - 1) {
    active.value = componetns.value[activeIdx.value + 1].name;
  }
}

function goTo(name: string) {
  let idx = componetns.value.findIndex((el) => el.name == name);
  if (idx > -1) {
    active.value = componetns.value[idx].name;
  }
}
</script>

<template>
  <section class="p-2 md:p-4 flex flex-col gap-6 container mx-auto">
    <div
      class="sticky top-16 bg-white z-20 py-4 flex border-b-2 border-gray-2 pb-4 items-center justify-between gap-2"
    >
      <button
        @click="$router.go(-1)"
        class="flex items-center gap-2 text-base md:text-2xl font-dm-serif font-semibold"
      >
        <i v-html="icons.leftArrow" />
        <span>Cart</span>
      </button>
      <Button
        type="secondary"
        @click="$router.push('/shop')"
        class="rounded-2xl items-center flex gap-2 bg-dark text-gray px-4 h-8"
      >
        <i v-html="icons.plus"></i>
        <span>Add Items</span>
      </Button>
    </div>
    <div
      class="mx-auto max-w-6xl w-full h-12 gap-4 flex justify-between items-center"
    >
      <div
        @click="goTo(item.name)"
        :class="[idx < componetns.length - 1 && 'flex-1']"
        class="cursor-pointer flex items-center gap-4 font-bold text-base"
        v-for="(item, idx) in componetns"
        :key="item.name"
      >
        <div
          :class="[
            idx <= activeIdx ? 'bg-dark text-white' : 'bg-gray-2 text-white',
          ]"
          class="size-12 rounded-full grid place-items-center"
        >
          <i v-html="item.icon" />
        </div>
        <span
          :class="[idx <= activeIdx ? 'text-dark' : 'text-gray-2']"
          class="hidden md:inline"
          >{{ item.name }}</span
        >
        <div
          :class="[idx <= activeIdx ? 'bg-dark' : 'bg-gray-2']"
          v-if="idx < componetns.length - 1"
          class="flex-1 h-1 rounded-4xl"
        ></div>
      </div>
    </div>
    <template :key="name" v-for="{ name, com } in componetns">
      <component v-if="name == active" :goTo="goTo" :next="next" :is="com" />
    </template>
  </section>
</template>
