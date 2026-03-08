import { defineEventHandler, proxyRequest, getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "auth_token");

  // Get the path after /api/proxy/
  const path = event.path.replace(/^\/api\/proxy/, "");
  const targetUrl = `${config.BACKEND_API_URI}${path}`;

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return proxyRequest(event, targetUrl, {
    headers,
  });
});
