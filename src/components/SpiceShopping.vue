<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useApiRequest } from "@/composables/useApiRequest";
import { getProducts } from "@/features/admin/api/productApi";
import { staticRoute } from "@/utils/utils";
import icons from "@/utils/icons";
import { usePagination } from "@/composables/usePagination";
import type { Query } from "@/interface";
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";
import ProductDataProvider from "@/features/public/components/ProductDataProvider.vue";

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  searching: {
    type: Boolean,
    defaul: false,
  },
});

const cartStore = useCartStore()

</script>
<template>
  <section class="bg-white py-8 md:p-12">
    <ProductDataProvider v-slot="{ pending, products, search }" >
      <div class="container flex flex-col gap-6 mx-auto px-4">
        <h2
          v-if="showHeader"
          class="text-2xl sm:text-4xl font-bold font-dm-serif text-center"
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
            v-model.trim="search.value"
            placeholder="Search Spices"
            lass="pl-3 min-w-0 flex-1 h-full"
          />
        </div>
        <div class="min-h-[20rem]">
          <div
            v-if="products?.length != 0"
            class="grid grid-cols-2 justify-self-center lg:grid-cols-3 max-w-max mx-auto justify-center gap-4 lg:gap-8"
          >
            <div
              v-for="spice in products || []"
              :key="spice.id"
              class="bg-white relative p-2 sm:p-6 shadow rounded-lg overflow-hidden flex flex-col transition-transform hover:scale-105 duration-200"
            >
              <button
                @click="cartStore.toggleItem({
                  product: spice.id,
                  image: spice.images?.[0] as string,
                  title: spice.title,
                  price: spice.discountedPrice ?? spice.price,
                  size: spice.quantity,
                  quantity: 1,
                  description: spice.description
                })"
                :class="[cartStore.thisItem(spice.id) ? 'bg-red-500 text-white' : 'bg-dark/50']"
                class="cursor   cursor-pointer sm:hidden absolute h-6 w-10 rounded-lg shadow-2xl grid place-items-center top-4 right-4 text-white"
              >
                <i v-html="icons.cart" class="*:size-4" />
              </button>
              <RouterLink
                :to="{ name: 'SpiceDetail', params: { id: spice.id } }"
                class="block flex-1"
              >
                <img
                  :src="`${staticRoute}/${spice.images[0]}`"
                  class="w-full object-cover max-h-[6rem] sm:max-h-[12rem] min-h-[6rem] md:max-w-[20rem] md:h-[16rem] rounded-lg"
                />
  
                <div class="py-2 sm:py-4 flex flex-col">
                  <h3 class="text-sm sm:text-xl truncate font-medium">
                    {{ spice.title }}
                  </h3>
                  <p class="text-[rgba(138_138_138)] text-sm">Spice</p>
                </div>
                <div class="sm:py-4 flex items-center justify-between">
                  <p class="relative text-sm sm:text-3xl font-bold sm:font-semibold">
                    ${{ spice.discountedPrice || spice.price }}
                    <div v-if="spice.discountedPrice > 0" class="sm:absolute font-normal text-xs sm:-top-2 italic sm:right-0 line-through" >
                      ${{ spice.price }}
                    </div>
                  </p>
                  <button
                    @click.prevent.stop="cartStore.addItem({
                      product: spice.id,
                      image: spice.images?.[0] as string,
                      title: spice.title,
                      price: spice.discountedPrice ?? spice.price,
                      size: spice.quantity,
                      quantity: 1,
                  description: spice.description

                    })"
                    class="relative hidden sm:flex bg-black text-white px-4  py-2 cursor-pointer rounded-full justify-center items-center gap-2"
                  >
                    <div v-if="!cartStore.thisItem(spice.id)" class="flex gap-2" >
                      <span >Add</span> <i v-html="icons.cart"></i>
                    </div>
                    <div v-if="cartStore.thisItem(spice.id)" class="h-full text-white -top-7 right-0 flex items-center gap-2 text-xs rounded-md p-1" >
                      <button @click.prevent.stop="cartStore.increment(spice.id)" class="bg-gray/30 rounded-full size-4 grid place-items-center" >
                        <i class="*:size-4" v-html="icons.plus" />
                      </button>
                      {{ cartStore.thisItem(spice.id)?.quantity }}
                      <button @click.prevent.stop="cartStore.decrement(spice.id)" class="bg-gray/30 rounded-full size-4 grid place-items-center" >
                        <i class="*:size-4" v-html="icons.minus" />
                      </button>
                      <button @click.stop.prevent="cartStore.removeItem(spice.id)" class="grid size-5 ml-2 rounded-full bg-gray text-dark place-items-center" >
                        <i v-html="icons.trash1" class="*:size-4" />
                      </button>
                    </div>
                  </button>
                </div>
              </RouterLink>
            </div>
          </div>
          <div v-else class="h-full w-full">
            <div class="grid place-items-center" v-if="!pending">
              <i class="*:size-56" v-html="icons.no_data" />
              <span class="text-lg font-bold">No Poducts Found</span>
            </div>
            <div class="grid place-items-center" v-else>
              <i class="*:size-20" v-html="icons.spinner" />
            </div>
          </div>
        </div>
      </div>
    </ProductDataProvider>
  </section>
</template>
