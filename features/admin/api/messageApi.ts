import ApiService from "~/service/ApiService";
import type { Query } from "~/interface";

const api = new ApiService();
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
  return api.addAuthenticationHeader().get<Message[]>(`${path}`, {
    params: query,
  });
}

export function getMessageById(id: string) {
  return api.addAuthenticationHeader().get<Message>(`${path}/${id}`);
}

export function deleteMessage(id: string) {
  return api.addAuthenticationHeader().delete(`${path}/${id}`);
}
