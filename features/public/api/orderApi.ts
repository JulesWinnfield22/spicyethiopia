import type { Query } from "~/interface";
import ApiService from "~/service/ApiService";

const path = "/orders";

export function genCheckOutUrl(order: any, orderId?: string) {
  const api = useApiService();
  const url = orderId ? `${path}/${orderId}/guest` : `${path}/guest`;
  return api.post(url, order);
}

export function getOrders(query: Query) {
  const api = useApiService();
  return api.addAuthenticationHeader().get(`${path}`, {
    params: query,
  });
}

export function getOrderById(id: string) {
  const api = useApiService();
  return api.addAuthenticationHeader().get(`${path}/${id}`);
}

export function shipOrder(
  id: string,
  payload: { trackingNumber?: string; carrier?: string },
) {
  const api = useApiService();
  return api.addAuthenticationHeader().patch(`${path}/${id}/ship`, payload);
}
