import { defineEventHandler } from "h3";

const SITE_URL = "https://store.spicyethiopian.com";

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/shop", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl =
    config.BACKEND_API_URI || "https://api.spicyethiopian.com/api/v1";

  const today = new Date().toISOString().split("T")[0];

  // Build static page entries
  let urls = staticPages
    .map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  // Fetch products and add product URLs
  try {
    const response = await fetch(`${apiUrl}/products/all`);
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      const productUrls = result.data
        .map(
          (product: any) => `  <url>
    <loc>${SITE_URL}/spice/${slugify(product.title)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join("\n");

      urls += "\n" + productUrls;
    }
  } catch (e) {
    console.error("[sitemap] Error fetching products:", e);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  event.node.res.setHeader("Content-Type", "application/xml");
  event.node.res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600"
  );

  return sitemap;
});
