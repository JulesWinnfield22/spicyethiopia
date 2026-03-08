<script setup lang="ts">
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";
import DropdownPortal from "./DropdownPortal.vue";

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
            class="__d_shadow min-w-[12rem] bg-white border border-gray-300 rounded-lg flex flex-col p-1.5 shadow-xl overflow-y-auto max-h-[inherit]"
          >
            <li
              v-if="label"
              class="px-2 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-100 mb-1"
            >
              {{ label }}
            </li>

            <!-- OPTIONS -->
            <template v-if="options && options.length > 0">
              <li
                v-for="item in options"
                :key="item"
                v-ripple
                class="w-full flex rounded items-center h-9 px-2 hover:bg-gray-100 cursor-pointer text-sm gap-2"
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
