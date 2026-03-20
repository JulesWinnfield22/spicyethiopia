import { computed, provide, ref, unref, watch } from "vue";
import { useTablePagination } from "./useTablePagination";
import { useApiRequest } from "./useApiRequest";

interface CacheEntry {
  data: any;
  expiresAt: number | null;
  createdAt: number;
}

const cacheStore = new Map<string, CacheEntry>();

function removeCache(key: string) {
  cacheStore.delete(key);
}

export function clearAllPaginationCache() {
  cacheStore.clear();
}

function getCache(key: string) {
  const cached = cacheStore.get(key);
  if (!cached) return null;

  const now = Date.now();
  const isExpired = cached.expiresAt && now > cached.expiresAt;

  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }
  return cached.data;
}

function setCache(key: string, data: any, ttl = 0) {
  const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
  const cacheEntry: CacheEntry = {
    data,
    expiresAt,
    createdAt: Date.now(),
  };
  cacheStore.set(key, cacheEntry);
  return cacheEntry;
}

interface PaginationOptions<T = any> {
  cb?:
    | ((query: any, options?: { signal?: AbortSignal }) => Promise<any>)
    | null;
  store?: any;
  auto?: boolean;
  perPage?: number;
  searchWordLength?: number;
  ASC?: boolean | null;
  sortBy?: string | null;
  watch?: any[];
  attrName?: string | null;
  cache?: {
    enabled?: boolean;
    ttl?: number;
    key?: string | null;
  };
}

