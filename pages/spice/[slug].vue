<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cartStore";
import { useToast } from "~/toast/store/toast";
import {
  type Product,
  useProductsStore,
} from "~/features/admin/store/productsStore";
import { getProductBySlug } from "~/features/admin/api/productApi";
import icons from "~/utils/icons";
import { staticRoute, slugify } from "~/utils/utils";
import SpiceShopping from "~/components/SpiceShopping.vue";
import ProductDataProvider from "~/features/public/components/ProductDataProvider.vue";
import { getAndClearFlipState } from "~/utils/flipStore";
import { Flip } from "gsap/Flip";

import ProductCard from "~/components/ProductCard.vue";

definePageMeta({
  pageTransition: false,
  hideNavbar: true,
});

const cartStore = useCartStore();
const toast = useToast();
const productsStore = useProductsStore();

const route = useRoute();
const productSlug = computed(() => route.params.slug as string);

// Use useAsyncData for SSR/SSG support
const { data: product } = await useAsyncData(
  `product-slug-${productSlug.value}`,
  () =>
    getProductBySlug(productSlug.value).then((res) =>
      res.success ? res.data : null,
    ),
  { watch: [productSlug] },
);

const productId = computed(() => product.value?.id);

// Dynamic SEO using useSeoMeta
useSeoMeta({
  title: () =>
    product.value?.title
      ? `${product.value.title} | The Spicy Ethiopian`
      : "The Spicy Ethiopian",
  ogTitle: () => product.value?.title,
  description: () => product.value?.description?.substring(0, 160),
  ogDescription: () => product.value?.description,
  ogImage: () =>
    product.value?.images?.[0]
      ? `${staticRoute}/${product.value.images[0]}`
      : undefined,
});

const isInstructionsActive = ref(false);

onMounted(() => {
  if (process.client && productId.value) {
    const state = getAndClearFlipState();
    if (state) {
      nextTick(() => {
        const el = document.querySelector(
          `[data-flip-id="product-img-${productId.value}"]`,
        );
        if (el) {
          Flip.from(state, {
            duration: 0.6,
            ease: "back.out(1.2)",
            scale: true,
          });
        }
      });
    }
  }
});

