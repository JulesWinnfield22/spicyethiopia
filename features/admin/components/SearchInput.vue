<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  width?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const inputWidth = computed(() => props.width || 'w-96');
</script>

<template>
  <div class="relative">
    <i
      class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-black/30"
    ></i>
    <input
      :value="modelValue"
      @input="updateValue"
      type="text"
      :placeholder="placeholder || 'Search'"
      :class="`bg-gray px-10 rounded-md text-base ${inputWidth} h-11`"
    />
  </div>
</template>
