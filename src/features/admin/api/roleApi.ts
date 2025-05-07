import type { Role } from "@/interface";
import ApiService from "@/service/ApiService";

const api = new ApiService();

const paths = '/roles'

export function getRoles() {
  return api.get<Role[]>(`${paths}`);
}