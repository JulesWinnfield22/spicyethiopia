import type { AsyncResponse } from "~/interface";
import { addToast } from "~/toast";
import { jwtDecode } from "jwt-decode";

export const DISCOUNT_STATUS = ["ACTIVE", "INACTIVE"];
export const staticRoute = {
  toString() {
    try {
      return useRuntimeConfig().public.v_STATIC_FILE_URI || "";
    } catch (e) {
      return "";
    }
  },
} as unknown as string;

// Note: In Nuxt it's better to use useRuntimeConfig().public.v_STATIC_FILE_URI directly inside components.
export const weightUnit = ["g", "kg", "ml", "l"];

export function* idGenerator() {
  let id = 1;
  while (true) {
    yield `generated_id_${id++}`;
  }
}

export function getNestedValue(obj: any, key: string) {
  return key.split(".").reduce((current, prop) => {
    return current?.[prop];
  }, obj);
}

export function dateFormat(date?: Date | string) {
  if (!date) return "";
  if (typeof date == "string") {
    let d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } else if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

export function getObjUrl(file: File) {
  return URL.createObjectURL(file);
}

export function toFormData<T extends { [key: string]: any }>(
  data: T,
  arrays: (keyof T)[] = [],
): FormData {
  let fd = new FormData();
  Object.keys(data).forEach((el) => {
    if (arrays.includes(el)) {
      Array.isArray(data[el]) &&
        data[el].forEach((ary) => {
          fd.append(el, ary);
        });
    } else {
      fd.append(el, data[el]);
    }
  });

  return fd;
}

export async function allRequest(
  funs: Record<string, Promise<any>>,
): Promise<AsyncResponse> {
  try {
    const keys = Object.keys(funs);

    const res = await Promise.all(keys.map((name) => funs[name]));

    return {
      success: res.every((r) => r.success),
      data: keys.reduce((state: any, name, idx) => {
        state[name] = res[idx]?.data;
        return state;
      }, {}),
      status: 200,
      error: keys.reduce((state: any, name, idx) => {
        state[name] = res[idx]?.error;
        return state;
      }, {}),
    };
  } catch (err: any) {
    return {
      success: false,
      data: null,
      status: err?.response?.status,
      error: err?.message,
    };
  }
}

type SubmitFuncArg<T> = {
  values: T;
  reset?: Function;
};
export type FormSubmitFunc<T> = (args: SubmitFuncArg<T>) => void;
export const genId = idGenerator();

export const ProductsStatus = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
};

export function isTokenExpired(token: string) {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken?.exp ? decodedToken.exp < currentTime : true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}
export const USER_STATUS = ["ACTIVE", "PENDING", "SUSPENDED", "All"];

export const toast = {
  success: (message: string) => {
    addToast({
      type: "success",
      message,
    });
  },
  error: (message: string) => {
    addToast({
      type: "error",
      message,
    });
  },
};

export const appToast = toast;

export function toasted(type: boolean, succMsg: string, errMsg: string) {
  if (type) {
    toast.success(succMsg);
  } else {
    toast.error(errMsg);
  }
}

export function debounce(fn: Function, delay: number) {
  let timeoutId: any;
  return function (this: any, ...args: any[]) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function currencyFormat(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD", // or USD depending on your locale
  }).format(amount);
}

export function phoneFormat(phone: string) {
  if (!phone) return "";
  // Basic format cleanup
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
};
