import type { Role, User } from "@/interface";
import ApiService from "@/service/ApiService";

const api = new ApiService();

const paths = '/'

export function login(data: any) {
	return api.post<User>('/login', data);
}