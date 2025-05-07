import { useProductsStore } from '@/features/admin/store/productsStore';
import { generateEthiopianProducts } from '@/utils/fakeProductData';

/**
 * Populate the products store with fake Ethiopian-themed products
 * @param count Number of products to generate
 */
export function populateProductsStore(count: number = 15): void {
  const productsStore = useProductsStore();
  
  // Clear existing products if needed
  // productsStore.products.length = 0;
  
  // Generate and add fake products
  const fakeProducts = generateEthiopianProducts(count);
  productsStore.set(fakeProducts);
  
  console.log(`Added ${count} fake Ethiopian products to the store`);
}

/**
 * Get a single fake product for form testing
 */
export function getFakeProductFormData() {
  const fakeProducts = generateEthiopianProducts(1);
  return fakeProducts[0];
}
