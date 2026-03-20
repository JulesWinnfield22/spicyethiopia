<script setup lang="ts">
import Form from "~/components/new_form_builder/Form.vue";
import TotalPrice from "./TotalPrice.vue";
import Input from "~/components/new_form_elements/Input.vue";
import Textarea from "~/components/new_form_elements/Textarea.vue";
import Button from "~/components/Button.vue";
import icons from "~/utils/icons";
import { useApiRequest } from "~/composables/useApiRequest";
import AddressSearchInput from "~/components/new_form_elements/AddressSearchInput.vue";
import { ref, watch } from "vue";
import { useCartStore } from "~/stores/cartStore";

const props = defineProps({
  next: {
    type: Function,
    required: true,
  },
});
const req = useApiRequest();
const orderReq = useApiRequest();
const cartStore = useCartStore();
const search = ref(cartStore.info.shippingAddress?.streetAddress || "");

function handleAddressSelect(address: any) {
  if (!cartStore.info.shippingAddress) {
    cartStore.info.shippingAddress = {
      streetAddress: "",
      apartment: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
    };
  }
  if (address.city) cartStore.info.shippingAddress.city = address.city;
  if (address.province)
    cartStore.info.shippingAddress.province = address.province;
  if (address.postalCode)
    cartStore.info.shippingAddress.postalCode = address.postalCode;
  if (address.country) cartStore.info.shippingAddress.country = address.country;
}

function submitOrder({ values }: any) {
  cartStore.info.customerInfo = {
    customerEmail: values.customerEmail,
    phoneNumber: values.phoneNumber,
    firstName: values.firstName,
    lastName: values.lastName,
    notes: values.notes,
  };

  cartStore.info.shippingAddress = {
    streetAddress: values.streetAddress,
    apartment: values.apartment,
    city: values.city,
    province: values.province,
    postalCode: values.postalCode,
    country: values.country,
  };
}

const formRef = ref();

async function canGoNext() {
  let resolveValidation: (value: boolean) => void;
  const validationPromise = new Promise<boolean>((resolve) => {
    resolveValidation = resolve;
  });

  formRef.value.submit((res: any) => {
    submitOrder(res);
    resolveValidation(true);
  });

  // Give a small timeout to resolve false if submit callback doesn't fire (invalid)
  // Actually, useForm's submit doesn't have a failure callback, it just returns if invalid.
  // I'll wait a nextTick and check if valid.
  setTimeout(() => {
    if (formRef.value.valid) {
      resolveValidation(true);
    } else {
      resolveValidation(false);
    }
  }, 100);

  return validationPromise;
}

defineExpose({
  canGoNext,
});
</script>

<template>
  <div class="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-2 p-4 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <span class="font-bold text-xs border-b border-gray-2 pb-4 md:text-lg"
          >Personal Information</span
        >
        <Form
          ref="formRef"
          v-slot="{ submit }"
          id="personal-info"
          class="grid grid-cols-2 gap-4"
        >
          <Input
            :value="cartStore.info.customerInfo?.firstName"
            name="firstName"
            label="First Name"
            :attributes="{
              placeholder: 'Enter First Name',
            }"
            validation="required|alpha|minmax-2,15"
          />
          <Input
            :value="cartStore.info.customerInfo?.lastName"
            name="lastName"
            label="Last Name"
            :attributes="{
              placeholder: 'Enter Last Name',
            }"
            validation="alpha|minmax-2,15"
          />
          <Input
            :value="cartStore.info.customerInfo?.customerEmail"
            name="customerEmail"
            label="Email"
            :attributes="{
              placeholder: 'Enter your Email',
            }"
            validation="required|email"
          />
          <Input
            :value="cartStore.info.customerInfo?.phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            :attributes="{
              placeholder: '+1',
            }"
            validation="required|phone"
          />
          <span
            class="col-span-2 mt-4 font-bold text-xs border-b border-gray-2 pb-4 md:text-lg"
            >Shipping Information</span
          >
          <AddressSearchInput
            v-model="search"
            name="streetAddress"
            label="Street Address"
            :attributes="{
              placeholder: 'Enter Street',
            }"
            validation="required"
            @select="handleAddressSelect"
          />
          <Input
            :value="cartStore.info.shippingAddress?.apartment"
            name="apartment"
            label="Apt / Unit / Suite"
            :attributes="{
              placeholder: 'Enter Apt / Unit / Suite',
            }"
          />
          <Input
            :value="cartStore.info.shippingAddress?.city"
            name="city"
            label="City"
            :attributes="{
              placeholder: 'Enter City',
            }"
            validation="required"
          />
          <Input
            :value="cartStore.info.shippingAddress?.province"
            name="province"
            label="Province"
            :attributes="{
              placeholder: 'Enter Province',
            }"
            validation="required"
          />
          <Input
            :value="cartStore.info.shippingAddress?.postalCode"
            name="postalCode"
            label="Postal Code"
            :attributes="{
              placeholder: 'Enter Zip / Postal Code',
            }"
            validation="required"
          />
          <Input
            :value="cartStore.info.shippingAddress?.country || 'Canada'"
            name="country"
            label="Country"
            :attributes="{
              placeholder: 'Enter Country',
            }"
            validation="required"
          />
          <Textarea
            class="col-span-2"
            :value="cartStore.info.customerInfo?.notes"
            name="notes"
            label="Order Notes (Optional)"
            :attributes="{
              placeholder:
                'Add any special instructions or notes for your order...',
              rows: 3,
            }"
          />
          <div class="p-2 flex justify-end col-span-2">
            <Button
              @click.prevent="next()"
              class="rounded-full !px-8 gap-2"
              type="secondary"
              size="md"
            >
              Payment
              <i v-html="icons.rightArrow" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
    <TotalPrice />
  </div>
</template>
