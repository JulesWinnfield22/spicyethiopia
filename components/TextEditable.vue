<script setup lang="ts">
import { useApiMutation } from "~/composables/useApiMutation";
import { getContent, setText } from "~/features/admin/api/contentApi";
import icons from "~/utils/icons";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  textarea: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  }
});

const route = useRoute()
const edit = route.path.includes('admin')

const contentReq = useApiMutation();
const text = ref(props.text || "");

if(props.id) {
  contentReq.send(
    () => getContent(props.id as string),
    (res) => {
      if(res.success && res.data?.content) {
        text.value = res.data.content
      }
    }
  )
}


let to: number;
const req = useApiMutation();
function setInput(ev: Event) {
  to = setTimeout(() => {
    req.send(
      () => setText(props.id, (ev.target as HTMLInputElement).value),
      (res) => {

			}
    );
  }, 500);
}
</script>
<template>
  <div class="relative isolate">
    <div v-if='contentReq.pending.value' class="absolute z-20 inset-0 bg-gray grid place-items-center" >
      <i v-html="icons.spinner" />
    </div>
    <div
			v-if="req.pending.value"
      class="z-10 absolute top-2 right-2 grid place-items-center"
    >
      <i v-html="icons.spinner" />
    </div>
    <span v-if="!edit">
      {{ text }}
    </span>
    <input v-else-if="!textarea" class="-z-10  w-full" @input="setInput" v-model="text" />
    <textarea  v-else-if="textarea" :rows="rows" class="-z-10 resize-none w-full" @input="setInput" v-model="text" />
  </div>
</template>
