<script setup lang="ts">
import TextEditable from "./TextEditable.vue";
import spices2 from "@/assets/img/spiceSpoonLeft.png";
import spiceFour from "@/assets/img/spiceFour.png";
import spiceTwo from "@/assets/img/spiceTwo.png";
import { useApiRequest } from "@/composables/useApiRequest";
import { getTopDeals } from "@/features/admin/api/productApi";
import { staticRoute } from "@/utils/utils";
import icons from "@/utils/icons";

const topDealsReq = useApiRequest();

topDealsReq.send(
  () => getTopDeals(),
  (res) => {}
);
</script>
<template>
  <section
    v-if="topDealsReq.response.value?.length"
    class="mx-auto rounded-md bg-gray p-4 py-4 md:py-12 gap-12"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 justify-end">
      <div
        class="md:col-span-1 md:w-full md:max-w-max md:self-start md:mx-auto rounded flex flex-col"
      >
        <div class="p-2 bg-gray rounded">
          <h2 class="best-deal-header font-semibold font-dm-serif">
            <TextEditable id="text-2" text="Deals of The Month" />
          </h2>
        </div>

        <div class="p-2 font-light text-base bg-gray rounded">
          <TextEditable
            id="text-3"
            textarea
            class="md:max-w-[45ch] font-light text-xs"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin"
          />
        </div>
      </div>

      <div class="col-span-2 p-2 flex ml-auto overflow-x-auto gap-4 flex-1 h-[209px] md:h-[36rem]">
        <template v-if="!topDealsReq.pending.value">
          <div
            :key="deal.id"
            class="relative shrink-0 rounded-lg overflow-hidden"
            v-for="(deal, idx) in topDealsReq.response.value || []"
          >
            <img
              :src="`${staticRoute}/${deal.images[0]}`"
              class="rounded-lg max-w-full shadow-lg object-cover w-[20rem] h-full"
            />
            <div
              class="text-gray text-base absolute bottom-4 left-4 bg-dark border-2 border-gray md:h-[130px] md:w-[217px] rounded-md md:rounded-[24px] p-2 md:py-[32px] md:px-[26px]"
            >
              <div class="flex gap-2 mb-2 text-xs sm:text-base items-center">
                0{{ idx + 1 }} <i class="text-white" v-html="icons.long_dash" />
              </div>
              <span class="text-sm: md:text-[28px]"
                >{{ deal.discountPercentage }}% OFF</span
              >
            </div>
          </div>
        </template>
        <div
          v-else
          class="h-full rounded-lg bg-white w-full grid place-items-center"
        >
          <i v-html="icons.spinner" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.best-deal-header {
  font-size: clamp(1rem, 1vw + 0.75rem, 2.25rem);
}

.deals-grid {
  overflow-x: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 404px);
  grid-template-rows: 100%;
}
</style>
