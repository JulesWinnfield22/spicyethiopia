import { provide, ref } from "vue";

interface CacheEntry {
  data: any;
  expiresAt: number | null;
  createdAt: number;
}

const cacheStore = new Map<string, CacheEntry>();

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

function setCache(key: string, data: any, ttl = 300) {
  const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
  const cacheEntry: CacheEntry = {
    data,
    expiresAt,
    createdAt: Date.now(),
  };
  cacheStore.set(key, cacheEntry);
  return cacheEntry;
}

export function removeCache(key: string) {
  cacheStore.delete(key);
}

export function useApiRequest(provideValues = true, id?: string) {
  // Use Nuxt's useState if an ID is provided to allow hydration, otherwise use a local ref
  const response = id ? useState<any>(id) : ref<any>();
  const pending = ref(false);
  const error = ref("");
  const dirty = ref(false);
  const success = ref(false);

  if (provideValues) {
    provide("pending", pending);
    provide("error", error);
  }

  function send(
    request: () => Promise<any> = () => Promise.resolve(),
    cb = (f: any) => f,
    remove = false,
    beforeResolve = false,
    cacheKey?: string,
    ttl = 300, // Default 5 minutes
  ) {
    if (typeof request != "function")
      return console.error("can not be called. not a function");

    if (cacheKey) {
      const cachedData = getCache(cacheKey);
      if (cachedData) {
        response.value = cachedData;
        success.value = true;
        cb({ success: true, data: cachedData });
        return;
      }
    }

    pending.value = true;
    error.value = "";
    success.value = false;
    if (remove) {
      response.value = null;
    }

    try {
      dirty.value = true;
      request().then((res: any) => {
        if (beforeResolve) cb(res);

        pending.value = false;
        if (!(typeof cb == "function")) return;

        response.value = res?.data ?? res;
        error.value = res?.error;
        success.value = res.success;

        if (res.success && cacheKey) {
          setCache(cacheKey, response.value, ttl);
        }

        cb(res);
      });
    } catch (err: any) {
      console.error(err);
      pending.value = false;
      error.value = err.message;
      success.value = false;
    }
  }

  return {
    response,
    send,
    pending,
    error,
    success,
    dirty,
  };
}
