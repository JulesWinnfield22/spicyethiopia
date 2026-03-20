import type { Role, User } from "~/interface";
import ApiService from "~/service/ApiService";

const paths = "/";

export function login(data: any) {
  return $fetch<any>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}
