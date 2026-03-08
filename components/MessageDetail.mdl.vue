<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import Button from "~/components/Button.vue";
import { Textarea } from "~/components/new_form_elements";
import { closeModal } from "@customizer/modal-x";
import icons from "~/utils/icons";
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const replyText = ref("");

function sendReply() {
  console.log("Replying to", props.data.email, "with:", replyText.value);
  // Placeholder for actual API call
  closeModal(true);
}
</script>

<template>
  <FormModalParent size="md" title="Message Details">
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p
            class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
          >
            Full Name
          </p>
          <p class="text-base font-medium mt-1">{{ data.name }}</p>
        </div>
        <div>
          <p
            class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
          >
            Email
          </p>
          <p class="text-base font-medium mt-1">{{ data.email }}</p>
        </div>
        <div>
          <p
            class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
          >
            Phone Number
          </p>
          <p class="text-base font-medium mt-1">{{ data.phone }}</p>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-4">
        <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Message
        </p>
        <div class="bg-gray-50 p-4 rounded-lg mt-2 border border-gray-100">
          <p class="text-base text-gray-800 leading-relaxed">
            {{ data.message }}
          </p>
        </div>
      </div>

      <div class="border-t border-gray-100 pt-4 space-y-3">
        <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Reply to Customer
        </p>
        <Textarea
          v-model="replyText"
          name="reply"
          label=""
          :attributes="{
            placeholder: 'Write your message here...',
            rows: 6,
          }"
          class="w-full"
        />
      </div>
    </div>

    <template #bottom>
      <div class="flex gap-4 justify-end">
        <Button
          @click="closeModal(false)"
          size="md"
          type="edge"
          class="min-w-[120px]"
        >
          Cancel
        </Button>
        <Button
          @click="sendReply"
          size="md"
          type="secondary"
          class="min-w-[120px] gap-2"
        >
          Send Reply
          <i v-html="icons.rightArrow" />
        </Button>
      </div>
    </template>
  </FormModalParent>
</template>