watch(
  () => route.path,
  () => {
    if (process.client) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
);
</script>

<template>
  <section class="p-2 md:p-4 flex flex-col gap-6 container mx-auto mb-20">
    <div class="flex items-center gap-2">
      <button
        @click="$router.push('/')"
        class="flex items-center gap-2 text-base md:text-2xl font-dm-serif font-semibold hover:opacity-70 transition-opacity"
      >
        <i v-html="icons.leftArrow" />
        <span>{{ product?.title || "Product Not Found" }}</span>
      </button>
    </div>
    <div
      v-if="product"
      class="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-12"
    >
      <img
        :src="
          !product?.images?.[0] ? '/' : `${staticRoute}/${product?.images[0]}`
        "
        class="bg-gray w-[573px] aspect-square max-h-[480px] md:h-auto md:rounded-xl rounded-md appearance-none object-cover max-w-full shadow-2xl"
        :data-flip-id="'product-img-' + product.id"
      />
      <div class="md:w-1/2 max-w-[70ch] md:mx-auto flex flex-col gap-4">
        <div class="font-dm-serif flex flex-col gap-4">
          <div class="flex items-center font-semibold justify-between">
            <span class="text-2xl md:text-5xl">{{ product?.title }}</span>
            <span class="text-xl md:text-2xl font-sans opacity-60"
              >{{ product?.weight }}{{ product?.weightUnit }}</span
            >
          </div>
          <div class="flex items-center gap-4 border-b border-gray-2 pb-6">
            <span class="md:font-bold md:text-5xl text-3xl font-bold text-dark"
              >${{ product?.discountedPrice ?? product?.price }}</span
            >
            <span
              v-if="product?.discountedPrice"
              class="text-xl line-through text-gray-400 font-normal italic"
            >
              ${{ product?.price }}
            </span>
          </div>
          <p
            class="text-sm md:text-base leading-relaxed text-gray-600 border-b border-gray-2 pb-6"
          >
            {{ product?.description }}
          </p>
        </div>
        <div>
          <div
            v-if="productId && cartStore.thisItem(productId)"
            class="bg-dark text-white h-14 flex w-full items-center gap-6 rounded-full px-6 shadow-lg"
          >
            <div class="flex items-center gap-4">
              <button
                @click.prevent.stop="cartStore.decrement(productId!)"
                class="bg-white/10 hover:bg-white/20 rounded-full size-10 grid place-items-center transition-colors"
              >
                <i class="*:size-6" v-html="icons.minus" />
              </button>
              <span class="text-xl font-bold w-6 text-center">{{
                cartStore.thisItem(productId!)?.quantity
              }}</span>
              <button
                @click.prevent.stop="cartStore.increment(productId!)"
                class="bg-white/10 hover:bg-white/20 rounded-full size-10 grid place-items-center transition-colors"
              >
                <i class="*:size-6" v-html="icons.plus" />
              </button>
            </div>

            <button
              @click.stop.prevent="cartStore.removeItem(productId!)"
              class="grid size-10 ml-auto rounded-full bg-red-500/20 hover:bg-red-500 text-white transition-colors place-items-center"
            >
              <i v-html="icons.trash1" class="*:size-6" />
            </button>
          </div>
          <button
            @click="
              cartStore.addItem({
                product: product?.id ?? '',
                image:
                  typeof product?.images?.[0] === 'string'
                    ? product.images[0]
                    : '',
                title: product?.title ?? '',
                price: Number(product?.discountedPrice || product?.price || 0),
                size: Number(product?.quantity ?? 0),
                quantity: 1,
                description: product?.description,
              })
            "
            v-else
            class="w-full py-4 px-8 rounded-full bg-dark text-white font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
          >
            Add To Cart
          </button>
        </div>
        <div
          class="flex flex-col bg-white shadow-xl rounded-2xl p-6 border border-gray-100"
        >
          <div class="grid grid-cols-2 gap-4 mb-4">
            <button
              @click="isInstructionsActive = false"
              :class="
                !isInstructionsActive
                  ? 'bg-dark text-white'
                  : 'bg-gray-100 text-dark/50'
              "
              class="text-center py-2 rounded-xl font-dm-serif transition-colors"
            >
              Ingredients
            </button>
            <button
              @click="isInstructionsActive = true"
              :class="
                isInstructionsActive
                  ? 'bg-dark text-white'
                  : 'bg-gray-100 text-dark/50'
              "
              class="text-center py-2 rounded-xl font-dm-serif transition-colors"
            >
              Instructions
            </button>
          </div>
          <div
            v-show="!isInstructionsActive"
            class="animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <p
              v-if="product?.ingredients?.length"
              class="text-sm font-medium text-dark mb-4"
            >
              {{ product?.ingredients?.[0] }}
            </p>
            <div class="flex flex-col gap-3 text-sm text-gray-600">
              <div
                class="flex gap-3 items-start"
                v-for="(item, idx) in product?.ingredients?.slice(1)"
                :key="idx"
              >
                <span
                  class="bg-gray-100 size-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                  >{{ (idx as number) + 1 }}</span
                >
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
          <div
            v-show="isInstructionsActive"
            class="animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <p
              v-if="product?.instructions?.length"
              class="text-sm font-medium text-dark mb-4"
            >
              {{ product?.instructions?.[0] }}
            </p>
            <div class="flex flex-col gap-3 text-sm text-gray-600">
              <div
                class="flex gap-3 items-start"
                v-for="(item, idx) in product?.instructions?.slice(1)"
                :key="idx"
              >
                <span
                  class="bg-gray-100 size-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold"
                  >{{ (idx as number) + 1 }}</span
                >
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20">
      <h2 class="text-3xl font-dm-serif">Product Not Found</h2>
      <NuxtLink to="/" class="text-blue-500 mt-4 block">Return Home</NuxtLink>
    </div>

    <!-- Related Products -->
    <div class="mt-24" v-if="product">
      <div class="flex items-center gap-4 mb-12">
        <h2 class="text-3xl md:text-5xl font-dm-serif font-bold">
          Related Spices
        </h2>
        <div class="h-px flex-1 bg-gray-200"></div>
      </div>
      <ProductDataProvider v-slot="{ products: relatedProducts }">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="pro in relatedProducts
              .filter((p) => p.id !== productId)
              .slice(0, 4)"
            :key="pro.id"
            :spice="pro"
          />
        </div>
      </ProductDataProvider>
    </div>
  </section>
</template>
<style scoped>
.my-gear {
  grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
}
</style>