export function usePagination<T = any>(options: PaginationOptions<T>) {
  const {
    enabled: cacheEnabled = true,
    ttl: cacheTtl = 300,
    key: customCacheKey = null,
  } = options?.cache || {};

  const paginationOptions = ref<PaginationOptions<T>>({
    cb: async (query) => query,
    store: null,
    auto: true,
    perPage: 25,
    searchWordLength: 0,
    ASC: null,
    sortBy: null,
    watch: [],
    attrName: null,
    ...(options || {}),
  });

  const response = ref<T[]>([]);
  const search = ref("");
  const auto = ref(paginationOptions.value.auto);
  const perPage = ref(paginationOptions.value.perPage ?? 25);
  const searching = ref(false);

  const req = useApiRequest();

  const pagination = useTablePagination(
    perPage.value,
    paginationOptions.value.sortBy,
    paginationOptions.value.ASC,
  );

  const originalPaginationState = ref({
    page: 0,
    totalPages: 0,
    done: false,
  });

  let toWatch: number;
  watch(
    () => paginationOptions.value.watch,
    () => {
      if (toWatch) clearTimeout(toWatch);
      toWatch = setTimeout(() => {
        send();
      }, 400) as any;
    },
    { deep: true },
  );

  function switchToSearchMode() {
    if (!searching.value) {
      originalPaginationState.value = {
        page: pagination.page.value,
        totalPages: pagination.totalPages.value,
        done: pagination.done.value,
      };
      searching.value = true;
    }
    pagination.reset(perPage.value);
  }

  function switchToNormalMode() {
    if (searching.value) {
      pagination.page.value = originalPaginationState.value.page;
      pagination.totalPages.value = originalPaginationState.value.totalPages;
      pagination.done.value = originalPaginationState.value.done;
      searching.value = false;
    }
  }

  function getPaginationData(next = true, current = false) {
    return {
      search: search.value || undefined,
      page: next
        ? !current
          ? ++pagination.page.value
          : pagination.page.value
        : --pagination.page.value,
      limit: pagination?.limit?.value || 25,
      sortBy: pagination?.sortBy?.value || "id",
      sortDirection: pagination?.ASC?.value ? "ASC" : "DESC",
    };
  }

  function getGeneratedCacheKey(paginationData: any) {
    const baseKey =
      customCacheKey ??
      (paginationOptions.value.cb
        ? paginationOptions.value.cb.toString()
        : "default");
    const watchValues =
      paginationOptions.value.watch?.map((w) => unref(w)) || [];
    return `${baseKey}:${JSON.stringify(paginationData)}:watch:${JSON.stringify(watchValues)}`;
  }

  let fetchController: AbortController;
  async function fetch(next = true, current = false) {
    console.log("[usePagination] fetch called", { next, current });
    if (next && pagination.done.value) return;

    const paginationData = getPaginationData(next, current);
    const cacheKey = getGeneratedCacheKey(paginationData);

    if (cacheEnabled) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        console.log("[usePagination] cache hit for key:", cacheKey);
        if (paginationOptions.value.store) {
          paginationOptions.value.store.set(cachedData);
        }
        req.response.value = cachedData;
        response.value = cachedData;
        return;
      }
    }

    response.value = [];
    if (paginationOptions.value.store) {
      paginationOptions.value.store.set([]);
    }

    if (fetchController) fetchController.abort();
    fetchController = new AbortController();

    req.send(
      () => {
        if (paginationOptions.value.cb) {
          return paginationOptions.value.cb(paginationData, {
            signal: fetchController.signal,
          });
        }
        return Promise.resolve({ success: true, data: [] });
      },
      (res) => {
        if (res.success) {
          const responseData =
            res.data?.content ||
            res.data?.response ||
            (paginationOptions.value.attrName &&
              res.data?.[paginationOptions.value.attrName]) ||
            res.data ||
            [];

          response.value = Array.isArray(responseData) ? responseData : [];

          if (paginationOptions.value.store?.set) {
            paginationOptions.value.store.set(response.value);
          }

          if (cacheEnabled) {
            setCache(cacheKey, response.value, cacheTtl);
          }

          pagination.totalPages.value = res.data?.totalPages || 1;

          if (
            response.value.length < pagination.limit.value &&
            pagination.page.value >= pagination.totalPages.value
          ) {
            pagination.done.value = true;
          }
        }
      },
      true,
    );
  }

  let searchTimeout: number = 0;
  function fetchSearch(next = true, current = false) {
    if (next && pagination.done.value) return;

    if (fetchController) fetchController.abort();
    if (searchTimeout) clearTimeout(searchTimeout);

    fetchController = new AbortController();

    const paginationData = getPaginationData(next, current);
    const cacheKey = getGeneratedCacheKey(paginationData);

    if (cacheEnabled) {
      const cachedData = getCache(cacheKey);
      if (cachedData?.length) {
        if (paginationOptions.value.store?.set) {
          paginationOptions.value.store.set(cachedData);
        }
        response.value = cachedData;
        return;
      }
    }

    // Clear store and fire request immediately (Search.vue already debounces)
    if (paginationOptions.value.store?.set) {
      paginationOptions.value.store.set([]);
    }
    req.send(
      () => {
        if (paginationOptions.value.cb) {
          return paginationOptions.value.cb(paginationData, {
            signal: fetchController.signal,
          });
        }
        return Promise.resolve({ success: true, data: [] });
      },
      (res) => {
        const responseData =
          res.data?.content ||
          res.data?.response ||
          (paginationOptions.value.attrName &&
            res.data?.[paginationOptions.value.attrName]) ||
          res.data ||
          [];

        const finalData = Array.isArray(responseData) ? responseData : [];

        if (res.success) {
          response.value = finalData;
          if (paginationOptions.value.store) {
            paginationOptions.value.store.set(finalData);
          }
          if (cacheEnabled) {
            setCache(cacheKey, finalData, cacheTtl);
          }
        } else {
          response.value = [];
        }

        pagination.totalPages.value = res.data?.totalPages || 1;
        if (
          res?.success &&
          finalData.length < pagination.limit.value &&
          pagination.page.value >= pagination.totalPages.value
        ) {
          pagination.done.value = true;
        }
      },
      true,
    );
  }

  function next() {
    if (searching.value) {
      fetchSearch(true, false);
    } else {
      fetch(true, false);
    }
  }

  function previous() {
    if (searching.value && pagination.page.value <= 1) return;
    if (!searching.value && pagination.page.value <= 1) return;

    if (searching.value) {
      fetchSearch(false);
      pagination.done.value = false;
    } else {
      pagination.done.value = false;
      fetch(false, false);
    }
  }

  watch(search, () => {
    pagination.done.value = false;
    if (
      search.value &&
      search.value.length >= (paginationOptions.value.searchWordLength ?? 0)
    ) {
      switchToSearchMode();
      fetchSearch(true, false);
    } else if (!search.value) {
      switchToNormalMode();
      pagination.reset(perPage.value);
      pagination.done.value = false;
      auto.value = true;
      fetch();
    }
  });

  watch(
    auto,
    (newVal) => {
      if (newVal) fetch();
    },
    {
      immediate: paginationOptions.value.auto,
    },
  );

  watch(perPage, () => {
    pagination.reset(perPage.value);
    if (search.value) {
      switchToSearchMode();
      fetchSearch(true, false);
    } else {
      switchToNormalMode();
      fetch(true, false);
    }
  });

  provide("next", next);
  provide("previous", previous);
  provide("page", pagination.page);
  provide("totalPages", pagination.totalPages);
  provide("searching", searching);
  provide("perPage", perPage);

  const page = computed(() => pagination.page.value);

  function send() {
    pagination.reset();
    fetch();
  }

  return {
    page,
    send,
    search,
    perPage,
    auto,
    totalPages: computed(() => pagination.totalPages.value),
    data: computed<T[]>(() =>
      paginationOptions.value.store && !searching.value
        ? paginationOptions.value.store.getAll()
        : (response.value as T[]),
    ),
    error: req.error,
    pending: req.pending,
    dirty: req.dirty,
    response,
    sortBy: pagination.sortBy,
    ASC: pagination.ASC,
    next,
    previous,
  };
}
