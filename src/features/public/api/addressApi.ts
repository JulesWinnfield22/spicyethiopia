import type { Query } from "@/interface";
import ApiService from "@/service/ApiService";

const api = new ApiService()

const path = '/address'

export function getAddress(query: Query) {
	return api.get(path, {
		params: query
	})
}