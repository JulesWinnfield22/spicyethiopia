<script setup lang="ts">
import { useApiMutation } from "~/composables/useApiMutation";
import { useQueryClient } from "@tanstack/vue-query";
import { getImage } from "~/features/admin/api/staticApi";
import { ref, type PropType, computed } from "vue";
import InputParent from "./new_form_builder/InputParent.vue";
import { Form, Input } from "./new_form_elements";
import { getObjUrl, staticRoute, toasted, toFormData } from "~/utils/utils";
import icons from "~/utils/icons";
import InputError from "./new_form_elements/InputError.vue";
import Button from "./Button.vue";
import { getContent, setImage } from "~/features/admin/api/contentApi";
import { useRoute } from "vue-router";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  height: String,
  width: String,
  outline: {
    type: Boolean,
    default: true,
  },
  value: {
    type: String,
  },
  attributes: {
    type: Object,
  },
  objectFit: {
    type: String as PropType<
      "cover" | "contain" | "fill" | "none" | "scale-down"
    >,
    default: "cover",
  },
  maxFileSize: {
    type: String,
    default: "10mb",
  },
  objectPosition: {
    type: String,
    default: "center",
  },
});

const route = useRoute();
const edit = route.path.includes("admin");

const image = ref<File | null>();
const previewUrl = ref("");
const contentReq = useApiMutation();
const imageReq = useApiMutation();
const queryClient = useQueryClient();
const fileError = ref<string | null>(null);

if (props.name) {
  contentReq.send(
    () => getContent(props.name as string),
    (res) => {
      if (res.success && res.data?.content) {
        imageReq.send(
          () => getImage(res.data.content),
          (imageRes) => {
            if (process.client && imageRes.success && imageRes.data) {
              image.value = new File(
                [imageRes.data],
                res.data.content as string,
              );
            }
          },
        );
      }
    },
  );
}

function validateFileSize(file: File): boolean {
  const sizeMatch = props.maxFileSize.match(/(\d+)(mb|kb)/i);
  if (!sizeMatch) return true;

  const size = parseInt(sizeMatch[1]);
  const unit = sizeMatch[2].toLowerCase();

  const fileSizeKB = file.size / 1024;
  const fileSizeMB = fileSizeKB / 1024;

  if (unit === "kb" && fileSizeKB > size) {
    fileError.value = `File size exceeds ${size}KB`;
    return false;
  }

  if (unit === "mb" && fileSizeMB > size) {
    fileError.value = `File size exceeds ${size}MB`;
    return false;
  }

  fileError.value = null;
  return true;
}

function selected(ev: Event) {
  const target = ev.target as HTMLInputElement;
  const file = target?.files?.[0];

  if (file) {
    if (validateFileSize(file)) {
      image.value = file;
    } else {
      target.value = "";
    }
  }
}

const req = useApiMutation();
function sendImage({ values }: any) {
  if (req.pending.value) return;

  const fd = toFormData(values);
  req.send(
    () => setImage(props.name, fd),
    (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["img_content", props.name] });
      }
      toasted(res.success, "Content updated", res.error);
    },
  );
}

import { onUnmounted, watch } from "vue";

const label = ref();
const pending = computed(
  () => contentReq.pending.value || imageReq.pending.value,
);

const imageStyles = computed(() => {
  return {
    maxHeight: props.height || "auto",
    height: props.height || "",
    maxWidth: "100%",
    width: props.width || "100%",
    objectFit: props.objectFit,
    objectPosition: props.objectPosition || "left",
  };
});

const isFile = (val: any): val is File =>
  typeof File !== "undefined" && val instanceof File;

