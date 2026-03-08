import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Discount {
  id: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  status: string;
}

export const useDiscountsStore = defineStore("discountsStore", () => {
  const discounts = ref<Discount[]>([]);

  function getAll() {
    return discounts.value;
  }

  function set(data: Discount[]) {
    discounts.value = data;
  }

  function add(data: Discount) {
    discounts.value.unshift(data);
  }

  function update(id: string, data: Discount) {
    const index = discounts.value.findIndex((discount) => discount.id === id);
    if (index !== -1) {
      discounts.value[index] = { ...discounts.value[index], ...data };
    }
  }

  function remove(id: string) {
    const index = discounts.value.findIndex((discount) => discount.id === id);
    if (index !== -1) {
      discounts.value.splice(index, 1);
    }
  }

  return {
    discounts,
    getAll,
    set,
    add,
    update,
    remove,
  };
});