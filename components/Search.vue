<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "~/utils/utils";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

// Sync local value when prop changes (from parent)
watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
  },
);

const debouncedEmit = debounce((val: string) => {
  emit("update:modelValue", val);
}, 400);

watch(value, () => {
  debouncedEmit(value.value);
});
</script>
<template>
  <div class="relative">
    <i
      class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-black/30"
    ></i>
    <input
      v-model="value"
      type="text"
      placeholder="Search Products"
      class="bg-gray px-10 py-1 rounded-md text-base w-96 h-12"
    />
  </div>
</template>
