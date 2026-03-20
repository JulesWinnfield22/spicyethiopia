import { defineStore } from "pinia";
import { computed, watch } from "vue";
import { useCookie } from "#app";

export interface CartItem {
  product: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  size: number;
}

export type PersonalInfo = {
  firstName?: string;
  lastName?: string;
  customerEmail: string;
  phoneNumber: string;
  notes?: string;
};

export type ShippingInfo = {
  streetAddress: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

type Info = {
  customerInfo?: PersonalInfo;
  shippingAddress?: ShippingInfo;
};

export const useCartStore = defineStore("cart", () => {
  // We use useCookie WITHOUT a default to prevent overwriting existing cookies during SSR/Hydration.
  const items = useCookie<CartItem[]>("cart", {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    watch: true,
    path: "/",
    sameSite: "lax",
    secure: false,
  });

  const info = useCookie<Info>("cart-info", {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    watch: true,
    path: "/",
    sameSite: "lax",
    secure: false,
  });

  // Watch for changes to items to dispatch updates to other components if needed
  watch(
    () => items.value,
    () => {
      if (process.client) {
        window.dispatchEvent(new Event("cart-updated"));
      }
    },
    { deep: true },
  );

  const count = computed(() => {
    return items.value?.length || 0;
  });

  const total = computed(() => {
    return (items.value || []).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  });

  const addItem = (
    item: Omit<CartItem, "quantity"> & { quantity?: number },
  ) => {
    const currentItems = [...(items.value || [])];
    const existingItemIndex = currentItems.findIndex(
      (i) => i.product === item.product && i.size === item.size,
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity || 1;
    } else {
      currentItems.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }
    items.value = currentItems;
  };

  const thisItem = computed(() => {
    return (id: string) => (items.value || []).find((el) => el.product == id);
  });

  const increment = (id: string) => {
    const currentItems = [...(items.value || [])];
    let idx = currentItems.findIndex((el) => el.product == id);
    if (idx > -1 && currentItems[idx].quantity + 1 <= currentItems[idx].size) {
      currentItems[idx].quantity += 1;
      items.value = currentItems;
    }
  };

  const decrement = (id: string) => {
    const currentItems = [...(items.value || [])];
    let idx = currentItems.findIndex((el) => el.product == id);
    if (idx > -1 && currentItems[idx].quantity - 1 >= 0) {
      currentItems[idx].quantity -= 1;
      items.value = currentItems;
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id: string) => {
    const currentItems = [...(items.value || [])];
    let idx = currentItems.findIndex((el) => el.product == id);
    if (idx > -1) {
      currentItems.splice(idx, 1);
      items.value = currentItems;
    }
  };

  function toggleItem(
    item: Omit<CartItem, "quantity"> & { quantity?: number },
  ) {
    if (thisItem.value(item.product)) {
      removeItem(item.product);
    } else {
      addItem(item);
    }
  }

  const clearCart = () => {
    items.value = [];
  };

  const safeInfo = computed(() => {
    return {
      customerInfo: info.value?.customerInfo || {
        customerEmail: "",
        phoneNumber: "",
        notes: "",
      },
      shippingAddress: info.value?.shippingAddress || {
        streetAddress: "",
        apartment: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
      },
    };
  });

  return {
    items: computed(() => items.value || []),
    info: safeInfo,
    count,
    total,
    thisItem,
    addItem,
    increment,
    toggleItem,
    decrement,
    removeItem,
    clearCart,
  };
});
