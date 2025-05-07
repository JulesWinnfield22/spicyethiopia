import ApiService from "@/service/ApiService";
import { staticRoute } from "@/utils/utils";

const api = new ApiService();

export function getImage(name: string) {
	return api.get(`${staticRoute}/${name}`, {
		responseType: 'blob'
	})
}