<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useApiRequest } from "~/composables/useApiRequest";
import { getProducts } from "~/features/admin/api/productApi";
import { debounce, staticRoute } from "~/utils/utils";
import icons from "~/utils/icons";
import { usePagination } from "~/composables/usePagination";
import type { Query } from "~/interface";
import { useCartStore } from "~/stores/cartStore";
import { computed, ref, watch } from "vue";
import ProductDataProvider from "~/features/public/components/ProductDataProvider.vue";
import { saveFlipState } from "~/utils/flipStore";
import { Flip } from "gsap/Flip";
import ProductCard from "./ProductCard.vue";

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  searching: {
    type: Boolean,
    default: false,
  },
});

const cartStore = useCartStore();
const searchInput = ref("");
let debouncedSearch: ((val: string) => void) | null = null;

function onSearchInput(searchRef: any) {
  if (!debouncedSearch) {
    debouncedSearch = debounce((val: string) => {
      searchRef.value = val;
    }, 400);
  }
  debouncedSearch(searchInput.value);
}

const handleNavigate = (id: string) => {
  const el = document.querySelector(`[data-flip-id="product-img-${id}"]`);
  if (el) {
    const state = Flip.getState(el);
    saveFlipState(state);
  }
};
</script>
<template>
  <section class="py-8 md:p-12">
    <ProductDataProvider v-slot="{ pending, products, search }">
      <div class="container flex flex-col gap-6 mx-auto px-4">
        <h2
          id="featured-spices"
          v-if="showHeader"
          class="text-2xl sm:text-4xl font-dm-serif text-center"
        >
          Featured Spices
        </h2>
        <p
          v-if="showHeader"
          class="font-light text-sm sm:text-base text-center max-w-[40ch] md:max-w-xl font-sans mx-auto"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin
        </p>
        <div
          v-if="searching"
          class="flex md:max-w-[40em] border-b mx-auto h-12 md:my-8 rounded border-2 border-dark w-full"
        >
          <div class="h-full w-10 grid place-items-center">
            <i v-html="icons.search" />
          </div>
          <input
            style="outline: none; width: 100%"
            v-model.trim="searchInput"
            placeholder="Search Spices"
            class="pl-3 min-w-0 flex-1 h-full"
            @input="onSearchInput(search)"
          />
        </div>
        <div class="min-h-[20rem]">
          <div
            v-if="pending"
            class="h-full w-full grid place-items-center py-16"
          >
            <i class="*:size-20" v-html="icons.spinner" />
          </div>
          <div
            v-else-if="products?.length"
            class="grid justify-center gap-4 lg:gap-8 w-full"
            :style="{
              gridTemplateColumns:
                'repeat(auto-fill, minmax(min(361px, 100%), 1fr))',
            }"
          >
            <ProductCard
              v-for="spice in products"
              :key="spice.id"
              :spice="spice"
            />
          </div>
          <div v-else class="h-full w-full grid place-items-center py-16">
            <i class="*:size-56" v-html="icons.no_data" />
            <span class="text-lg font-bold">No Products Found</span>
          </div>
        </div>
      </div>
    </ProductDataProvider>
  </section>
</template>
