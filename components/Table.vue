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
      store: props.api.store,
      perPage: props.api.perPage || 25,
      watch: props.api.watch || [],
      attrName: props.api.key || "content",
    })
  : ({
      cb: async (f: any) => f,
      store: null,
      perPage: ref(25),
      ASC: ref(null),
      pending: ref(false),
      sortBy: ref(null),
      watch: [],
      attrName: null,
      send: () => {},
      response: ref([]),
      page: computed(() => 1),
      totalPages: computed(() => 1),
      search: ref(""),
      next: () => {},
      auto: ref(false),
      previous: () => {},
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

const pending = computed(() => {
  return props.pending || pagination?.pending?.value;
});

const rows = computed<T[]>(() => {
  return props.rows.length
    ? props.rows
    : props.api?.store
      ? props.api?.store?.getAll?.()
      : pagination?.response?.value;
});

const nextPage = inject("next", pagination.next);
const previousPage = inject("previous", pagination.previous);
const page = inject("page", pagination.page);
const totalPages = inject("totalPages", pagination.totalPages);
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
    <div
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
            <tr v-if="!rows?.length && !pending">
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
        <template v-if="pending">
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
      class="hidden md:flex items-center overflow-hidden rounded-md mt-2 p-2 justify-between"
    >
      <div class="flex-1 flex items-center gap-2">
        <p class="text-xs">Page {{ page || 1 }} of {{ totalPages || 1 }}</p>
        <div class="text-xs border-l border-black pl-2">
          per page
          <select
            @change="(ev: any) => updateLimit(ev.target.value)"
            :value="perPageNum"
            class="appearance-none rounded-md text-xs font-medium p-1 text-center m-0"
          >
            <option
              :value="value"
              v-for="value in perPageOptions.sort((a, b) => a - b)"
            >
              {{ value }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Button
          size="sm"
          class="border border-dark/10"
          v-ripple
          @click="previousPage"
        >
          <span>Previous</span>
        </Button>
        <Button size="sm" class="bg-dark text-white" v-ripple @click="nextPage">
          <span>Next</span>
        </Button>
      </div>
    </div>
  </div>
</template>
