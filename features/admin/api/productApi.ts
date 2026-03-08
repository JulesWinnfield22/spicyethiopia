import type { AsyncResponse, Query } from "~/interface";
import ApiService from "~/service/ApiService";
import type { Product } from "../store/productsStore";

const api = new ApiService();

const path = "/products";

/**
 * Get all products
 * @returns Promise with array of products
 */
export function getProducts(query: Query) {
  return api.get<Product[]>(`${path}/all`, {
    params: query,
  });
}

export function getProductById(id: string) {
  return api.get<Product>(`${path}/${id}`);
}

/**
 * Get a specific product by slug
 * @param slug Product slug
 * @returns Promise with product data
 */
export function getProductBySlug(slug: string) {
  return api.get<Product>(`${path}/slug/${slug}`);
}

/**
 * Create a new product
 * @param productData Product data to create
 * @returns Promise with created product data
 */
export function createProduct(productData: FormData) {
  return api.addAuthenticationHeader().post<Product>(`${path}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * Update an existing product
 * @param id Product ID
 * @param productData Updated product data
 * @returns Promise with updated product data
 */
export function updateProduct(id: string, productData: FormData) {
  return api
    .addAuthenticationHeader()
    .put<Product, FormData>(`${path}/${id}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

/**
 * Delete a product
 * @param id Product ID
 * @returns Promise with deletion status
 */
export function deleteProduct(id: string) {
  return api.delete(`${path}/${id}`);
}

/**
 * Update product status
 * @param id Product ID
 * @param status New status
 * @returns Promise with updated product data
 */
export function updateProductStatus(id: string, status: string) {
  return api.patch<Product, { status: string }>(`${path}/${id}/status`, {
    status,
  });
}

export function getTopDeals() {
  return api.get<Product[]>(`${path}/top-deals`);
}

export function getDealsOfTheMonth() {
  return api.get<Product[]>(`${path}/deals-of-the-month`);
}