watch(
  image,
  (newVal) => {
    if (previewUrl.value) {
      if (process.client) URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = "";
    }
    if (isFile(newVal)) {
      if (process.client) previewUrl.value = URL.createObjectURL(newVal);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (previewUrl.value) {
    if (process.client) URL.revokeObjectURL(previewUrl.value);
  }
});
</script>

<template>
  <div class="relative @container isolate overflow-hidden">
    <div
      :style="{
        maxHeight: height,
      }"
      v-if="pending"
      class="absolute z-20 inset-0 bg-gray grid place-items-center"
    >
      <i v-html="icons.spinner" />
    </div>
    <Form
      :style="{
        minHeight: height,
        width: width || 'auto',
      }"
      v-slot="{ submit }"
      :class="[edit && outline && 'border p-2']"
      class="@max-3xl:grid-cols-1 h-full border-gray-300 max-w-full gap-y-4 grid grid-cols-2 rounded-md"
      :id="`comercial-form-${name}`"
    >
      <InputParent
        v-model="image"
        validation="required"
        saveOnEl
        :attributes="{ ...attributes, type: 'file' }"
        name="content"
        v-slot="{ setRef, error }"
      >
        <div class="hidden absolute col-span-2" :ref="setRef"></div>
        <div
          :class="[(pending || edit || !image) && 'bg-gray']"
          class="relative min-h-32 flex flex-col gap-1 overflow-hidden col-span-2"
        >
          <div
            :style="{
              height,
              width: width || '100%',
            }"
            v-if="previewUrl || (contentReq.response.value?.content && !edit)"
            :class="[edit ? 'z-10' : '']"
            class="group max-w-full min-h-32 overflow-hidden relative"
          >
            <div
              v-if="edit"
              class="hidden group-hover:flex absolute inset-0 bg-dark/20"
            >
              <div class="h-12 gap-2 flex items-center justify-end w-full px-2">
                <button
                  @click.prevent="label.click()"
                  class="size-10 cursor-pointer grid place-items-center rounded-full bg-gray shadow"
                >
                  <i class="*:text-dark" v-html="icons.image" />
                </button>
                <button
                  @click.prevent="image = undefined"
                  class="size-10 cursor-pointer grid place-items-center rounded-full bg-gray shadow"
                >
                  <i class="*:text-red-500" v-html="icons.close" />
                </button>
              </div>
            </div>
            <img
              :style="imageStyles"
              class="max-w-full"
              :src="
                previewUrl ||
                `${staticRoute}/${contentReq.response.value?.content}`
              "
              :alt="contentReq.response.value?.alt || 'Uploaded image'"
            />
          </div>
          <label
            v-if="edit"
            :style="{
              height,
              width: width || '100%',
            }"
            ref="label"
            :class="[outline && 'border bg-gray', image && '-z-10 absolute']"
            class="border-gray-300 min-h-32 rounded-md h-full w-full block"
          >
            <div class="grid place-items-center h-full w-full">
              <div v-if="edit" class="flex flex-col items-center">
                <i
                  class="*:min-w-[3rem] *:h-[5rem] *:min-h-[3rem] *:w-[5rem] *:text-dark"
                  v-html="icons.upload"
                />
                <span class="text-sm text-gray-500 mt-2"
                  >Click to upload image</span
                >
                <span v-if="maxFileSize" class="text-xs text-gray-400"
                  >Max size: {{ maxFileSize }}</span
                >
              </div>
            </div>
            <input
              :key="isFile(image) ? image.name : 'image'"
              @change="selected"
              type="file"
              accept="image/*"
              class="hidden"
            />
          </label>
          <InputError :error="error || fileError" />
        </div>
      </InputParent>
      <Input
        v-if="edit"
        :value="contentReq.response.value?.alt"
        name="alt"
        :attributes="{
          placeholder: 'Enter Image Description',
        }"
        validation="required"
      />
      <div
        v-if="edit"
        class="mt-auto col-span-2 flex relative isolate rounded-md"
      >
        <div class="flex w-full backdrop-blur-2xl items-center justify-end p-2">
          <div class="flex gap-2">
            <Button
              type="secondary"
              @click.prevent="submit(sendImage)"
              :pending="req.pending.value"
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.group:hover .group-hover\:flex {
  display: flex;
}

@media (max-width: 640px) {
  .\@max-3xl\:grid-cols-1 {
    grid-template-columns: 1fr;
  }
}
</style>
