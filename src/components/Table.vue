<script setup lang="ts" generic="T extends object">
import { computed, ref, watch, type PropType } from "vue";
import type { Component } from "vue";
import Button from "./Button.vue";
import TableRowSkeleton from "./TableRowSkeleton.vue";
import icons from "@/utils/icons";

type CellFunction = (value: any, row: T) => string | number;
type CellPath = string; // dot notation path e.g. "user.address.city"
type CellComponent = Component;

type CellDefinition = CellPath | CellFunction | CellComponent;
type Headers = { head: string[]; row: ((keyof T))[] };

type Cells = {
  [key in keyof T | string]?: CellDefinition
}

const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  headers: {
    type: Object as PropType<Headers>,
    required: true,
  },
  data: {
    type: Array as PropType<T[]>,
    default: [],
  },
  cells: {
    type: Object as PropType<Cells>,
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

function resolveCellValue(key: keyof T, row: T) {
  const cellDef = row[key];
  
  if (!cellDef || cellDef) {
    return (key as string).split(".").reduce((obj: any, path) => obj?.[path], row);
  } else if (typeof cellDef === "function") {
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
          v-for="header in headers.head"
          :key="header"
          class="truncate p-2 text-left !font-bold"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!pending && data.length">
        <tr
          :key="index"
          v-for="(row, index) in data"
          class="relative border-b border-gray"
        >
          <td class="px-4 py-3">{{ index + 1 }}</td>
          <td :key="key" v-for="key in headers.row" class="p-2">
            <template v-if="cells && cells[key] && typeof cells[key] === 'object'">
              <component :is="cells[key]" :value="row[key]" :row="row" />
            </template>
            <template v-else>
              <span class='line-clamp-1 truncate w-full max-w-[30ch]' >
                {{ resolveCellValue(key, row) }}
              </span>
            </template>
          </td>
          <td
            class="px-4 py-3"
            v-if="headers.head.find((head) => head.toLowerCase() == 'actions')"
          >
            <slot name="actions" :index="index" :row="row" />
          </td>
        </tr>
      </template>
      <tr v-else-if="data.length == 0 && !pending">
        <td :colspan="headers.head.length + 1">
          <slot name="no-data-placeholder">
            <div class="flex h-60 justify-center flex-col items-center">
              <div class="flex justify-center w-full">
                <i class="*:size-52" v-html="icons.no_data" />
              </div>
              <p class="font-bold">No Data Found</p>
            </div>
          </slot>
        </td>
      </tr>
      <template v-else-if="pending">
        <TableRowSkeleton
          :key="num"
          v-for="num in 25"
          :cols="headers.head.length + 1"
        />
      </template>
    </tbody>
  </table>
  <slot name="pagination">
    <div class="flex justify-end items-center">
      <div class="flex gap-2">
        <Button fullwidth type="edge"> Previous </Button>
        <Button fullwidth type="secondary"> Next </Button>
      </div>
    </div>
  </slot>
</template>
