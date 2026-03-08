<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import Input from "~/components/new_form_elements/Input.vue";
import Select from "~/components/new_form_elements/Select.vue";
import Button from "~/components/Button.vue";
import { ref, type PropType } from "vue";
import { shipOrder } from "~/features/public/api/orderApi";
import { useApiRequest } from "~/composables/useApiRequest";
import { closeModal } from "@customizer/modal-x";

const props = defineProps({
  data: {
    type: Object as PropType<{ orderId: string }>,
    required: true,
  },
});

const trackingNumber = ref("");
const carrier = ref("");

const carriers = [
  "Canada Post",
  "UPS",
  "FedEx",
  "Purolator",
  "DHL",
  "Canpar",
  "Loomis Express",
  "GLS Canada",
];

const { send, pending, error } = useApiRequest();

const handleShip = () => {
  send(
    () =>
      shipOrder(props.data.orderId, {
        trackingNumber: trackingNumber.value,
        carrier: carrier.value,
      }),
    (res: any) => {
      if (res.success) {
        closeModal(true);
      }
    },
  );
};
</script>

<template>
  <FormModalParent size="sm" title="Ship Order">
    <div class="space-y-4 p-2 font-sans">
      <p
        class="text-xs text-gray-500 bg-blue-50/50 p-3 rounded-md border border-blue-100/50"
      >
        Record shipping details for this order. Status will be updated to
        <span class="font-bold text-blue-900">SHIPPED</span>.
      </p>

      <div class="space-y-3">
        <Select
          v-model="carrier"
          label="Shipping Carrier"
          :options="carriers"
          :attributes="{ placeholder: 'Select a carrier' }"
          name="carrier"
        />

        <Input
          v-model="trackingNumber"
          label="Tracking Number"
          placeholder="e.g. UPS123456789"
          name="trackingNumber"
        />
      </div>

      <div
        v-if="error"
        class="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100"
      >
        {{ error }}
      </div>
    </div>

    <template #bottom>
      <div class="flex gap-3 justify-end pt-2">
        <Button @click="closeModal(false)" type="edge" size="md">
          Cancel
        </Button>
        <Button
          @click="handleShip"
          :loading="pending"
          type="secondary"
          size="md"
        >
          Confirm & Ship
        </Button>
      </div>
    </template>
  </FormModalParent>
</template>
