// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
  css: ["~/assets/main.css"],
  plugins: [
    { src: "~/plugins/modalx-plugin", mode: "client" },
    "~/plugins/fontawesome.ts",
    "~/plugins/directives.ts",
  ],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  alias: {
    "@": "~/",
  },
  runtimeConfig: {
    BACKEND_API_URI: process.env.NUXT_BACKEND_API_URI, // Server-only
    public: {
      v_API_URI: "/api/proxy", // Frontend calls the proxy
      v_STATIC_FILE_URI: process.env.NUXT_PUBLIC_V_STATIC_FILE_URI,
      v_BASE_URI: process.env.NUXT_PUBLIC_V_BASE_URI,
      v_GEO: process.env.NUXT_PUBLIC_V_GEO,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/shop", "/about", "/contact"],
      ignore: ["/admin"],
    },
  },
  routeRules: {
    "/spice/**": { prerender: true },
    "/admin/**": { ssr: false },
  },
  compatibilityDate: "2024-11-01",
  pwa: {
    disable: true,
    registerType: "autoUpdate",
    injectRegister: null,
    manifest: {
      name: "Spicy Ethiopia",
      short_name: "Spicy Ethiopia",
      theme_color: "#000000",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 15, // 15 MB
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.insmarket5608\.com\/static\/.*/i,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "spicy-images-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/api\.insmarket5608\.com\/api\/v1\/.*/i,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "spicy-api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60, // 24 Hours
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  vite: {
    optimizeDeps: {
      include: ["@customizer/modal-x"],
    },
    ssr: {
      noExternal: ["@customizer/modal-x"],
    },
  },
});
