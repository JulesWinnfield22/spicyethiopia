<script setup lang="ts">
import InputParent from "~/components/new_form_builder/InputParent.vue";
import InputError from "~/components/new_form_elements/InputError.vue";
import Textarea from "~/components/new_form_elements/Textarea.vue";
import icons from "~/utils/icons";
import { genId } from "~/utils/utils";
import type { PropType } from "vue";
import { computed, ref, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Array as PropType<string[]>,
  },
  label: String,
  attributes: {
    type: Object,
  },
  btnText: {
    type: String,
    required: true,
  },
});

const data = ref<{ id: string; value: string }[]>(
  props.value?.length
    ? [
        ...props.value.map((el) => {
          return { id: genId.next().value as string, value: el };
        }),
      ]
    : [{ id: genId.next().value as string, value: "" }]
);
const value = ref(data.value.map((el) => el.value));

const firstIndex = computed(() => {
  console.log("sdf");

  return data.value?.[0];
});

watch(
  data,
  () => {
    value.value = data.value.map((el) => el.value);
  },
  { deep: true }
);

const thisValue = computed(() => {
  return (id: string) => {
    let found = data.value.find((el) => el.id == id);
    if (!found) throw new Error("Value not found");
    return found;
  };
});

function add() {
  if (data.value?.[1] && data.value?.[data.value.length - 1].value == "")
    return;
  data.value.push({ id: genId.next().value as string, value: "" });
}

function removeItem(id: string) {
  const idx = data.value.findIndex((el) => el.id == id);
  if (idx > -1) {
    data.value.splice(idx, 1);
  }
}

const edit = ref<{ id: string; to: number }[]>([]);
function setTime(id: string) {
  return setTimeout(() => {
    let idx = edit.value.findIndex((el) => el.id == id);
    if (idx > -1) {
      edit.value.splice(idx, 1);
    }
  }, 500);
}

function editing(id: string) {
  let idx = edit.value.findIndex((el) => el.id == id);
  if (idx > -1) {
    clearInterval(edit.value[idx].to);
    edit.value[idx].to = setTime(id);
  } else {
    edit.value.push({
      id,
      to: setTime(id),
    });
  }
}
</script>
<template>
  <InputParent v-model="value" :name="name" v-slot="{ setRef, error }">
    <div class="flex flex-col gap-1">
      <span :title="label" class="text-xs capitalize truncate" v-if="label">{{
        label
      }}</span>
      <div :ref="setRef" class="!p-0 w-full flex flex-col items-start gap-1">
        <Textarea
          name="notaname"
          :attributes="{ placeholder: attributes?.placeholder }"
          :skip="true"
          validation="required"
          class="w-full"
          v-model="firstIndex.value"
        >
        </Textarea>
        <template v-if="data.length > 1">
          <div
            class="w-full flex rounded-md border border-dark/20 bg-gray"
            v-for="(val, idx) in data.slice(1)"
            :key="val.id"
          >
            <input
              @input="editing(val.id)"
              v-focus
              :placeholder="`Item ${idx + 1}`"
              v-model.trim="thisValue(val.id).value"
              class="!shadow-none flex-1 h-8 px-2"
            />
            <div
              v-if="edit.find((el) => el.id == val.id)"
              class="w-8 h-full grid place-items-center"
            >
              <i class="animate-spin" v-html="icons.spinner" />
            </div>
            <button
              @click.prevent="removeItem(val.id)"
              class="w-6 h-full grid place-items-center"
            >
              <i v-html="icons.trash" />
            </button>
          </div>
        </template>
        <button @click.prevent="add">+ {{ btnText }}</button>
      </div>
      <InputError :error="error" />
    </div>
  </InputParent>
</template>
