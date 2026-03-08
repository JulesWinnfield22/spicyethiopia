<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import Button from "~/components/Button.vue";
import { toasted } from "~/utils/utils";
import { closeModal } from "@customizer/modal-x";
import { type PropType } from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<{ title: string; message: string }>,
  },
});
</script>

<template>
  <FormModalParent size="sm" title="Order">
    <div class="p-4 text-center">
      <p class="mb-4">Are you sure you want to order this items?</p>
    </div>
    <template #bottom>
      <div class="flex gap-4">
        <Button @click="closeModal(false)" size="md" type="edge" class="w-full">
          Cancel
        </Button>
        <Button
          @click="closeModal(true)"
          size="md"
          class="w-full"
          type="secondary"
        >
          Order
        </Button>
      </div>
    </template>
  </FormModalParent>
</template>
