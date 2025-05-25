import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export interface CartItem {
  product: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size: number;
  description: string
}

export type PersonalInfo = {
  firstName?: string;
  lastName?: string;
  customerEmail: string;
  phoneNumber: string;
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
  const items = ref<CartItem[]>([]);
  const info = ref<Info>({
    customerInfo: {
      customerEmail: "",
      phoneNumber: ""
    },
    shippingAddress: {
      streetAddress: "",
      apartment: "",
      city: "",
      province: "",
      postalCode: "",
      country: ""
    }
  });

  const initializeCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      items.value = JSON.parse(storedCart);
    }
  };

  watch(
    items,
    (newItems) => {
      localStorage.setItem("cart", JSON.stringify(newItems));
      // Dispatch custom event for components that listen to cart updates
      window.dispatchEvent(new Event("cart-updated"));
    },
    { deep: true }
  );

  const count = computed(() => {
    return items.value.length;
  });

  const total = computed(() => {
    return items.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  });

  const addItem = (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => {
    const existingItemIndex = items.value.findIndex(
      (i) => i.product === item.product && i.size === item.size
    );

    if (existingItemIndex !== -1) {
      items.value[existingItemIndex].quantity += item.quantity || 1;
    } else {
      items.value.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }
  };

  const thisItem = computed(() => {
    return (id: string) => items.value.find((el) => el.product == id);
  });

  const increment = (id: string) => {
    let idx = items.value.findIndex((el) => el.product == id);
    console.log(idx);
    if (idx > -1 && items.value[idx].quantity + 1 <= items.value[idx].size) {
      items.value[idx].quantity += 1;
    }
  };

  const decrement = (id: string) => {
    let idx = items.value.findIndex((el) => el.product == id);
    if (idx > -1 && items.value[idx].quantity - 1 >= 0) {
      items.value[idx].quantity -= 1;
    } else {
      removeItem(id);
    }
  };

  const removeItem = (id: string) => {
    let idx = items.value.findIndex((el) => el.product == id);
    if (idx > -1) {
      items.value.splice(idx, 1);
    }
  };

  function toggleItem(
    item: Omit<CartItem, "quantity"> & { quantity?: number }
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

  // Initialize cart from localStorage
  initializeCart();

  return {
    items,
    count,
    total,
    thisItem,
    addItem,
    increment,
    toggleItem,
    decrement,
    removeItem,
    clearCart,
    info,
  };
});
