<script setup lang="ts">
import icons from "~/utils/icons";
import { useCartStore } from "~/stores/cartStore";
import { staticRoute, slugify } from "~/utils/utils";
import { saveFlipState } from "~/utils/flipStore";
import { Flip } from "gsap/Flip";

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
    class="group bg-gray-400/20 relative p-2 shadow hover:shadow-xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5"
  >
    <button
      @click="
        cartStore.toggleItem({
          product: spice.id,
          image: spice.images?.[0] as string,
          title: spice.title,
          price: Number(spice.discountedPrice ?? spice.price),
          size: Number(spice.quantity),
          quantity: 1,
          description: spice.description,
        })
      "
      :class="[
        cartStore.thisItem(spice.id) ? 'bg-red-500 text-white' : 'bg-dark/50',
      ]"
      class="z-10 cursor-pointer sm:hidden absolute h-6 w-10 rounded-lg shadow-2xl grid place-items-center top-4 right-4 text-white"
    >
      <i v-html="icons.cart" class="*:size-4" />
    </button>
    <NuxtLink
      @click="handleNavigate(spice.id)"
      :to="`/spice/${slugify(spice.title)}`"
      class="block flex-1"
    >
      <div class="overflow-hidden rounded-lg">
        <img
          v-if="spice.images?.[0]"
          :src="`${staticRoute}/${spice.images[0]}`"
          class="w-full object-cover max-h-[12rem] min-h-[16rem] h-[16rem] transition-transform duration-500 group-hover:scale-105"
          :data-flip-id="'product-img-' + spice.id"
        />
        <div
          v-else
          class="w-full bg-gray-300 max-h-[12rem] min-h-[16rem] h-[16rem] flex items-center justify-center"
        >
          <span class="text-gray-500">No Image</span>
        </div>
      </div>
      <div class="px-4">
        <div class="py-2 sm:py-4 flex flex-col">
          <h3
            class="text-sm sm:text-lg truncate font-semibold group-hover:text-black transition-colors"
          >
            {{ spice.title }}
          </h3>
          <p class="text-[rgba(138_138_138)] text-xs uppercase tracking-wider">
            Spice
          </p>
        </div>
        <div class="sm:py-4 flex items-center justify-between gap-2 h-16">
          <p class="relative text-lg sm:text-2xl font-bold flex-1">
            ${{ spice.discountedPrice || spice.price }}
            <span
              v-if="spice.discountedPrice > 0"
              class="text-[10px] sm:text-xs absolute -top-3 left-0 line-through text-gray-400 font-normal italic"
            >
              ${{ spice.price }}
            </span>
          </p>

          <div class="flex items-center min-w-[110px] justify-end">
            <button
              v-if="!cartStore.thisItem(spice.id)"
              @click.prevent.stop="
                cartStore.addItem({
                  product: spice.id,
                  image: spice.images?.[0] as string,
                  title: spice.title,
                  price: Number(spice.discountedPrice ?? spice.price),
                  size: Number(spice.quantity),
                  quantity: 1,
                  description: spice.description,
                })
              "
              class="bg-black hover:bg-neutral-800 text-white w-full h-9 px-4 cursor-pointer rounded-full flex justify-center items-center gap-2 transition-all active:scale-95"
            >
              <span class="text-xs font-medium">Add</span>
              <i v-html="icons.cart" class="*:size-4" />
            </button>

            <div
              v-else
              class="bg-dark text-white w-full h-9 flex items-center justify-between rounded-full px-2 gap-1 transition-all"
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
    </NuxtLink>
  </div>
</template>
