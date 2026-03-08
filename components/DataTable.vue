<script setup lang="ts">
import icons from "~/utils/icons";
import { type Ref } from "vue";
import { inject, type PropType, provide, useSlots } from "vue";

const props = defineProps({
  headerCom: {
    type: [Object, Boolean],
  },
  sortableName: {
    type: Array as PropType<string[]>,
  },
  headers: {
    type: Array as PropType<string[]>,
    required: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  firstCol: {
    type: Boolean,
    default: false,
  },
  lastCol: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Number,
    default: 1,
  },
});

type Fun = (val: string) => void;
type ASCFun = (val?: boolean) => void;

const next = inject("next", () => {});
const previous = inject("previous", () => {});
const sortBy = inject<Ref<string>>("sortBy", null);
const ASC = inject<Ref<boolean>>("ASC", null);
const updateSortBy = inject<Fun>("updateSortBy", (val) => {});
const updateASC = inject<ASCFun>("updateASC", () => {});

const page = inject("page", 1);
const totalPages = inject("totalPages", 1);

const slots = useSlots();

const hasSlot = (name: string) => {
  return !!slots[name];
};

function selectSort(idx: number) {
  if (props.sortableName[idx] == sortBy?.value) {
    updateASC();
  } else {
    updateSortBy(props.sortableName[idx]);
    updateASC(true);
  }
}
</script>
<template>
  <table id="report-table" class="min-w-max w-full rounded-lg">
    <thead class="capitalize text-black">
      <slot v-if="hasSlot('headerCom')" :headers="headers" name="headerCom" />
      <component
        v-else-if="headerCom"
        :headers="headers"
        :first-col="firstCol"
        :last-col="lastCol"
        :is="headerCom"
      />
      <tr v-else class="bg-white/50 mb-3 border-b border-gray-300">
        <th v-if="firstCol" class="th p-2 text-left uppercase tracking-wider">
          <slot name="headerFirst"></slot>
        </th>
        <th class="w-10">
          <slot name="counter"> # </slot>
        </th>
        <th
          v-for="(header, idx) in headers"
          :key="header"
          :class="[sortableName[idx] === sortBy ? 'bg-gray-200' : '']"
          class="text-sm hover:bg-gray-100 group cursor-pointer h-10 text-left font-medium whitespace-nowrap"
        >
          <slot
            :asc="ASC && sortableName[idx] === sortBy"
            :toggle="() => selectSort(idx)"
            :name="`head:${header.replace(/\s/g, '')}`"
          >
            <div
              @click="selectSort(idx)"
              class="w-full px-2 h-full items-center flex justify-between"
            >
              <span>{{ header }}</span>
              <button class="w-6 grid place-content-center">
                <i
                  :class="[
                    ASC && sortableName[idx] === sortBy
                      ? 'rotate-180'
                      : 'rotate-0',
                    sortableName[idx] === sortBy
                      ? 'inline'
                      : 'group-hover:inline hidden',
                  ]"
                  v-html="icons.downAngle"
                  class="*:size-3 *:font-bold"
                />
              </button>
            </div>
          </slot>
        </th>
        <th v-if="lastCol" class="th p-3 text-left uppercase tracking-wider">
          <slot name="headerLast"></slot>
        </th>
      </tr>
    </thead>
    <slot />
  </table>
</template>
