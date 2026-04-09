<script setup lang="ts">
import InputParent from "~/components/new_form_builder/InputParent.vue";
import InputError from "~/components/new_form_elements/InputError.vue";
import NewInputLayout from "~/components/new_form_elements/NewInputLayout.vue";
import icons from "~/utils/icons";
import { ref, watch, type PropType } from "vue";
import { getImage } from "../../api/staticApi";
import { useApiMutation } from "~/composables/useApiMutation";
import { allRequest, getObjUrl } from "~/utils/utils";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Array as PropType<string[]> ,
  },
  attributes: {
    type: Object,
  },
});

const images = ref<{ name: string; file: File }[]>([]);
const imagesReq = useApiMutation()

console.log(props.value);

if(props.value?.length) {
  const imgs = props.value.map(el => getImage(el))
  imagesReq.send(
    () =>  allRequest(imgs),
    res => {
      if(res.success) {
        images.value = Object.values(res.data).map((el: any, idx) => {
          return {
            name: props.value?.length ? props.value[idx] : 'name',
            file: new File([el], props.value?.length ? props.value[idx] : 'name')
          }
        })
      }
    }
  )
}

function selected(ev: Event) {
  const target = ev.target as HTMLInputElement;
  const name = target?.files?.[0]?.name;
  console.log(images.value);
  const idx = (images.value || [])?.findIndex?.((el) => el.name == name);
  if (idx > -1) {
    images.value.splice(idx, 1);
  } else if (name) {
    console.log(images.value);
    images.value?.push?.({
      name: name as string,
      file: target?.files?.[0] || new File([], ""),
    });
  }
}

function remove(name: string) {
  const idx = images.value.findIndex(el => el.name == name)
  if(idx > -1) {
    images.value.splice(idx, 1)
  }
}

const label = ref<HTMLLabelElement>();
</script>

<template>
  <InputParent
    v-model="images"
    saveOnEl
    :name="name"
    :attributes="{ ...attributes, type: 'file' }"
    v-slot="{ setRef, error, value }"
  >
    <div class="flex flex-col gap-1" >
      <div
        tabindex="0"
        class="h-15 self-stretch box-border max-w-full cursor-pointer flex items-center p-2 border border-dashed rounded-md border-[rgb(197_205_233)]"
      >
        <div :ref="setRef" class="!px-0 flex items-center gap-2">
          <div>
            <template v-if="images?.length">
              <div
                :style="{
                  minWidth: `${images.length * 20 + 20}px`,
                }"
                class="flex __parent_image_wrapper flex-1 h-10 gap-1 items-center isolate relative"
              >
                <div
                  class="overflow-hidden __child_image_wrapper isolate absolute"
                  :style="{
                    left: `${idx * 20}px`,
                  }"
                  v-for="(image, idx) in images"
                  :key="image.name"
                >
                  <img
                    :src="getObjUrl(image.file)"
                    class="min-w-10 w-10 h-10 border min-h-10 rounded-full object-cover"
                  />
                  <div @click="remove(image.name)" class="hover:bg-white __remove center-absolute hover:border rounded-full z-10 top-0 left-0 hidden absolute overflow-hidden h-10 w-10  place-items-center" >
                    <i v-html="icons.close" />
                  </div>  
                </div>
                <!-- <div
                class="absolute -z-10 min-w-11 w-11 h-11 min-h-11 bg-dark rounded-full shadow-[0_0_0_2px_#000] dow-primary"
                v-for="(image, idx) in images" :key="image.name"
                :style="{
                  left: `${idx * 19}px`,
                }"
              ></div> -->
              </div>
            </template>
            <div
              v-if="!images?.length"
              @click="label?.click()"
              class="p-1 bg-gray size-10 grid place-items-center rounded-md"
            >
              <i v-html="icons.upload" />
            </div>
          </div>
          <label
            ref="label"
            class="box-border flex-1 h-full flex flex-col gap-1"
            @keydown.enter="($event?.target as HTMLElement)?.click?.()"
          >
            <div class="max-w-max px-2 h-11 flex items-center">
              <span class="font-bold">Upload Images</span>
            </div>
            <input
              accept="image/*"
              @change.stop.prevent="selected"
              type="file"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <InputError :error="error" />
    </div>
  </InputParent>
</template>

<style scoped >
  .__parent_image_wrapper:hover .__child_image_wrapper {
    position: relative;
  }

  .__parent_image_wrapper:hover  * {
    left: 0 !important;
  }

  .__child_image_wrapper:hover .__remove {
    display: grid;
  }
</style>