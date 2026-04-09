import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

  // SSR hydration support
  if (import.meta.server) {
    nuxtApp.hooks.hook("app:rendered", () => {
      nuxtApp.payload["vue-query"] = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook("app:created", () => {
      const state = nuxtApp.payload["vue-query"];
      if (state) {
        hydrate(queryClient, state);
      }
    });
  }
});
