<script setup lang="ts">
import { useApiRequest } from "@/composables/useApiRequest";
import { getImage } from "@/features/admin/api/staticApi";
import { ref, type PropType } from "vue";
import InputParent from "./new_form_builder/InputParent.vue";
import { Form, Input } from "./new_form_elements";
import { getObjUrl, staticRoute, toasted, toFormData } from "@/utils/utils";
import icons from "@/utils/icons";
import InputError from "./new_form_elements/InputError.vue";
import Button from "./Button.vue";
import { getContent, setImage } from "@/features/admin/api/contentApi";
import { computed } from "@vue/reactivity";
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
});

const route = useRoute();
const edit = route.path.includes("admin");

const image = ref<File | null>();
const contentReq = useApiRequest();
const imageReq = useApiRequest();

if (props.name) {
  contentReq.send(
    () => getContent(props.name as string),
    (res) => {
      if (res.success && res.data?.content) {
        imageReq.send(
          () => getImage(res.data.content),
          (imageRes) => {
            if (res.success && res.data) {
              image.value = new File(
                [imageRes.data],
                res.data.content as string
              );
            }
          }
        );
      }
    }
  );
}

function selected(ev: Event) {
  const target = ev.target as HTMLInputElement;
  const name = target?.files?.[0]?.name;
  console.log(image.value, "val");
  if (name) {
    console.log(image.value);
    image.value = target?.files?.[0] || new File([], "");
  }
}

const req = useApiRequest();
function sendImage({ values }: any) {
  if (req.pending.value) return;

  const fd = toFormData(values);
  req.send(
    () => setImage(props.name, fd),
    (res) => {
      toasted(res.success, "Content updated", res.error);
    }
  );
}

const label = ref();
const pending = computed(
  () => contentReq.pending.value || imageReq.pending.value
);
</script>

<template>
  <div class="relative @container isolate">
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
      }"
      v-slot="{ submit }"
      :class="[outline && 'border p-2']"
      class="@max-3xl:grid-cols-1 h-full border-gray-300 gap-y-4 grid grid-cols-2 rounded-md"
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
          class="relative min-h-32 flex flex-col gap-1 overflow-hidden col-span-2"
        >
          <div
            :style="{
              height,
            }"
            v-if="image"
            :class="[image ? 'z-10' : '-z-10']"
            class="group absoli min-h-32 overflow-hidden relative z-10"
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
              class="max-w-full"
              :src="`${staticRoute}/${contentReq.response.value?.content}`"
            />
          </div>
          <label
            :style="{
              height,
            }"
            ref="label"
            :class="[outline && 'border bg-gray', image && '-z-10 absolute']"
            class="border-gray-300 mni-h-32 rounded-md h-full w-full block"
          >
            <div class="grid place-items-center h-full w-full">
              <i
                class="*:min-w-[3rem] *:h-[5rem] *:min-h-[3rem] *:w-[5rem] *:text-dark"
                v-html="icons.upload"
              />
            </div>
            <input
              :key="image ? image.name : 'image'"
              @change="selected"
              type="file"
              class="hidden"
            />
          </label>
          <InputError :error="error" />
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
        <div
          class="truncate bg-gradient-to-r from-red-400/10 to-blue-300/10 absolute flex items-center justify-center font-bold text-sm text-center inset-0 -z-10"
        >
          fsdjjfllllllllllllllllllllllllllllllllllll
          fsdjjfllllllllllllllllllllllllllllllllllll
        </div>
        <div class="flex w-full backdrop-blur-2xl items-center justify-end p-2">
          <div class="flex gap-2">
            <Button type="secondary" @click.prevent="submit(sendImage)">
              Change
            </Button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>
