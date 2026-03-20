import axios from "axios";
import { responseHandler } from "./ApiResponseHandler";
import type { AsyncResponse } from "~/interface";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuth } from "~/features/admin/store/authStore";
import { tryUseNuxtApp } from "#app";

export default class ApiService {
  api: AxiosInstance | null = null;
  private baseURL?: string;
  private withAuth = false;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  private getApi(): AxiosInstance {
    if (this.api) return this.api;

    let base = this.baseURL;
    if (!base) {
      const nuxt = tryUseNuxtApp();
      if (nuxt) {
        try {
          const config = useRuntimeConfig();
          base = (
            import.meta.server
              ? config.BACKEND_API_URI
              : config.public.v_API_URI
          ) as string;
        } catch (e) {
          base = "";
        }
      } else {
        base = "";
      }
    }

    this.api = axios.create({
      baseURL: base,
      validateStatus: (status: number) => {
        return status < 300 && status >= 200;
      },
      // Ensure cookies are sent (useful for same-origin proxy calls)
      withCredentials: true,
    });
    return this.api;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};
    if (this.withAuth) {
      let token: string | null | undefined = null;
      const nuxt = tryUseNuxtApp();
      if (!nuxt) {
        this.withAuth = false;
        return headers;
      }

      if (import.meta.server) {
        token = useCookie("auth_token").value;
      } else {
        // On client, get from Pinia or cookie
        const auth = useAuth();
        token = auth.auth?.token || useCookie<any>("auth_user").value?.token;
      }

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    // Reset flag for next request if this is a singleton
    this.withAuth = false;
    return headers;
  }

  async get<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AsyncResponse<T>> {
    const api = this.getApi();
    const authHeaders = await this.getAuthHeaders();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...authHeaders,
        },
        url,
        method: "get",
      }),
    );
  }

  async post<T, D = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ) {
    const api = this.getApi();
    const authHeaders = await this.getAuthHeaders();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...authHeaders,
        },
        data,
        url,
        method: "post",
      }),
    );
  }

  async put<T, D = any>(url: string, data: D, config: AxiosRequestConfig = {}) {
    const api = this.getApi();
    const authHeaders = await this.getAuthHeaders();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...authHeaders,
        },
        data,
        url,
        method: "put",
      }),
    );
  }

  async patch<T, D = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ) {
    const api = this.getApi();
    const authHeaders = await this.getAuthHeaders();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...authHeaders,
        },
        data,
        url,
        method: "patch",
      }),
    );
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}) {
    const api = this.getApi();
    const authHeaders = await this.getAuthHeaders();
    return await responseHandler(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
          ...authHeaders,
        },
        url,
        method: "delete",
      }),
    );
  }

  addAuthenticationHeader() {
    this.withAuth = true;
    return this;
  }
}
