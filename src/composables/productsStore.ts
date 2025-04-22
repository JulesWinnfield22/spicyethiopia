import { ref } from "vue";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  sku?: string;
  weight?: string;
  quantity: number;
  stock?: number; // Optional field
  status: string;
  category?: string; // if you're using this too
}

const products = ref<Product[]>([]);

export function useProductsStore() {
  const addProduct = (product: Product) => {
    products.value.push(product);
  };

  const getProducts = () => products.value;

  return {
    products,
    addProduct,
    getProducts,
  };
}
