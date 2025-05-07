<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useApiRequest } from "@/composables/useApiRequest";
import { getProducts } from "@/features/admin/api/productApi";
import { staticRoute } from "@/utils/utils";
import icons from "@/utils/icons";
import { usePagination } from "@/composables/usePagination";
import type { Query } from "@/interface";

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

const pagination = usePagination({
  cb: (params: Query) => getProducts(params),
});
</script>
<template>
  <section class="bg-white py-8 md:p-12">
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
      <!-- <div
        class="flex justify-center font-sans mt-6 space-x-6 sm:space-x-12 flex-wrap"
      >
        <button
          v-for="category in data.categories"
          :key="category"
          @click="data.selectedCategory = category"
          class="px-4 py-2 rounded-full cursor-pointer font-semibold transition"
          :class="
            data.selectedCategory === category
              ? 'bg-black text-white'
              : 'text-gray-700 hover:bg-gray-100'
          "
        >
          {{ category }}
        </button>
      </div> -->
      <div
        v-if="searching"
        class="flex md:max-w-[40em] border-b mx-auto h-12 md:my-8 rounded border-2 border-dark w-full"
      >
        <div class="h-full w-10 grid place-items-center">
          <i v-html="icons.search" />
        </div>
        <input
          style="outline: none; width: 100%"
          v-model.trim="pagination.search.value"
          placeholder="Search Spices"
          lass="pl-3 min-w-0 flex-1 h-full"
        />
      </div>
      <div class="min-h-[20rem]" >
        <div
          v-if="pagination.data.value?.response?.length != 0"
          class="grid grid-cols-2 justify-self-center lg:grid-cols-3 max-w-max mx-auto justify-center gap-4 lg:gap-8"
        >
          <div
            v-for="spice in pagination.data.value?.response || []"
            :key="spice.id"
            class="bg-white relative p-2 sm:p-6 shadow rounded-lg overflow-hidden flex flex-col transition-transform hover:scale-105 duration-200"
          >
            <button
              class="cursor-pointer sm:hidden absolute h-6 w-10 rounded-lg shadow-2xl grid place-items-center top-4 right-4 bg-black/50 text-white"
            >
              <i v-html="icons.cart" class="*:size-4" />
            </button>
            <RouterLink
              :to="{ name: 'SpiceDetail', params: { id: spice.id } }"
              class="block flex-1"
            >
              <img
                :src="`${staticRoute}/${spice.images[0]}`"
                class="w-full min-h-[6rem] md:max-w-[20rem] md:h-[16rem] rounded-lg"
              />
  
              <div class="py-2 sm:py-4 flex flex-col">
                <h3 class="text-sm sm:text-xl truncate font-medium">
                  {{ spice.title }}
                </h3>
                <p class="text-[rgba(138_138_138)] text-sm">Spice</p>
              </div>
              <div class="sm:py-4 flex items-center justify-between">
                <p class="text-sm sm:text-3xl font-bold sm:font-semibold">
                  ${{ spice.price }}
                </p>
                <button
                  class="hidden sm:flex bg-black text-white px-4 py-2 cursor-pointer rounded-full justify-center items-center gap-2"
                >
                  Add <i v-html="icons.cart"></i>
                </button>
              </div>
            </RouterLink>
          </div>
        </div>
        <div v-else class="h-full w-full">
          <div class="grid place-items-center" v-if="!pagination.pending.value">
            <i class="*:size-56" v-html="icons.no_data" />
            <span class="text-lg font-bold">No Poducts Found</span>
          </div>
          <div class="grid place-items-center" v-else>
            <i class="*:size-20" v-html="icons.spinner" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
