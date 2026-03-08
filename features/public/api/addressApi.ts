import type { Query } from "~/interface";
import ApiService from "~/service/ApiService";
import type { AxiosRequestConfig } from "axios";

const api = new ApiService();

const path = "/address";

export function getAddress(query: Query) {
  return api.get(path, {
    params: query,
  });
}

export function getAddressAutocomplete(
  search: string,
  config: AxiosRequestConfig = {},
) {
  return api.get(
    `${path}/autocomplete?search=${encodeURIComponent(search)}`,
    config,
  );
}
