import { computed, provide, ref, unref, watch } from "vue";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { useTablePagination } from "./useTablePagination";

interface PaginationOptions<T = any> {
  cb?:
    | ((query: any, options?: { signal?: AbortSignal }) => Promise<any>)
    | null;
  auto?: boolean;
  perPage?: number;
  searchWordLength?: number;
  ASC?: boolean | null;
  sortBy?: string | null;
  watch?: any[];
}

export function usePagination<T = any>(options: PaginationOptions<T>) {
  const paginationOptions = ref<PaginationOptions<T>>({
    cb: async (query) => query,
    auto: true,
    perPage: 25,
    searchWordLength: 0,
    ASC: null,
    sortBy: null,
    watch: [],
    ...(options || {}),
  });

  const search = ref("");
  const auto = ref(paginationOptions.value.auto);
  const perPage = ref(paginationOptions.value.perPage ?? 25);
  const debouncedSearch = ref("");

  const pagination = useTablePagination(
    perPage.value,
    paginationOptions.value.sortBy,
    paginationOptions.value.ASC,
  );

  const queryClient = useQueryClient();

  // Debounce search
  let searchTimeout: ReturnType<typeof setTimeout>;
  watch(search, (val) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      debouncedSearch.value = val;
      // Reset page on search change
      pagination.page.value = 0;
      pagination.done.value = false;
    }, 400);
  });

  // Build the query key reactively
  const queryKey = computed(() => {
    const watchValues =
      paginationOptions.value.watch?.map((w) =>
        typeof w === "function" ? w() : unref(w),
      ) || [];
    return [
      "pagination",
      paginationOptions.value.cb?.toString().slice(0, 50) || "default",
      pagination.page.value,
      perPage.value,
      debouncedSearch.value,
      pagination.sortBy?.value,
      pagination.ASC?.value,
      ...watchValues,
    ];
  });

  // The actual query
  const {
    data: queryData,
    isPending: queryPending,
    isFetching,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey,
    enabled: computed(() => auto.value !== false),
    queryFn: async ({ signal }) => {
      const paginationData = {
        search: debouncedSearch.value || undefined,
        page: pagination.page.value + 1, // API expects 1-based
        limit: pagination?.limit?.value || 25,
        sortBy: pagination?.sortBy?.value || "id",
        sortDirection: pagination?.ASC?.value ? "ASC" : "DESC",
      };

      if (paginationOptions.value.cb) {
        return paginationOptions.value.cb(paginationData, { signal });
      }
      return { success: true, data: [] };
    },
  });

  // Derive response from query data
  const response = computed<T[]>(() => {
    if (!queryData.value) return [];
    const res = queryData.value as any;
    if (!res.success) return [];

    const responseData =
      res.data?.content || res.data?.response || res.data || [];

    return Array.isArray(responseData) ? responseData : [];
  });

  // Update totalPages from API response
  watch(
    queryData,
    (data) => {
      if (data) {
        const res = data as any;
        if (res?.data?.totalPages) {
          pagination.totalPages.value = res.data.totalPages;
        }
        // Check if we've reached the end
        const items = response.value;
        if (
          items.length < (pagination.limit?.value || 25) &&
          pagination.page.value + 1 >= pagination.totalPages.value
        ) {
          pagination.done.value = true;
        }
      }
    },
    { immediate: true },
  );

  // Watch external deps and refetch
  if (paginationOptions.value.watch?.length) {
    let watchTimeout: ReturnType<typeof setTimeout>;
    watch(
      () => paginationOptions.value.watch?.map((w) => unref(w)),
      () => {
        if (watchTimeout) clearTimeout(watchTimeout);
        watchTimeout = setTimeout(() => {
          pagination.page.value = 0;
          pagination.done.value = false;
        }, 400);
      },
      { deep: true },
    );
  }

  const data = computed(() => response.value);

  const pending = computed(() => isFetching.value);
  const error = computed(() =>
    queryError.value ? (queryError.value as Error).message : "",
  );

  function next() {
    if (
      !pagination.done.value &&
      pagination.page.value < pagination.totalPages.value
    ) {
      pagination.page.value++;
    }
  }

  function previous() {
    if (pagination.page.value > 0) {
      pagination.done.value = false;
      pagination.page.value--;
    }
  }

  function send() {
    pagination.reset();
    // Invalidate all queries matching this pagination to force refetch
    queryClient.invalidateQueries({ queryKey: ["pagination"] });
  }

  // Provide for Table component compatibility
  provide("next", next);
  provide("previous", previous);
  provide("setPage", pagination.setPage);
  provide("page", pagination.page);
  provide("totalPages", pagination.totalPages);
  provide("perPage", perPage);
  provide("sortBy", pagination.sortBy);
  provide("ASC", pagination.ASC);
  provide("updateSortBy", (val: string) => (pagination.sortBy.value = val));
  provide("updateASC", (val?: boolean) => {
    pagination.ASC.value = val !== undefined ? val : !pagination.ASC.value;
  });
  provide("updateLimit", (num: number) => {
    perPage.value = Number(num);
    pagination.limit.value = Number(num);
    pagination.page.value = 0;
    pagination.done.value = false;
  });

  const page = computed(() => pagination.page.value);

  return {
    page,
    send,
    search,
    perPage,
    auto,
    totalPages: computed(() => pagination.totalPages.value),
    data,
    error,
    pending,
    dirty: computed(() => !!queryData.value),
    response,
    sortBy: pagination.sortBy,
    ASC: pagination.ASC,
    next,
    previous,
    refetch,
  };
}
