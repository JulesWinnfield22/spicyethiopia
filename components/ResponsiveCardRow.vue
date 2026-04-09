<script setup lang="ts" generic="T">
import { isVueComponent } from "~/utils/componentUtils";
import { type PropType, inject, type Ref } from "vue";
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
  headKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  cells: Object as PropType<Record<string, any>>,
  index: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    default: 1,
  },
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
    actions: (props: { row: T }) => any;
    [key: string]: (props: any) => any;
  }
>();

const hasSlot = (name: string) => !!slots?.[name];

// Check if "Actions" is a header
const hasActions = computed(() =>
  props.headKeys.some((h) => h.toLowerCase() === "actions"),
);

// Compute the row number
const rowNumber = computed(
  () => (props.page - 1) * props.perPage + props.index + 1,
);
</script>

<template>
  <div
    @click="emit('row', row as T)"
    class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
  >
    <!-- Card header: row number + actions -->
    <div
      v-if="hasActions"
      class="flex items-center justify-between px-4 pt-3 pb-1"
    >
      <span class="text-xs font-bold text-gray-400">#{{ rowNumber }}</span>
      <div>
        <slot name="actions" :row="row as T" />
      </div>
    </div>

    <!-- Card body: grid of cells -->
    <div class="grid grid-cols-2 gap-x-3 gap-y-3 p-4 pt-2">
      <template v-for="(key, idx) in rowKeys" :key="key">
        <div class="flex flex-col gap-0.5 min-w-0">
          <!-- Label from headKeys -->
          <span class="text-[11px] font-medium text-gray-400 uppercase tracking-wide truncate">
            {{ headKeys[idx] || key }}
          </span>
          <!-- Value -->
          <div class="text-sm font-medium text-gray-900 truncate">
            <template v-if="hasSlot(key)">
              <slot
                :name="key"
                :value="(row as T)[key as keyof T]"
                :row="row as T"
              />
            </template>
            <span v-else-if="!cells || !cells?.[key]">
              {{ getNestedValue(row, key) }}
            </span>
            <component
              v-else-if="cells && isVueComponent(cells[key])"
              :row="row as T"
              :is="cells[key]"
            />
            <span v-else-if="cells && typeof cells[key] == 'function'">
              {{ cells[key]((row as any)?.[key], row as T) }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
