import { defineEventHandler, getCookie } from "h3";

export default defineEventHandler((event) => {
  const user = getCookie(event, "auth_user");
  const token = getCookie(event, "auth_token");

  if (!user || !token) {
    return {
      success: false,
      status: 401,
      error: "Not authenticated",
    };
  }

  try {
    return {
      success: true,
      status: 200,
      data: JSON.parse(user),
    };
  } catch (e) {
    return {
      success: false,
      status: 500,
      error: "Invalid session",
    };
  }
});
