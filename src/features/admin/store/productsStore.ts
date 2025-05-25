import { defineStore } from "pinia";
import { ref } from "vue";

export type ProductImage = { name: ""; file: File }
export interface Product {
  id: string;
  title: string;
  images: string[] | ProductImage[];
  description: string;
  ingredients: string[];
  instructions: string[];
  price: number;
  discountPercentage: number;
  discountExpiry?: Date;
  discountedPrice: number;
  isDiscounted: boolean;
  weight: string;
  weightUnit: "g" | "kg" | "ml" | "l";
  quantity: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const useProductsStore = defineStore("productStore", () => {
  const products = ref<Product[]>([]);

  function getAll() {
    return products.value;
  }

  function set(data: Product[]) {
    products.value = data;
  }

  function add(data: Product) {
    products.value.unshift(data);
  }

  function update(id: string, data: Product) {
    const index = products.value.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...data };
    }
  }

  function remove(id: string) {
    const index = products.value.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.value.splice(index, 1);
    }
  }

  return {
    products,
    getAll,
    set,
    add,
    update,
    remove,
  };
});
