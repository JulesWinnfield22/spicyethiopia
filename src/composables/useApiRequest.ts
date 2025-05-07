import { provide, ref } from "vue";

export function useApiRequest(provideValues = true) {
  const response = ref();
  const pending = ref(false);
  const error = ref("");
  const dirty = ref(false);
  const success = ref(false);

  if (provideValues) {
    provide("pending", pending);
    provide("error", error);
  }

  function send(
    request = (f: any) => f,
    cb = (f: any) => f,
    remove = false,
    beforeResolve = false
  ) {
    if (typeof request != "function")
      return console.error("can not be called. not a function");

    pending.value = true;
    error.value = "";
    success.value = false
    if (remove) {
      response.value = null;
    }
    // return new Promise((resolve, reject) => {
    try {
      dirty.value = true;
      request().then((res: any) => {
        if (beforeResolve) cb(res);

        // setTimeout(() => {
        pending.value = false;
        if (!(typeof cb == "function")) return; //resolve(res);

        response.value = res?.data ?? res;
        error.value = res?.error;
        success.value = res.success
        cb(res);
        // resolve(res);
        // }, 0);
      });
    } catch (err: any) {
      console.error(err);
      pending.value = false;
      error.value = err.message;
      success.value = false
      // reject(error.value)
    }
    // });
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
