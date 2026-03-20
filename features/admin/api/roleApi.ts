import type { Role } from "~/interface";
import ApiService from "~/service/ApiService";

const paths = "/roles";

export function getRoles() {
  const api = useApiService();
  return api.get<Role[]>(`${paths}`);
}
