<script setup lang="ts">
import Button from "~/components/Button.vue";
import CartsAndPrice from "~/features/public/components/CartsAndPrice.vue";
import Payment from "~/features/public/components/Payment.vue";
import ShippingInformation from "~/features/public/components/ShippingInformation.vue";
import { useCartStore } from "~/stores/cartStore";
import icons from "~/utils/icons";
import { staticRoute } from "~/utils/utils";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, shallowRef, watchEffect } from "vue";

const route = useRoute();
const cartStore = useCartStore();

const isSuccess = computed(() => route.params.type === "success");

watchEffect(() => {
  if (isSuccess.value) {
    cartStore.clearCart();
    localStorage.removeItem("pending_order_id");
    localStorage.removeItem("pending_order_data");
  }
});

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
  componetns.value.findIndex((el) => el.name == active.value),
);

const componentRefs = ref<any[]>([]);

async function canGoNext(targetIdx: number) {
  for (let i = 0; i < targetIdx; i++) {
    const comp = componentRefs.value[i];
    if (comp && comp.canGoNext) {
      const result = await comp.canGoNext();
      if (!result) return false;
    }
  }
  return true;
}

async function next() {
  const targetIdx = activeIdx.value + 1;
  if (targetIdx <= componetns.value.length - 1) {
    if (await canGoNext(targetIdx)) {
      if (targetIdx <= componetns.value.length - 1) {
        active.value = componetns.value[targetIdx].name;
      }
    }
  }
}

async function goTo(name: string) {
  let idx = componetns.value.findIndex((el) => el.name == name);
  if (idx > -1) {
    if (await canGoNext(idx)) {
      if (idx > -1 && idx < componetns.value.length) {
        active.value = componetns.value[idx].name;
      }
    }
  }
}
</script>

<template>
  <section class="p-2 md:p-4 flex flex-col gap-6 container mx-auto">
    <div
      v-if="!isSuccess"
      class="bg-base-clr backdrop-blur-sm py-4 flex border-b-2 border-gray-2 pb-4 items-center justify-between gap-2"
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
    <div v-if="!isSuccess" class="w-full overflow-x-auto no-scrollbar py-2">
      <div
        class="flex items-center justify-between gap-4 min-w-[500px] md:min-w-0 max-w-6xl mx-auto px-2"
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
    </div>

    <!-- Success Message -->
    <div
      v-if="isSuccess"
      class="flex flex-col items-center justify-center py-20 gap-8 animate-success"
    >
      <div class="relative">
        <svg
          width="93"
          height="93"
          viewBox="0 0 93 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M92.375 46.125C92.375 71.5991 71.7241 92.25 46.25 92.25C20.7759 92.25 0.125 71.5991 0.125 46.125C0.125 20.6509 20.7759 0 46.25 0C71.7241 0 92.375 20.6509 92.375 46.125ZM4.43784 46.125C4.43784 69.2172 23.1578 87.9372 46.25 87.9372C69.3422 87.9372 88.0622 69.2172 88.0622 46.125C88.0622 23.0328 69.3422 4.31284 46.25 4.31284C23.1578 4.31284 4.43784 23.0328 4.43784 46.125Z"
            fill="#111111"
          />
          <path
            d="M67.7175 32L39.1227 60.5948L26.125 47.5972"
            stroke="#111111"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="text-center flex flex-col gap-3">
        <h1 class="text-3xl md:text-5xl font-dm-serif font-bold text-dark">
          Payment Successful!
        </h1>
        <p class="text-lg md:text-xl max-w-md mx-auto">
          Thank you for your purchase. We've sent a confirmation email to your
          inbox.
        </p>
      </div>

      <Button
        @click="$router.push('/shop')"
        class="rounded-full px-12 py-4 text-xl font-bold transition-transform hover:scale-105"
      >
        Continue Shopping
      </Button>
    </div>

    <template
      v-if="!isSuccess"
      v-for="({ name, com }, idx) in componetns"
      :key="name"
    >
      <component
        v-show="name == active"
        ref="componentRefs"
        :goTo="goTo"
        :next="next"
        :is="com"
      />
    </template>
  </section>
</template>
