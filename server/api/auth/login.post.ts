import { defineEventHandler, readBody, setCookie, getHeader } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  try {
    const response: any = await $fetch(`${config.BACKEND_API_URI}/login`, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    if (response) {
      const { token, ...fullUser } = response;

      // Prune user object to avoid exceeding 4KB cookie limit
      const user = {
        id: fullUser.id,
        email: fullUser.email,
        roleName: fullUser.roleName,
        firstName: fullUser.firstName,
        fathersName: fullUser.fathersName,
        roles:
          fullUser.roles?.map((r: any) => ({ id: r.id, name: r.name })) || [],
      };

      // Set auth_token cookie (HttpOnly for security)
      setCookie(event, "auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      // Set auth_user cookie (Accessible by client to sync Pinia)
      setCookie(event, "auth_user", JSON.stringify(user), {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
        status: 200,
        data: user,
      };
    }

    return {
      success: false,
      status: 401,
      error: response.error || "Login failed",
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.status || 500,
      error: error.data?.message || error.message || "Login failed",
    };
  }
});
