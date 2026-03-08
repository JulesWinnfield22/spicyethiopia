<script setup lang="ts">
import { type Component } from "vue";
import DropdownPortal from "../components/DropdownPortal.vue";

interface DropdownItem {
  name: string;
  action?: () => void;
  icon?: string;
  component?: Component;
}

const props = defineProps<{
  items?: DropdownItem[];
}>();
</script>

<template>
  <DropdownPortal>
    <ul
      class="__d_shadow max-w-max bg-white border border-gray-300 rounded-lg flex flex-col gap-2 z-50 p-2 overflow-y-auto max-h-[inherit]"
    >
      <template v-if="items && items.length > 0">
        <li
          v-ripple
          @click="item.action"
          v-for="(item, index) in items"
          :key="index"
          class="w-full flex rounded items-center h-8 px-1.5 hover:bg-gray-100 cursor-pointer"
        >
          <!-- Render custom component if provided -->
          <component
            v-if="item.component"
            :is="item.component"
            @click="item.action"
          />
          <div v-else class="w-full flex whitespace-nowrap items-center gap-2">
            <i v-html="item?.icon" />
            <span>{{ item.name }}</span>
          </div>
        </li>
      </template>
    </ul>
  </DropdownPortal>
</template>

<style scoped>
.__d_shadow {
  box-shadow: 0px 0px 44.7px 0px rgba(55, 70, 83, 0.1);
}

.dropdown-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}
</style>
