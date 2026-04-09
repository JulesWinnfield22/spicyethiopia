<script setup lang="ts" generic="T">
import DataTable from "./DataTable.vue";
import {
  computed,
  inject,
  provide,
  type Ref,
  ref,
  watch,
  type PropType,
} from "vue";
import GenericTableRow from "./GenericTableRow.vue";
import icons from "~/utils/icons.js";
import TableRowSkeleton from "~/skeletons/TableRowSkeleton.vue";
import { usePagination } from "~/composables/usePagination";
import { getNestedValue } from "~/utils/utils";
import { useWindowSize } from "~/composables/useWindowSize";

import Button from "./Button.vue";

export type TableType = "mobile" | "tablet" | "desktop";

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const emit = defineEmits<{
  row: [row: T];
  bottom: [];
}>();

const props = defineProps({
  api: {
    type: Object as PropType<{
      auto: boolean;
      cb: (query: any, options?: { signal?: AbortSignal }) => Promise<any>;
      store?: any;
      perPage: number;
      watch?: any[];
      key: "content" | "response" | string;
    }>,
  },
  uniqueKey: String,
  sort: {
    type: Object,
  },
  headerCom: {
    type: [Object, Boolean],
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  rowCom: Object,
  actionHide: String,
  headers: [Array, Object],
  rows: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
  firstCol: { type: Boolean, default: false },
  lastCol: { type: Boolean, default: false },
  placeholder: String,
  photoRow: Object,
  cells: Object as PropType<Record<string, any>>,
  actions: Array,
  exceptions: Array,
  length: Number,
  Fallback: {
    type: Object,
    default: TableRowSkeleton,
  },
  pending: Boolean,
  tableType: String as PropType<TableType>,
});

const size = useWindowSize();
const tableType = ref<TableType>(props.tableType || "desktop");

provide("tableType", tableType);

watch(
  size,
  () => {
    if (size.value.width < screens.md) {
      tableType.value = "mobile";
    } else if (size.value.width < screens.lg) {
      tableType.value = "tablet";
    } else {
      tableType.value = "desktop";
    }
  },
  { deep: true, immediate: true },
);

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
    counter: (props: {}) => any;
    headerCom: (props: any) => any;
    headerFirst: (props: {}) => any;
    headerLast: (props: {}) => any;
    placeholder: (props: {}) => any;
    row: (props: {
      cells: any;
      headKeys: string[];
      keys: string[];
      rows: T[];
    }) => any;
    [key: `head:${string}`]: (props: {
      asc?: boolean;
      toggle?: () => void;
    }) => any;
    [key: string]: (props: any) => any;
  }
>();

const hasSlot = (name: string) => !!slots?.[name];

const pagination = props.api
  ? usePagination<T>({
      auto: props.api.auto,
      cb: props.api.cb,
      perPage: props.api.perPage || 25,
      watch: props.api.watch || [],
    })
  : ({
      cb: async (f: any) => f,
      perPage: ref(25),
      ASC: ref(null),
      pending: ref(false),
      sortBy: ref(null),
      watch: [],
      send: () => {},
      next: () => {},
      previous: () => {},
      setPage: () => {},
      total: ref(0),
      totalPages: ref(0),
      done: ref(false),
      page: ref(0),
      response: ref([]),
      data: ref([]),
      search: ref(""),
      auto: ref(false),
    } as any);

