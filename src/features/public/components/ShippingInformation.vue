<script setup lang="ts">
import Form from "@/components/new_form_builder/Form.vue";
import TotalPrice from "./TotalPrice.vue";
import Input from "@/components/new_form_elements/Input.vue";
import Button from "@/components/Button.vue";
import icons from "@/utils/icons";
import { useApiRequest } from "@/composables/useApiRequest";
import { getAddress } from "../api/addressApi";
import { ref, watch } from "vue";
import { useCartStore } from "@/stores/cartStore";

const props = defineProps({
	next: {
		type: Function,
		required: true
	}
})
const req = useApiRequest()
const orderReq = useApiRequest()
const search = ref('')
const cartStore = useCartStore()

function getFunction() {
	if(req.pending.value) return
	req.send(
		() => getAddress({search: search.value}),
		res => {

		}
	)
}

watch(search, getFunction)

function submitOrder({values}: any) {
	cartStore.info.customerInfo = {
		customerEmail: values.customerEmail,
		phoneNumber: values.phoneNumber,
		firstName: values.firstName,
		lastName: values.lastName
	}

	cartStore.info.shippingAddress = {
		streetAddress: values.streetAddress,
		apartment: values.apartment,
		city: values.city,
		province: values.province,
		postalCode: values.postalCode,
		country: values.country
	}
	
	props.next()
}
</script>

<template>
  <div class="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-2 p-4 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <span class="font-bold text-xs border-b border-gray-2 pb-4 md:text-lg">Personal Information</span>
				<Form v-slot="{ submit }" id="personal-info" class="grid grid-cols-2 gap-4" >
					<Input
						name="firstName"
						label="First Name"
						:attributes="{
							placeholder: 'Enter First Name'
						}"
						validation="required|alpha|minmax-2,15"
					/>
					<Input
						name="lastName"
						label="Lasr Name"
						:attributes="{
							placeholder: 'Enter Last Name'
						}"
						validation="alpha|minmax-2,15"
					/>
					<Input
						name="customerEmail"
						label="Email"
						:attributes="{
							placeholder: 'Enter your Email'
						}"
						validation="required|email"
					/>
					<Input
						name="phoneNumber"
						label="Phone Numbre"
						:attributes="{
							placeholder: '+1'
						}"
						validation="required|phone"
					/>
	        <span class="col-span-2 mt-4 font-bold text-xs border-b border-gray-2 pb-4 md:text-lg">Shipping Information</span>
					<Input
						v-model="search"
						name="streetAddress"
						label="Street Address"
						:attributes="{
							placeholder: 'Enter Street'
						}"
						validation="required"
					/>
					<Input
						name="apartment"
						label="Apt / Unit / Suite"
						:attributes="{
							placeholder: 'Enter Apt / Unit / Suite'
						}"
						validation="required"
					/>
					<Input
						name="city"
						label="City"
						:attributes="{
							placeholder: 'Enter City'
						}"
						validation="required"
					/>
					<Input
						name="province"
						label="Province"
						:attributes="{
							placeholder: 'Enter Province'
						}"
						validation="required"
					/>
					<Input
						name="postalCode"
						label="Postal Code"
						:attributes="{
							placeholder: 'Enter Zip / Postal Code'
						}"
						validation="required"
					/>
					<Input
						name="country"
						label="Country"
						:attributes="{
							placeholder: 'Enter Country'
						}"
						validation="required"
					/>
					<div class="p-2 flex justify-end col-span-2" >
						<Button @click.prevent="submit(submitOrder)" class="rounded-full !px-8 gap-2" type="secondary" size="md">
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
