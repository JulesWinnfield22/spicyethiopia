<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useToast } from "./store/toast";
import icons from "~/utils/icons";
//import { mdiClose } from '@mdi/js'
const { removeToast } = useToast();
const props = defineProps({
  toast: {
    type: Object,
    required: true,
  },
  id: String,
  index: Number,
  total: Number,
});

const t = ref();

let timeout: any;

function removeT() {
  clearTimeout(timeout);
  if (t.value) {
    t.value.classList.add("leave");
    t.value.onanimationend = () => {
      props?.id && removeToast(props?.id);
    };
  } else {
    props?.id && removeToast(props?.id);
  }
}

onMounted(() => {
  if (!props.toast.duration || props.toast.duration !== 0) {
    timeout = setTimeout(
      () => props.id && removeT(),
      props.toast.duration || 6000,
    );
  }
});

function stay() {
  clearTimeout(timeout);
}

function out() {
  if (!props.toast.duration || props.toast.duration !== 0) {
    timeout = setTimeout(
      () => props.id && removeT(),
      props.toast.duration || 6000,
    );
  }
}

const stackStyle = computed(() => {
  const i = props.index || 0;
  const scale = 1 - i * 0.05;
  const translateY = i * -12;
  const opacity = 1 - i * 0.2;
  return {
    transform: `translateY(${translateY}px) scale(${scale})`,
    opacity: Math.max(0, opacity),
    zIndex: (props.total || 0) - i,
    pointerEvents: (i === 0 ? "auto" : "none") as any,
  };
});
</script>

<template>
  <div
    @mouseout="out"
    @mouseover="stay"
    ref="t"
    :style="stackStyle"
    :class="[
      $style.toast,
      $style[toast?.type || 'info'],
      index === 0 ? 'enter' : '',
    ]"
  >
    <div class="flex-1">
      <component
        v-if="toast.component"
        :is="toast.component"
        v-bind="toast.props"
      />
      <p v-else class="text-sm font-medium">{{ toast?.message }}</p>
    </div>
    <button
      @click="removeT"
      class="ml-4 p-1 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
    >
      <span class="w-4 h-4" v-html="icons.close" />
    </button>
  </div>
</template>

<style module>
.toast {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1rem;
  border-radius: 1rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  transform-origin: bottom center;
}

.error {
  border: 1px solid #f43f5e;
  border-left: 4px solid #f43f5e;
  background: linear-gradient(to right, rgba(244, 63, 94, 0.05), transparent);
  color: black;
}

.success {
  border-left: 4px solid #10b981;
}

.info {
  border-left: 4px solid #6366f1;
}

.warning {
  border-left: 4px solid #f97316;
}
</style>

<style>
.enter {
  animation: toast-enter 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
}

.leave {
  animation: toast-leave 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes toast-enter {
  0% {
    opacity: 0;
    transform: translateY(1rem) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toast-leave {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(0.5rem) scale(0.9);
  }
}
</style>
