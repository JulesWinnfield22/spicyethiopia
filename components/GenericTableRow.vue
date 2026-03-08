<script setup lang="ts" generic="T">
import type { PropType } from "vue";
import Row from "./Row.vue";

const props = defineProps({
  rowData: {
    type: Array as PropType<T[] | null>,
    required: true,
  },
  sort: {
    type: Object,
  },
  firstCol: {
    type: Boolean,
    default: false,
  },
  lastCol: {
    type: Boolean,
    default: false,
  },
  rowKeys: {
    type: Array as PropType<string[]>,
    required: true,
  },
  headKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  cells: Object as PropType<Record<string, any>>,
  page: {
    type: Number,
    default: 1,
  },
  uniqueKey: String,
  perPage: {
    type: Number,
    default: 25,
  },
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
    top: (props: { row: T }) => any;
    bottom: (props: { row: T }) => any;
    [key: string]: (props: any) => any;
  }
>();
</script>

<template>
  <template
    :key="(row as any)?.[uniqueKey as string] || index"
    v-for="(row, index) in rowData"
  >
    <slot name="top" :row="row as T" />
    <Row
      :index="index"
      :row="row as T"
      @row="emit('row', row as T)"
      :first-col="firstCol"
      :last-col="lastCol"
      :row-keys="rowKeys"
      :head-keys="headKeys"
      :cells="cells"
      :page="page"
      :per-page="perPage"
    >
      <template v-slot:[slot]="values" v-for="slot in Object.keys(slots || {})">
        <slot :name="slot" v-bind="values as any" />
      </template>
      <template v-if="firstCol" #select="{ row }">
        <slot name="select" :row="row as T" />
      </template>
      <template v-if="lastCol" #lastCol="{ row }">
        <slot name="lastCol" :row="row as T" />
      </template>
      <template #actions="{ row }">
        <slot name="actions" :row="row as T" />
      </template>
      <template #reason="{ row }">
        <slot name="reason" :row="row as T" />
      </template>
    </Row>
    <slot name="bottom" :row="row as T" />
  </template>
</template>
