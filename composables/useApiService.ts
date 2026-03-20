import ApiService from "~/service/ApiService";

export function useApiService(baseURL?: string) {
  return new ApiService(baseURL);
}
