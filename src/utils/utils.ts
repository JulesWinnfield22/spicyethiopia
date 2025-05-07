import type { AsyncResponse } from "@/interface";
import { addToast } from "@/toast";
import { jwtDecode } from "jwt-decode";

export const staticRoute = import.meta.env?.v_STATIC_FILE_URI;
export const weightUnit = ["g", "kg", "ml", "l"];

export function* idGenerator() {
  let id = 1;
  while (true) {
    yield `generated_id_${id++}`;
  }
}

export function getObjUrl(file: File) {
  return URL.createObjectURL(file);
}

export function toFormData<T extends { [key: string]: any }>(
  data: T,
  arrays: (keyof T)[] = []
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

export async function allRequest(funs: any): Promise<AsyncResponse> {
  try {
    const keys = Object.keys(funs);

    const res = await Promise.all(keys.map((name) => funs[name]));

    return {
      success: res.every((r) => r.success),
      data: keys.reduce((state, name, idx) => {
        state[name] = res[idx]?.data;
        return state;
      }, {}),
      status: 200,
      error: keys.reduce((state, name, idx) => {
        state[name] = res[idx]?.error;
        return state;
      }, {}),
    };
  } catch (err) {
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

export function toasted(type: boolean, succMsg: string, errMsg: string) {
  if (type) {
    toast.success(succMsg);
  } else {
    toast.error(errMsg);
  }
}
