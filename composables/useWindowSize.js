import { watchEffect } from "vue";
import { ref, onMounted, onUnmounted, onUpdated } from "vue";

const size = ref({
  width: 0,
  height: 0,
});

export const useWindowSize = () => {
  watchEffect((cleanup) => {
    let to = 0;
    let observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (to) clearTimeout(to);
        to = setTimeout(() => {
          size.value.width = entry.contentRect.width;
          size.value.height = entry.contentRect.height;
        }, 300);
      });
    });

    observer && observer.observe(document.body);
    return cleanup(() => {
      observer && observer.disconnect();
    });
  });

  return size;
};
