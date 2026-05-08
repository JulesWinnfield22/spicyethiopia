// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#7c2d12' },
      ],
    },
  },
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
  css: [
    "~/assets/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
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
    BACKEND_API_URI: process.env.BACKEND_API_URL, // Server-only
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
      routes: ["/", "/shop", "/about", "/contact", "/login"],
      ignore: ["/admin", "/api"],
    },
    async hooks({ nitro }) {
      const apiUrl =
        process.env.BACKEND_API_URL || "https://api.spicyethiopian.com/api/v1";
      try {
        const response = await fetch(`${apiUrl}/products/all`);
        const result = await response.json();
        const slugify = (text: string) =>
          text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");

        if (result.success && Array.isArray(result.data)) {
          const productRoutes = result.data.map(
            (product: any) => `/spice/${slugify(product.title)}`,
          );
          nitro.options.prerender.routes.push(...productRoutes);
          console.log(
            `[nitro] Added ${productRoutes.length} product routes to prerender`,
          );
        }
      } catch (e) {
        console.error(
          "[nitro] Error fetching product routes for prerendering:",
          e,
        );
      }
    },
  },
  routeRules: {
    "/spice/**": { swr: true },
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
          urlPattern: /^https:\/\/api\.spicyethiopian\.com\/static\/.*/i,
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
          urlPattern: /^https:\/\/api\.spicyethiopian\.com\/api\/v1\/.*/i,
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
