import { provide, ref } from "vue";

export function useTablePagination(
  responseLimit = 25,
  initialSortBy: string | null = null,
  initialAsc: boolean | null = null,
) {
  const page = ref(0);
  const search = ref("");
  const totalPages = ref(1);
  const limit = ref(responseLimit);
  const maxPage = ref<number>();

  const sortBy = ref<string | null>(initialSortBy);
  const ASC = ref<boolean | null>(initialAsc);

  const done = ref(false);

  function reset(newLimit?: number) {
    page.value = 0;
    if (newLimit !== undefined) {
      limit.value = newLimit;
    }
    done.value = false;
  }

  function next() {
    if (page.value < totalPages.value) {
      page.value++;
    }
  }

  function prev() {
    if (page.value > 0) {
      page.value--;
    }
  }

  function setPage(num: number) {
    page.value = num;
  }

  provide("page", page);
  provide("limit", limit);
  provide("totalPages", totalPages);
  provide("setPage", setPage);
  provide("sortBy", sortBy);
  provide("ASC", ASC);

  return {
    reset,
    search,
    page,
    limit,
    done,
    totalPages,
    maxPage,
    sortBy,
    ASC,
    setPage,
    next,
    prev,
  };
}
