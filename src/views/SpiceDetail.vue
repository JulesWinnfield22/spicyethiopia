<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/toast/store/toast";
import {
  type Product,
  useProductsStore,
} from "@/features/admin/store/productsStore";
import { useApiRequest } from "@/composables/useApiRequest";
import { getProductById } from "@/features/admin/api/productApi";
import icons from "@/utils/icons";
import { staticRoute } from "@/utils/utils";
import Button from "@/components/Button.vue";
import SpiceShopping from "@/components/SpiceShopping.vue";
import ProductDataProvider from "@/features/public/components/ProductDataProvider.vue";

const cartStore = useCartStore();
const toast = useToast();
const productsStore = useProductsStore();

const route = useRoute();
const product = ref();

const productReq = useApiRequest();
let productId = route.params.id;
function getProduct() {
  productId = route.params.id;
  product.value = productsStore.products.find((el) => el.id == productId);
  if (!product.value && productId) {
    productReq.send(
      () => getProductById(productId as string),
      (res) => {
        if (res.success) {
          product.value = res.data;
        }
      }
    );
  }
}

const isInstructionsActive = ref(false);

getProduct();
watch(() => route.path, getProduct);
</script>

<template>
  <section class="p-2 md:p-4 flex flex-col gap-6 container mx-auto">
    <div class="flex items-center gap-2">
      <button
        @click="$router.go(-1)"
        class="flex items-center gap-2 text-base md:text-2xl font-dm-serif font-semibold"
      >
        <i v-html="icons.leftArrow" />
        <span>{{ product?.title }}</span>
      </button>
    </div>
    <div class="flex flex-col md:flex-row gap-6 md:gap-12">
      <div class="md:w-1/2 rounded-xl overflow-hidden md:self-start">
        <img
          :src="
            !product?.images?.[0] ? '/' : `${staticRoute}/${product?.images[0]}`
          "
          class="bg-gray md:h-auto md:rounded-xl rounded-md appearance-none object-cover min-h-[195px] h-[195px] max-w-full w-full"
        />
      </div>
      <div class="md:w-1/2 max-w-[70ch] md:mx-auto flex flex-col gap-4">
        <div class="font-dm-serif flex flex-col gap-4">
          <div class="flex items-center font-semibold justify-between">
            <span class="text-2xl md:text-3xl">{{ product?.title }}</span>
            <span class="text-xl md:text-2xl font-sans"
              >{{ product?.weight }}{{ product?.weightUnit }}</span
            >
          </div>
          <span
            class="md:font-semibold md:text-4xl border-b border-gray-2 pb-4 text-lg font-semibold"
            >${{ product?.discountedPrice ?? product?.price }}</span
          >
          <p class="text-xs md:text-sm leading-5 border-b border-gray-2 pb-4">
            {{ product?.description }}
          </p>
        </div>
        <div>
          <div
            v-if="cartStore.thisItem(productId as string)"
            class="bg-dark text-white h-12 flex items-center gap-2 rounded-md px-4"
          >
            <button
              @click.prevent.stop="cartStore.increment(productId as string)"
              class="bg-gray/30 rounded-full size-8 grid place-items-center"
            >
              <i class="*:size-8" v-html="icons.plus" />
            </button>
            {{ cartStore.thisItem(productId as string)?.quantity }}
            <button
              @click.prevent.stop="cartStore.decrement(productId as string)"
              class="bg-gray/30 rounded-full size-8 grid place-items-center"
            >
              <i class="*:size-8" v-html="icons.minus" />
            </button>
            <button
              @click.stop.prevent="cartStore.removeItem(productId as string)"
              class="grid size-8 ml-auto rounded-full bg-gray text-dark place-items-center"
            >
              <i v-html="icons.trash1" class="*:size-6" />
            </button>
          </div>
          <button
            @click="
              cartStore.addItem({
                product: product?.id ?? '',
                image: product?.images?.[0] || '',
                title: product?.title ?? '',
                price: product?.discountedPrice || product?.price || 0,
                size: product?.quantity ?? 0,
                quantity: 1,
                  description: product.description
              })
            "
            v-else
            class="py-1 px-4 rounded-2xl bg-dark text-white"
          >
            Add To Cart
          </button>
        </div>
        <div class="flex flex-col bg-white shadow-2xl rounded-lg p-4">
          <div class="grid grid-cols-2">
            <Button
              @click="isInstructionsActive = !isInstructionsActive"
              :class="
                isInstructionsActive ? 'text-dark/30' : 'border-b border-gray-2'
              "
              class="text-center"
              >Ingredient</Button
            >
            <Button
              @click="isInstructionsActive = !isInstructionsActive"
              :class="
                !isInstructionsActive
                  ? 'text-dark/30'
                  : 'border-b border-gray-2'
              "
              class="text-center"
              >Instructions
            </Button>
          </div>
          <div v-if="!isInstructionsActive">
            <p class="text-xs md:text-sm font-light py-4 leading-4">
              {{ product?.ingredients?.[0] }}
            </p>
            <div class="px-2 flex flex-col gap-2 text-xs md:text-sm font-light">
              <div
                class="flex gap-2"
                :key="item"
                v-for="(item, idx) in product?.ingredients.slice(1)"
              >
                <span>{{ idx + 1 }}.</span>
                <span
                  >{{ item }} Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Esse, obcaecati.</span
                >
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-xs font-light py-4 leading-4">
              {{ product?.instructions?.[0] }}
            </p>
            <div class="px-2 flex flex-col gap-2 text-xs font-light">
              <div
                class="flex gap-2"
                :key="item"
                v-for="(item, idx) in product?.instructions.slice(1)"
              >
                <span>{{ idx + 1 }}.</span>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductDataProvider v-slot="{ pending, search, products }" >
      <div class="container grid grid-cols-2 lg:grid-cols-2 justify-center gap-2 lg:gap-8 " >
        
        <RouterLink :to="`/spice/${pro.id}`" class="relative rounded-xl bg-white shadow-2xl p-2 md:p-6" :key="pro.id" v-for="pro in products" >
          <button
                @click.prevent.stop="cartStore.toggleItem({
                  product: pro.id,
                  image: pro.images?.[0] as string,
                  title: pro.title,
                  price: pro.discountedPrice ?? pro.price,
                  size: pro.quantity,
                  quantity: 1,
                  description: pro.description
                })"
                :class="[cartStore.thisItem(pro.id) ? 'bg-red-500 text-white' : 'bg-dark/50']"
                class="cursor   cursor-pointer sm:hidden absolute h-6 w-10 rounded-lg shadow-2xl grid place-items-center top-4 right-4 md:top-8 md:right-8 text-white"
              >
                <i v-html="icons.cart" class="*:size-4" />
              </button>
          <div class=" overflow-hidden rounded-md" >
            <img class="max-w-full w-full object-cover h-[8rem] max-h-[8rem] md:max-h-[15rem] md:h-[244px] rounded-md md:rounded-xl" :src="`${staticRoute}/${pro.images?.[0]}`" />
          </div>
          <div class="py-2 sm:py-4 flex flex-col">
                  <h3 class="text-sm sm:text-xl truncate font-medium">
                    {{ pro.title }}
                  </h3>
                  <p class="text-[rgba(138_138_138)] text-sm">Spice</p>
                </div>
                <div class="sm:py-4 flex items-center justify-between">
                  <p class="relative text-sm sm:text-3xl font-bold sm:font-semibold">
                    ${{ pro.discountedPrice || pro.price }}
                    <div v-if="pro.discountedPrice > 0" class="sm:absolute font-normal text-xs sm:-top-2 italic sm:right-0 line-through" >
                      ${{ pro.price }}
                    </div>
                  </p>
                  <button
                    @click.prevent.stop="cartStore.addItem({
                      product: pro.id,
                      image: pro.images?.[0] as string,
                      title: pro.title,
                      price: pro.discountedPrice ?? pro.price,
                      size: pro.quantity,
                      quantity: 1,
                      description: pro.description
                    })"
                    class="relative hidden sm:flex bg-black text-white px-4  py-2 cursor-pointer rounded-full justify-center items-center gap-2"
                  >
                    <div v-if="!cartStore.thisItem(pro.id)" class="flex gap-2" >
                      <span >Add</span> <i v-html="icons.cart"></i>
                    </div>
                    <div v-if="cartStore.thisItem(pro.id)" class="h-full text-white -top-7 right-0 flex items-center gap-2 text-xs rounded-md p-1" >
                      <button @click.prevent.stop="cartStore.increment(pro.id)" class="bg-gray/30 rounded-full size-4 grid place-items-center" >
                        <i class="*:size-4" v-html="icons.plus" />
                      </button>
                      {{ cartStore.thisItem(pro.id)?.quantity }}
                      <button @click.prevent.stop="cartStore.decrement(pro.id)" class="bg-gray/30 rounded-full size-4 grid place-items-center" >
                        <i class="*:size-4" v-html="icons.minus" />
                      </button>
                      <button @click.stop.prevent="cartStore.removeItem(pro.id)" class="grid size-5 ml-2 rounded-full bg-gray text-dark place-items-center" >
                        <i v-html="icons.trash1" class="*:size-4" />
                      </button>
                    </div>
                  </button>
                </div>
        </RouterLink>
      </div>
    </ProductDataProvider>
  </section>
</template>
<style scoped >
  .my-gear {
    grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
  }
</style>