function toUpper(str: string) {
  let words = str.split(" ");
  if (words.length == 0) return str;

  for (let i = 1; i < words.length; i++) {
    words[0] += words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  return words[0];
}

interface Spec {
  head: string[];
  row: string[];
}

const spec = ref<Spec>({ head: [], row: [] });

function format() {
  if (Array.isArray(props.headers)) {
    spec.value.head = props.headers as [];

    const res = props.headers.reduce((state, el) => {
      const temp = el?.toLowerCase();
      state.push(toUpper(temp));
      return state;
    }, []);

    spec.value.row = res.filter((el: string) => el != "modify");
  } else {
    spec.value.head = (props.headers as any)?.head || [];
    spec.value.row = (props.headers as any)?.row || [];
  }
}

format();
watch(
  () => props.headers,
  () => {
    format();
  },
  { deep: true },
);

const isLoading = computed(() => {
  return props.pending || pagination?.pending?.value;
});

watchEffect(() => {
  console.log("[Table.vue] isLoading changed:", isLoading.value, {
    propPending: props.pending,
    paginationPending: pagination?.pending?.value,
  });
});
const rows = computed<T[]>(() => {
  return props.rows.length ? props.rows : pagination?.data?.value || [];
});

const nextPage = inject("next", pagination.next);
const previousPage = inject("previous", pagination.previous);
const page = inject("page", pagination.page);
const totalPages = inject("totalPages", pagination.totalPages);
const setPage = inject("setPage", pagination.setPage);
const perPage = inject<Ref<number> | number>("perPage", pagination.perPage);
const perPageNum = computed(() =>
  typeof perPage === "number" ? perPage : perPage?.value,
);
const sortBy = inject<Ref<string>>("sortBy", pagination.sortBy);
const ASC = inject<Ref<boolean>>("ASC", pagination.ASC);
const updateLimit = inject("updateLimit", (num: number) => {});

if (
  (props.api?.auto != false || props.api?.auto == undefined) &&
  props.api?.cb
) {
  pagination.send();
  pagination.auto.value = true;
}

defineExpose(pagination);

const sorted = computed(() => {
  if (!rows.value || !sortBy?.value) {
    return rows.value;
  }

  const data = [...rows.value];

  return data.sort((a, b) => {
    const aValue = getNestedValue(a, sortBy.value);
    const bValue = getNestedValue(b, sortBy.value);

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return ASC?.value ? 1 : -1;
    if (bValue == null) return ASC?.value ? -1 : 1;

    const aComp =
      typeof +aValue === "number" && `${+aValue}` != "NaN"
        ? +aValue
        : String(aValue).toLowerCase();
    const bComp =
      typeof +bValue === "number" && `${+bValue}` != "NaN"
        ? +bValue
        : String(bValue).toLowerCase();

    if (`${new Date(aValue).getDate()}` != "NaN") {
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);

      return !ASC?.value ? +dateA - +dateB : +dateB - +dateA;
    }

    let result = 0;
    if (aComp < bComp) result = 1;
    else if (aComp > bComp) result = -1;

    return ASC?.value ? result : -result;
  });
});

// Compute if actions are present
const hasActions = computed(() =>
  spec.value.head.some((h) => h.toLowerCase() === "actions"),
);

