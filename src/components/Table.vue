<script setup lang="ts">
import { computed, ref, watch, type PropType } from "vue";
import type { Component } from "vue";
import Button from "./Button.vue";
import TableRowSkeleton from "./TableRowSkeleton.vue";
import icons from "@/utils/icons";

type CellFunction = (value: any, row: any) => string | number;
type CellPath = string; // dot notation path e.g. "user.address.city"
type CellComponent = Component;

type CellDefinition = CellPath | CellFunction | CellComponent;
type Headers = { head: string[]; row: string[] };

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  headers: {
    type: Object as PropType<Headers>,
  },
  data: {
    type: Array as PropType<any[]>,
    default: [],
  },
  cells: {
    type: Object as PropType<Record<string, CellDefinition>>,
    default: () => ({}),
  },
});

function toUpper(str: string) {
  let words = str.split(" ");
  if (words.length == 0) return str;

  for (let i = 1; i < words.length; i++) {
    words[0] += words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  return words[0];
}

const spec = ref<Headers>({ head: [], row: [] });

function format() {
  if (Array.isArray(props.headers)) {
    spec.value.head = props.headers;

    const res = props.headers.reduce((state: string[], el) => {
      const temp = el.toLowerCase();
      state.push(toUpper(temp));
      return state;
    }, [] as string[]);

    spec.value.row = res.filter((el) => el != "modify");
  } else {
    spec.value.head = props.headers?.head || [];
    spec.value.row = props.headers?.row || [];
  }
}

format();

watch(props, () => {
  format();
});

function resolveCellValue(key: string, row: any) {
  const cellDef = props.cells[key];

  if (typeof cellDef === "string") {
    return cellDef.split(".").reduce((obj, path) => obj?.[path], row);
  }

  if (typeof cellDef === "function") {
    return (cellDef as CellFunction)(row?.[key], row);
  }

  return row?.[key];
}
</script>
<template>
  <table class="border-[0_0.2px] border-gray min-w-full text-sm text-left">
    <thead class="bg-black/5 h-[48px] text-black">
      <tr>
        <th class="px-4 py-2">#</th>
        <th
          :title="header"
          v-for="header in spec.head"
          :key="header"
          class="truncate p-2 text-left !font-bold"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!pending && data.length" >
        <tr :key="index" v-for="(row, index) in data" class="relative border-b border-gray">
          <td class="px-4 py-3">{{ index + 1 }}</td>
          <td :key="key" v-for="key in spec.row" class="p-2">
            <template v-if="cells[key] && typeof cells[key] === 'object'">
              <component :is="cells[key]" :value="row[key]" :row="row" />
            </template>
            <template v-else>
              {{ resolveCellValue(key, row) }}
            </template>
          </td>
          <td
            class="px-4 py-3"
            v-if="spec.head.find((head) => head.toLowerCase() == 'actions')"
          >
            <slot name="actions" :index="index" :row="row" />
          </td>
        </tr>
      </template>
      <tr v-else-if="data.length == 0 && !pending" >
        <td  :colspan="spec.head.length + 1" >
          <slot name="no-data-placeholder">
            <div class="flex h-60 justify-center flex-col items-center" >
              <div class="flex justify-center w-full" >
                <i class="*:size-52" v-html="icons.no_data" />
              </div>
              <p class="font-bold" >No Data Found</p>
            </div>
          </slot>
        </td>
      </tr>
      <template v-else-if="pending" >
        <TableRowSkeleton :key="num" v-for="num in 25" :cols="spec.head.length + 1" />
      </template>
    </tbody>
  </table>
  <slot name="pagination" >
    <div class="flex justify-end items-center">
      <div class="flex gap-2">
        <Button fullwidth type="edge"> Previous </Button>
        <Button fullwidth type="secondary"> Next </Button>
      </div>
    </div>
  </slot>
</template>
