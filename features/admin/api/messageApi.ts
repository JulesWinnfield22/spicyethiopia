import ApiService from "~/service/ApiService";
import type { Query } from "~/interface";

const path = "/messages";

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export function getMessages(query: Query) {
  const api = useApiService();
  return api.addAuthenticationHeader().get<Message[]>(`${path}`, {
    params: query,
  });
}

export function getMessageById(id: string) {
  const api = useApiService();
  return api.addAuthenticationHeader().get<Message>(`${path}/${id}`);
}

export function deleteMessage(id: string) {
  const api = useApiService();
  return api.addAuthenticationHeader().delete(`${path}/${id}`);
}
