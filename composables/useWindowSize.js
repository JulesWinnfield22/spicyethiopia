import { ref, onMounted, onUnmounted } from "vue";

const size = ref({
  width: typeof window !== "undefined" ? window.innerWidth : 1024, // Default to a standard desktop width
  height: typeof window !== "undefined" ? window.innerHeight : 768,
});

export const useWindowSize = () => {
  if (typeof window === "undefined") return size;

  let to = 0;
  let observer = null;

  onMounted(() => {
    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (to) clearTimeout(to);
        to = setTimeout(() => {
          size.value.width = entry.contentRect.width;
          size.value.height = entry.contentRect.height;
        }, 100);
      }
    });

    observer.observe(document.body);
    // Sync initial size
    size.value.width = window.innerWidth;
    size.value.height = window.innerHeight;
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return size;
};