const perPageOptions = [10, 25, 50, 100, 1000];
watch(
  () => perPageNum.value,
  (newVal) => {
    if (newVal && !perPageOptions.includes(newVal)) {
      perPageOptions.push(newVal);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="rounded-lg lg:w-full overflow-auto max-h-max">
    <!-- Mobile card view -->
    <template v-if="tableType !== 'desktop'">
      <!-- Loading skeleton for mobile -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="n in perPageNum > 20 ? 20 : perPageNum"
          :key="n"
          class="bg-white rounded-2xl border border-gray-100 animate-pulse overflow-hidden"
        >
          <!-- Skeleton Header -->
          <div
            v-if="hasActions"
            class="flex items-center justify-between px-4 pt-3 pb-1"
          >
            <div class="h-3 w-8 bg-gray-200 rounded-full" />
            <div class="h-6 w-16 bg-gray-100 rounded-lg shadow-sm" />
          </div>

          <!-- Skeleton Body -->
          <div class="grid grid-cols-2 gap-3 p-4 pt-2">
            <div
              v-for="h in spec.row.length || 4"
              :key="h"
              class="flex flex-col gap-1.5"
            >
              <div class="h-2.5 w-16 bg-gray-200 rounded-full" />
              <div class="h-4 w-full bg-gray-100 rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
      <!-- Card rows -->
      <div
        v-else-if="sorted?.length"
        class="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <ResponsiveCardRow
          v-for="(row, index) in sorted"
          :key="(row as any)?.[uniqueKey as string] || index"
          :row="row"
          :index="index"
          :row-keys="spec.row"
          :head-keys="spec.head"
          :cells="cells"
          :page="page"
          :per-page="perPageNum"
          @row="(r: any) => emit('row', r as T)"
        >
          <template
            v-slot:[slot]="values"
            v-for="slot in Object.keys(slots || {})"
          >
            <slot :name="slot" v-bind="values as any" />
          </template>
          <template #actions="{ row: r }">
            <slot name="actions" :row="r as T" />
          </template>
        </ResponsiveCardRow>
      </div>
      <!-- No data placeholder for mobile -->
      <div v-else class="py-8">
        <slot name="placeholder">
          <div
            class="bg-white p-6 flex flex-col gap-2 items-center rounded-2xl border border-gray-100"
          >
            <div
              class="flex-1 flex justify-center py-5 size-48 *:size-full"
              v-html="icons.no_data"
            />
            <p class="text-xl font-bold">
              {{ placeholder ? placeholder : "No Data Found" }}
            </p>
          </div>
        </slot>
      </div>
    </template>

    <!-- Desktop table view -->
    <div
      v-else
      class="rounded-lg border border-gray-300 lg:w-full lg:overflow-x-auto max-h-max"
    >
      <DataTable
        :tableType="tableType"
        :sortableName="spec.row"
        :header-com="headerCom"
        :page="page"
        :firstCol="firstCol"
        :last-col="lastCol"
        class="bg-table-clr"
        :headers="spec.head"
      >
        <template
          v-slot:[`head:${header}`]="values"
          v-for="header in spec.head.map((el) => el.replace(/\s/g, ''))"
          :key="header"
        >
          <slot :name="`head:${header}`" v-bind="values as any" />
        </template>
        <template #counter>
          <slot name="counter" />
        </template>
        <template v-if="headerCom" #headerCom="hData">
          <slot name="headerCom" v-bind="hData" />
        </template>
        <template v-if="firstCol" #headerFirst>
          <slot name="headerFirst" />
        </template>
        <template v-if="lastCol" #headerLast>
          <slot name="headerLast" />
        </template>
        <slot
          :cells="cells"
          :headKeys="spec.head"
          :keys="spec.row"
          :rows="sorted || []"
          name="row"
        >
          <template v-if="rowCom">
            <component
              :is="rowCom"
              v-bind="{
                cells: cells,
                headKeys: spec.head,
                rowData: rows,
                rowKeys: spec.row,
                perPage: perPage,
                page: page,
                ...$attrs,
              }"
            />
          </template>
          <template v-else>
            <GenericTableRow
              :sort="sort"
              :perPage="perPageNum"
              :page="page"
              :uniqueKey="uniqueKey"
              @row="(row: T) => emit('row', row)"
              :firstCol="props.firstCol"
              :lastCol="props.lastCol"
              :head-keys="spec.head"
              :row-data="sorted || []"
              :row-keys="spec.row"
              :cells="cells"
            >
              <template
                v-slot:[slot]="values"
                v-for="slot in Object.keys(slots || {})"
              >
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
              <template #top="{ row }">
                <slot name="top" :row="row as T" />
              </template>
              <template #bottom="{ row }">
                <slot name="bottom" :row="row as T" />
              </template>
            </GenericTableRow>
            <tr v-if="!rows?.length && !isLoading">
              <td :colspan="spec.head.length + 1">
                <slot name="placeholder">
                  <div class="bg-white p-6 flex flex-col gap-2 items-center">
                    <div
                      class="flex-1 flex justify-center py-5 size-48 *:size-full"
                      v-html="icons.no_data"
                    />
                    <p class="text-xl font-bold">
                      {{ placeholder ? placeholder : "No Data Found" }}
                    </p>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
        </slot>
        <template v-if="isLoading">
          <component
            :cols="spec.head.length + 1"
            :key="num"
            v-for="num in perPageNum > 100 ? 100 : perPageNum"
            :is="Fallback"
          />
        </template>
      </DataTable>
    </div>

    <div
      v-if="showPagination"
      class="flex flex-wrap items-center gap-y-3 gap-x-6 overflow-hidden rounded-md mt-4 p-3 justify-between bg-white border border-gray-100 shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-4">
        <!-- Page Selector -->
        <div class="flex items-center gap-2 min-w-max">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Page</span>
          <div class="relative flex items-center">
            <select
              :value="page ?? 0"
              @change="(ev: any) => setPage(Number(ev.target.value))"
              class="h-8 pl-2 pr-6 rounded border border-gray-200 bg-gray-50 text-xs font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              <option v-for="p in (totalPages || 1)" :key="p - 1" :value="p - 1">
                {{ p }}
              </option>
            </select>
            <i v-html="icons.down" class="absolute right-1.5 pointer-events-none *:size-3 text-gray-400" v-if="icons.down"/>
          </div>
          <span class="text-xs text-gray-400 font-medium whitespace-nowrap">of {{ totalPages || 1 }}</span>
        </div>

        <!-- Per Page Selector -->
        <div class="flex items-center gap-2 border-l border-gray-100 pl-4 min-w-max">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Per Page</span>
          <div class="relative flex items-center">
            <select
              @change="(ev: any) => updateLimit(Number(ev.target.value))"
              :value="perPageNum"
              class="h-8 pl-2 pr-6 rounded border border-gray-200 bg-gray-50 text-xs font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/5"
            >
              <option
                :value="value"
                v-for="value in perPageOptions.sort((a, b) => a - b)"
                :key="value"
              >
                {{ value }}
              </option>
            </select>
            <i v-html="icons.down" class="absolute right-1.5 pointer-events-none *:size-3 text-gray-400" v-if="icons.down"/>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center gap-2 ml-auto">
        <Button
          size="sm"
          type="edge"
          class="h-8! px-4! text-xs font-bold"
          v-ripple
          @click="previousPage"
          :disabled="(page ?? 0) <= 0"
        >
          <span>Previous</span>
        </Button>
        <Button 
          size="sm" 
          type="secondary"
          class="h-8! px-4! text-xs font-bold shadow-sm" 
          v-ripple 
          @click="nextPage"
          :disabled="(page ?? 0) + 1 >= (totalPages || 1)"
        >
          <span>Next</span>
        </Button>
      </div>
    </div>
  </div>
</template>
