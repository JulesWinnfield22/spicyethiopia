import { ref } from "vue";

const ordersCount = ref(0);
const totalOrdersCount = ref(0);
const productsCount = ref(0);
const messagesCount = ref(0);

export function useDashboardCounts() {
  const setOrdersCount = (count: number) => (ordersCount.value = count);
  const setTotalOrdersCount = (count: number) =>
    (totalOrdersCount.value = count);
  const setProductsCount = (count: number) => (productsCount.value = count);

  return {
    ordersCount,
    totalOrdersCount,
    productsCount,
    messagesCount,
    setOrdersCount,
    setTotalOrdersCount,
    setProductsCount,
  };
}
