<script setup lang="ts">
import { useWindowSize } from "~/composables/useWindowSize";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  actionText: {
    type: String,
    default: "Select Option",
  },
  options: {
    type: Array as () => string[],
    default: () => [],
  },
  alignment: {
    type: String as () => "left-bottom" | "right-bottom",
    default: "left-bottom",
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["select"]);

const size = useWindowSize();
const isMobile = computed(() => size.value.width < 768);
</script>

<template>
  <Dropdown :position="alignment">
    <template #default="{ toggle, open }">
      <!-- TRIGGER -->
      <slot name="trigger" :toggle="toggle" :open="open">
        <Button variant="outline" @click.prevent.stop="() => toggle()">
          {{ actionText }}
          <span class="ml-2">
            <i
              class="fa-solid"
              :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </span>
        </Button>
      </slot>

      <!-- CONTENT -->
      <DropdownPortal>
        <div class="__dropdown-wrapper" :class="[className]">
          <ul
            class="min-w-[12rem] border border-gray-300 rounded-lg flex flex-col p-1.5 overflow-y-auto max-h-[inherit]"
            :class="[
              isMobile
                ? 'border-none rounded-none shadow-none !p-0 !min-w-0 bg-transparent w-full'
                : 'shadow-xl __d_shadow bg-white',
            ]"
          >
            <li
              v-if="label"
              class="px-2 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-100 mb-1"
              :class="{ 'text-sm mb-3 pt-0': isMobile }"
            >
              {{ label }}
            </li>

            <!-- OPTIONS -->
            <template v-if="options && options.length > 0">
              <li
                v-for="item in options"
                :key="item"
                v-ripple
                class="w-full flex rounded items-center cursor-pointer transition-colors gap-3"
                :class="[
                  isMobile
                    ? 'h-14 px-4 text-base font-semibold border-b border-gray-50 last:border-none hover:bg-gray-50'
                    : 'h-9 px-2 text-sm hover:bg-gray-100',
                ]"
                @click="
                  () => {
                    $emit('select', item);
                    toggle(false);
                  }
                "
              >
                <slot name="item" :item="item">
                  {{ item }}
                </slot>
              </li>
            </template>

            <!-- CUSTOM CONTENT -->
            <slot name="customContent" />

            <!-- FALLBACK -->
            <li
              v-if="!options?.length && !$slots.customContent"
              class="block w-full text-xs font-medium text-center py-3 text-gray-400"
            >
              No Data Found
            </li>
          </ul>
        </div>
      </DropdownPortal>
    </template>
  </Dropdown>
</template>

<style scoped>
.__d_shadow {
  box-shadow: 0px 0px 44.7px 0px rgba(55, 70, 83, 0.1);
}
</style>
