import type { Query } from "~/interface";
import ApiService from "~/service/ApiService";

const path = '/discounts'

const api = new ApiService()

/**
 * Get all discounts
 * @returns Promise with discount data
 */
export function getAllDiscounts(params?: Query) {
  return api.addAuthenticationHeader().get(`${path}`, { params });
}

/**
 * Create a new discount
 * @param discountData Discount data to create
 * @returns Promise with created discount data
 */
export function createDiscount(discountData: any) {
  return api.addAuthenticationHeader().put(`${path}`, discountData);
}

/**
 * Update an existing discount
 * @param id Discount ID
 * @param discountData Updated discount data
 * @returns Promise with updated discount data
 */
export function updateDiscount(id: string, discountData: any) {
  return api.addAuthenticationHeader().put(`${path}/${id}`, discountData);
}

/**
 * Delete a discount
 * @param id Discount ID
 * @returns Promise with success status
 */
export function deleteDiscount(id: string) {
  return api.addAuthenticationHeader().delete(`${path}/${id}`);
}

/**
 * Add a discount to a specific product
 * @param productId Product ID
 * @param discountData Discount data to apply
 * @returns Promise with created product discount data
 */
export function addProductDiscount(productId: string, discountData: any) {
  return api.addAuthenticationHeader().post(`${path}/product/${productId}`, discountData);
}

/**
 * Get discount for a specific product
 * @param productId Product ID
 * @returns Promise with product discount data
 */
export function getProductDiscount(productId: string) {
  return api.addAuthenticationHeader().get(`${path}/${productId}`);
}

/**
 * Update discount for a specific product
 * @param productId Product ID
 * @param discountData Updated discount data
 * @returns Promise with updated product discount data
 */
export function updateProductDiscount(productId: string, discountData: any) {
  return api.addAuthenticationHeader().put(`${path}/${productId}`, discountData);
}

/**
 * Remove discount from a specific product
 * @param productId Product ID
 * @returns Promise with success status
 */
export function removeProductDiscount(productId: string) {
  return api.addAuthenticationHeader().delete(`${path}/product/${productId}`);
}
