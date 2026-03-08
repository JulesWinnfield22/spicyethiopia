export default defineNuxtPlugin(() => {
  if (process.client && "serviceWorker" in navigator) {
    // FORCE UNREGISTER AND CLEAR CACHE
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((success) => {
          if (success) {
            console.log("PWA Service Worker unregistered.");
          }
        });
      }
    });

    // Clear all caches
    if ("caches" in window) {
      window.caches.keys().then((names) => {
        for (const name of names) {
          window.caches.delete(name).then((success) => {
            if (success) {
              console.log(`Cache cleared: ${name}`);
            }
          });
        }
      });
    }
  }
});
