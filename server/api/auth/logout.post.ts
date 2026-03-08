import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler((event) => {
  deleteCookie(event, "auth_token");
  deleteCookie(event, "auth_user");

  return {
    success: true,
    status: 200,
    data: { message: "Logged out successfully" },
  };
});
