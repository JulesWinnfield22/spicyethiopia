<script setup lang="ts">
import icons from "~/utils/icons";
import { useCartStore } from "~/stores/cartStore";
import { staticRoute, slugify } from "~/utils/utils";
import { saveFlipState } from "~/utils/flipStore";
import { Flip } from "gsap/Flip";
import { useTransitionHelper } from "~/composables/useTransition";

const { navigateWithTransition } = useTransitionHelper();

const props = defineProps<{
  spice: any;
}>();

const cartStore = useCartStore();

const handleNavigate = (id: string) => {
  const el = document.querySelector(`[data-flip-id="product-img-${id}"]`);
  if (el) {
    const state = Flip.getState(el);
    saveFlipState(state);
  }
};
</script>

<template>
  <div
    class="group relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)]"
  >
    <!-- Mobile cart toggle -->
    <button
      @click="
        cartStore.toggleItem({
          product: spice.id,
          image: spice.images?.[0] as string,
          title: spice.title,
          description: spice.description,
          price: Number(spice.discountedPrice ?? spice.price),
          size: Number(spice.quantity),
          quantity: 1,
        })
      "
      :class="[
        cartStore.thisItem(spice.id) ? 'bg-primary text-white' : 'bg-dark/60 text-white',
      ]"
      class="z-10 cursor-pointer sm:hidden absolute h-7 w-11 rounded-xl shadow-lg grid place-items-center top-3 right-3 backdrop-blur-sm"
    >
      <i v-html="icons.cart" class="*:size-4" />
    </button>

    <!-- Sale badge -->
    <div v-if="spice.discountedPrice > 0" class="absolute top-3 left-3 z-10">
      <span class="sale-badge bg-primary text-white text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full uppercase">
        Sale
      </span>
    </div>

    <!-- Image area -->
    <div
      @click.prevent="
        handleNavigate(spice.id);
        navigateWithTransition(`/spice/${slugify(spice.title)}`, spice.title);
      "
      class="relative cursor-pointer overflow-hidden"
    >
      <img
        v-if="spice.images?.[0]"
        :src="`${staticRoute}/${spice.images[0]}`"
        class="w-full object-cover h-52 sm:h-56 transition-transform duration-500 group-hover:scale-105"
        :data-flip-id="'product-img-' + spice.id"
      />
      <div
        v-else
        class="w-full bg-gray-100 h-52 sm:h-56 flex items-center justify-center"
      >
        <span class="text-gray-400 text-sm">No Image</span>
      </div>
      <!-- Bottom fade overlay -->
      <div class="absolute bottom-0 left-0 right-0 h-14 bg-linear-to-t from-black/20 to-transparent" />
    </div>

    <!-- Product info (clickable) -->
    <div
      @click.prevent="
        handleNavigate(spice.id);
        navigateWithTransition(`/spice/${slugify(spice.title)}`, spice.title);
      "
      class="flex-1 cursor-pointer px-4 pt-3 pb-1"
    >
      <div class="flex items-center gap-1.5 mb-1">
        <span class="flame-icon text-xs select-none">🌶</span>
        <span class="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Spice</span>
      </div>
      <h3
        class="text-sm sm:text-base font-semibold truncate text-dark group-hover:text-black transition-colors"
        style="font-family: var(--font-dm-serif)"
      >
        {{ spice.title }}
      </h3>
    </div>

    <!-- Price + cart row -->
    <div class="px-4 pb-4 pt-2 flex items-end justify-between gap-2">
      <!-- Price -->
      <div class="flex flex-col leading-none gap-0.5">
        <p class="text-lg sm:text-xl font-bold text-dark">
          ${{ spice.discountedPrice || spice.price }}
        </p>
        <span
          v-if="spice.discountedPrice > 0"
          class="text-[10px] line-through text-gray-400 font-normal"
        >
          ${{ spice.price }}
        </span>
      </div>

      <!-- Cart controls (desktop) -->
      <div class="hidden sm:flex items-center justify-end">
        <button
          v-if="!cartStore.thisItem(spice.id)"
          @click.prevent.stop="
            cartStore.addItem({
              product: spice.id,
              image: spice.images?.[0] as string,
              title: spice.title,
              description: spice.description,
              price: Number(spice.discountedPrice ?? spice.price),
              size: Number(spice.quantity),
              quantity: 1,
            })
          "
          class="add-cart-btn bg-dark hover:bg-neutral-700 text-white h-9 px-4 cursor-pointer rounded-full flex justify-center items-center gap-2 transition-all duration-200 active:scale-95"
        >
          <span class="text-xs font-medium">Add</span>
          <i v-html="icons.cart" class="cart-icon *:size-3.5" />
        </button>

        <div
          v-else
          class="bg-dark text-white h-9 flex items-center justify-between rounded-full px-2 gap-1 transition-all"
        >
          <button
            @click.prevent.stop="cartStore.decrement(spice.id)"
            class="bg-white/10 hover:bg-white/20 rounded-full size-6 grid place-items-center transition-colors"
          >
            <i class="*:size-3.5" v-html="icons.minus" />
          </button>
          <span class="text-xs font-bold w-4 text-center">{{
            cartStore.thisItem(spice.id)?.quantity
          }}</span>
          <button
            @click.prevent.stop="cartStore.increment(spice.id)"
            class="bg-white/10 hover:bg-white/20 rounded-full size-6 grid place-items-center transition-colors"
          >
            <i class="*:size-3.5" v-html="icons.plus" />
          </button>
          <button
            @click.stop.prevent="cartStore.removeItem(spice.id)"
            class="grid size-6 rounded-full bg-red-500/20 hover:bg-red-500 text-white transition-all place-items-center ml-1"
          >
            <i v-html="icons.trash1" class="*:size-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes cart-wiggle {
  0%, 100% { transform: rotate(0deg) scale(1); }
  20% { transform: rotate(-18deg) scale(1.15); }
  45% { transform: rotate(12deg) scale(1.08); }
  65% { transform: rotate(-8deg) scale(1.05); }
  82% { transform: rotate(5deg) scale(1.02); }
}

@keyframes flame-flicker {
  0%, 100% { transform: scaleY(1) rotate(0deg); }
  20% { transform: scaleY(1.12) rotate(-4deg); }
  50% { transform: scaleY(0.93) rotate(3deg); }
  75% { transform: scaleY(1.06) rotate(-2deg); }
}

@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.35); }
  60% { box-shadow: 0 0 0 5px rgba(255, 0, 0, 0); }
}

.flame-icon {
  animation: flame-flicker 2.8s ease-in-out infinite;
  display: inline-block;
  transform-origin: bottom center;
}

.sale-badge {
  animation: badge-pulse 2.4s ease-out infinite;
}

.add-cart-btn:hover .cart-icon {
  animation: cart-wiggle 0.5s ease-in-out;
}
</style>
