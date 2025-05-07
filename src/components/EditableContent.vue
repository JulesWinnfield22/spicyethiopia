<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Button from "@/components/Button.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text' // text, image, richtext, etc.
  },
  placeholder: {
    type: String,
    default: 'Click to edit'
  }
});

const emit = defineEmits(['update:modelValue', 'save']);

const localValue = ref(props.modelValue);
const isEditing = ref(false);

watch(() => props.modelValue, (newVal) => {
  if (!isEditing.value) {
    localValue.value = newVal;
  }
});

const canEdit = computed(() => props.editMode);

function startEditing() {
  if (canEdit.value) {
    isEditing.value = true;
  }
}

function saveChanges() {
  isEditing.value = false;
  emit('update:modelValue', localValue.value);
  emit('save', localValue.value);
}

function cancelEditing() {
  isEditing.value = false;
  localValue.value = props.modelValue;
}

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  localValue.value = target.value;
}

function updateImageValue(file: File) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      localValue.value = e.target?.result as string;
      emit('update:modelValue', localValue.value);
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <div class="relative group">
    <!-- Text content -->
    <div v-if="type === 'text'" class="w-full">
      <div 
        v-if="!isEditing" 
        @click="startEditing"
        class="min-h-[1.5rem] p-2 rounded transition-colors"
        :class="{ 'hover:bg-gray-100 cursor-pointer': canEdit }"
      >
        {{ modelValue || placeholder }}
      </div>
      <div v-else class="flex flex-col gap-2">
        <input 
          type="text" 
          v-model="localValue" 
          @input="updateValue"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          :placeholder="placeholder"
        />
        <div class="flex gap-2 justify-end">
          <Button size="xs" @click="cancelEditing">Cancel</Button>
          <Button size="xs" type="primary" @click="saveChanges">Save</Button>
        </div>
      </div>
    </div>

    <!-- Rich text content -->
    <div v-else-if="type === 'richtext'" class="w-full">
      <div 
        v-if="!isEditing" 
        @click="startEditing"
        class="min-h-[1.5rem] p-2 rounded transition-colors"
        :class="{ 'hover:bg-gray-100 cursor-pointer': canEdit }"
        v-html="modelValue || placeholder"
      ></div>
      <div v-else class="flex flex-col gap-2">
        <textarea 
          v-model="localValue" 
          @input="updateValue"
          class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          :placeholder="placeholder"
        ></textarea>
        <div class="flex gap-2 justify-end">
          <Button size="xs" @click="cancelEditing">Cancel</Button>
          <Button size="xs" type="primary" @click="saveChanges">Save</Button>
        </div>
      </div>
    </div>

    <!-- Image content -->
    <div v-else-if="type === 'image'" class="w-full">
      <div 
        v-if="!isEditing" 
        @click="startEditing"
        class="relative group"
      >
        <img 
          :src="modelValue" 
          class="w-full h-full object-cover rounded"
          alt="Content image"
        />
        <div 
          v-if="canEdit" 
          class="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
        >
          <span class="text-white">Click to edit</span>
        </div>
      </div>
      <div v-else class="flex flex-col gap-2">
        <input 
          type="file" 
          accept="image/*" 
          @change="updateImageValue(($event.target as HTMLInputElement).files?.[0])"
          class="w-full p-2 border rounded"
        />
        <div class="flex gap-2 justify-end">
          <Button size="xs" @click="cancelEditing">Cancel</Button>
          <Button size="xs" type="primary" @click="saveChanges">Save</Button>
        </div>
      </div>
    </div>

    <!-- Edit indicator -->
    <div 
      v-if="canEdit && !isEditing" 
      class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button 
        @click="startEditing"
        class="bg-blue-500 text-white p-1 rounded-full"
      >
        <i class="fa-solid fa-pen text-xs"></i>
      </button>
    </div>
  </div>
</template>