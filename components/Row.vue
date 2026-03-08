<script setup lang="ts" generic="T">
import { isVueComponent } from "~/utils/componentUtils";
import { type PropType } from "vue";
import TableNumberCell from "./TableNumberCell.vue";
import { getNestedValue } from "~/utils/utils";

const props = defineProps({
  row: {
    type: Object as PropType<T>,
    required: true,
  },
  rowKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  firstCol: Boolean,
  cells: Object as PropType<Record<string, any>>,
  page: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 25,
  },
  index: {
    type: Number,
    required: true,
  },
  headKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  lastCol: Boolean,
});

const emit = defineEmits<{
  row: [row: T];
}>();

const slots = defineSlots<
  {
    [K in keyof T]?: (props: { row: T; value: T[K] }) => any;
  } & {
    number: (props: { row: T }) => any;
    select: (props: { row: T }) => any;
    actions: (props: { row: T }) => any;
    reason: (props: { row: T }) => any;
    lastCol: (props: { row: T }) => any;
    [key: string]: (props: any) => any;
  }
>();

const hasSlot = (name: string) => !!slots?.[name];
</script>

<template>
  <tr
    @click="
      () => {
        emit('row', row as T);
      }
    "
    class="*:w-max *:cursor-pointer border-gray-300 *:max-w-[400px] bg-white max-h-[40px] h-[40px] border-b-[0.2px] last:border-0 hover:bg-gray-50"
  >
    <td v-if="firstCol" class="px-3">
      <slot name="select" :row="row as T" />
    </td>
    <td class="w-10 max-w-[3rem]">
      <slot name="number" :row="row as T">
        <TableNumberCell
          :page="props.page"
          :perPage="props.perPage"
          :index="index"
        />
      </slot>
    </td>
    <td class="p-2 text-left" :key="key" v-for="key in rowKeys">
      <template v-if="hasSlot(key)">
        <slot :name="key" :value="(row as T)[key as keyof T]" :row="row as T" />
      </template>
      <span class="w-full block break-word" v-else-if="!cells || !cells?.[key]">
        {{ getNestedValue(row, key) }}
      </span>
      <component
        v-else-if="cells && isVueComponent(cells[key])"
        :row="row as T"
        :is="cells[key]"
      />
      <span
        class="flex flex-wrap break-word"
        v-else-if="cells && typeof cells[key] == 'function'"
      >
        {{ cells[key]((row as any)?.[key], row as T) }}
      </span>
    </td>
    <td v-if="headKeys.find((head) => head.toLowerCase() == 'actions')">
      <slot name="actions" :row="row as T" />
    </td>
    <td
      class="p-2"
      v-if="headKeys.find((head) => head.toLowerCase() == 'reason')"
    >
      <slot name="reason" :row="row as T" />
    </td>
    <td v-if="lastCol" class="p-2">
      <slot name="lastCol" :row="row as T" />
    </td>
  </tr>
</template>
