export async function clearAllSiteCache() {
  console.log("[Cache] Starting PWA/Service Worker cache clear...");

  // 1. Clear Browser Storage (PRESERVED per user request)
  // localStorage.clear();
  // sessionStorage.clear();

  // 2. Clear Service Worker Caches
  if (process.client) {
    // 3. Clear Service Worker Caches
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
        console.log("[Cache] Deleted SW caches:", cacheNames);
      } catch (err) {
        console.error("[Cache] Failed to delete caches:", err);
      }
    }

    // 4. Unregister Service Workers
    if ("serviceWorker" in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log("[Cache] Unregistered SW:", registration);
        }
      } catch (err) {
        console.error("[Cache] Failed to unregister SW:", err);
      }
    }

    // 4. Force reload if necessary (optional, but good for total reset)
    // window.location.reload();
  }

  console.log("[Cache] Full site cache clear completed.");
}
