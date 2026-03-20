import { defineEventHandler, proxyRequest, getCookie } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "auth_token");

  // Get the path after /api/proxy/
  const path = event.path.replace(/^\/api\/proxy/, "");
  const targetUrl = `${config.BACKEND_API_URI}${path}`;

  // Get all incoming headers
  const incomingHeaders = getHeaders(event);

  const headers: Record<string, string> = {};

  // Forward relevant headers (you might want to whitelist these)
  const headersToForward = [
    "content-type",
    "accept",
    "accept-language",
    "user-agent",
  ];
  for (const h of headersToForward) {
    if (incomingHeaders[h]) {
      headers[h] = incomingHeaders[h] as string;
    }
  }

  // Ensure Authorization header is set from the secure HttpOnly cookie if available
  // This takes precedence for security
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (incomingHeaders["authorization"]) {
    // Fallback: forward the browser's Authorization header if no cookie
    headers["Authorization"] = incomingHeaders["authorization"] as string;
  }

  return proxyRequest(event, targetUrl, {
    headers,
  });
});
