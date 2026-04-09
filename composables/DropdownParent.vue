<script setup lang="ts">
import { type Component, inject, computed, type Ref } from "vue";
import { useWindowSize } from "~/composables/useWindowSize";
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

const size = useWindowSize();
const isMobile = computed(() => size.value.width < 768);
const open = inject<Ref<boolean>>("open");

function handleAction(item: DropdownItem) {
  item.action?.();
  if (open) open.value = false;
}
</script>

<template>
  <DropdownPortal>
    <ul
      class="w-full border border-gray-300 rounded-lg flex flex-col gap-2 z-50 overflow-y-auto max-h-[inherit]"
      :class="[
        isMobile
          ? 'border-none rounded-none shadow-none !p-0 !min-w-0 bg-transparent w-full'
          : 'shadow-xl __d_shadow bg-white p-2',
      ]"
    >
      <template v-if="items && items.length > 0">
        <li
          v-ripple
          v-for="(item, index) in items"
          :key="index"
          class="w-full flex rounded items-center cursor-pointer transition-colors"
          :class="[
            isMobile
              ? 'h-14 px-4 text-base font-semibold border-b border-gray-50 last:border-none hover:bg-gray-50'
              : 'h-8 px-1.5 text-sm hover:bg-gray-100',
          ]"
          @click="handleAction(item)"
        >
          <!-- Render custom component if provided -->
          <component
            v-if="item.component"
            :is="item.component"
            @click="handleAction(item)"
          />
          <div
            v-else
            class="w-full flex whitespace-nowrap items-center gap-3"
            :class="{ 'gap-4': isMobile }"
          >
            <i v-html="item?.icon" class="flex shrink-0 aspect-square" />
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
