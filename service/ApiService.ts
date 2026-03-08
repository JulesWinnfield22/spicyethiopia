import axios from "axios";
import { responseHandler } from "./ApiResponseHandler";
import type { AsyncResponse } from "~/interface";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useAuth } from "~/features/admin/store/authStore";

export default class ApiService {
  api: AxiosInstance | null = null;
  private baseURL?: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  private getApi(): AxiosInstance {
    if (this.api) return this.api;

    let base = this.baseURL;
    if (!base) {
      // Try to get from runtime config, but handle cases where it's not available
      try {
        const config = useRuntimeConfig();
        base = config.public.v_API_URI as string;
      } catch (e) {
        // Fallback for non-Nuxt context or early initialization
        base = "";
      }
    }

    this.api = axios.create({
      baseURL: base,
      validateStatus: (status: number) => {
        return status < 300 && status >= 200;
      },
    });
    return this.api;
  }

  async get<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AsyncResponse<T>> {
    const api = this.getApi();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
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
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
        },
        data,
        url,
        method: "post",
      }),
    );
  }

  async put<T, D = any>(url: string, data: D, config: AxiosRequestConfig = {}) {
    const api = this.getApi();
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
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
    return await responseHandler<T>(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
        },
        data,
        url,
        method: "patch",
      }),
    );
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}) {
    const api = this.getApi();
    return await responseHandler(
      api({
        ...config,
        headers: {
          ...(config?.headers || {}),
        },
        url,
        method: "delete",
      }),
    );
  }

  addAuthenticationHeader() {
    // No-op: The Nitro proxy handles authentication headers securely via HttpOnly cookies.
    return this;
  }
}
