import { useMutation } from "@tanstack/vue-query";
import { ref, computed } from "vue";

/**
 * A thin wrapper around TanStack's useMutation that provides the same
 * send(requestFn, callback) API as the old useApiRequest composable.
 *
 * Usage:
 *   const req = useApiMutation()
 *   req.send(() => createUser(values), (res) => { if (res.success) ... })
 */
export function useApiMutation() {
  const response = ref<any>(null);
  const error = ref("");
  const success = ref(false);

  const mutation = useMutation({
    mutationFn: async (args: { request: () => Promise<any> }) => {
      return await args.request();
    },
  });

  const pending = computed(() => mutation.isPending.value);

  function send(
    request: () => Promise<any> = () => Promise.resolve(),
    cb: (res: any) => void = () => {},
  ) {
    if (typeof request !== "function") {
      console.error("useApiMutation: request must be a function");
      return;
    }

    error.value = "";
    success.value = false;

    mutation.mutate(
      { request },
      {
        onSuccess: (res: any) => {
          response.value = res?.data ?? res;
          error.value = res?.error || "";
          success.value = res?.success ?? true;
          cb(res);
        },
        onError: (err: any) => {
          console.error(err);
          error.value = err?.message || "An error occurred";
          success.value = false;
          cb({ success: false, error: err?.message });
        },
      },
    );
  }

  return {
    response,
    send,
    pending,
    error,
    success,
    // Expose raw mutation for advanced usage
    mutation,
  };
}
