import ApiService from "~/service/ApiService";
import { staticRoute } from "~/utils/utils";

export function getImage(name: string) {
  const api = useApiService();
  return api.addAuthenticationHeader().get(`${staticRoute}/${name}`, {
    responseType: "blob",
  });
}
