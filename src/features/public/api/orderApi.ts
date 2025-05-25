import type { Query } from "@/interface";
import ApiService from "@/service/ApiService";

const api = new ApiService()

const path = '/orders'

export function genCheckOutUrl(order: any) {
	return api.post(`${path}/guest`, order)
}

export function getOrders(query: Query) {
	return api.addAuthenticationHeader().get(`${path}`, {
		params: query
	})
 }