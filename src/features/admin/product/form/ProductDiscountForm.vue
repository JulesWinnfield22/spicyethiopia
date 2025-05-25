<script setup lang="ts">
import { Form, Input, Select } from "@/components/new_form_elements";
import { ref, type PropType } from "vue";
import type { Discount } from "../../discount/store/discountsStore";
import type { Product } from "../../store/productsStore";
import { DISCOUNT_STATUS } from "@/utils/utils";

const props = defineProps({
  discount: {
    type: Object as PropType<Discount>,
    default: () => ({
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      status: 'ACTIVE',
      overrideGlobalDiscount: true
    })
  },
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});
</script>

<template>
  <Form :inner="false" id="product-discount-form" class="grid grid-cols-2 gap-6">
    <Input
      name="discountPercentage"
      label="Discount Percentage"
      :attributes="{
        placeholder: 'Enter discount percentage',
        min: 1,
        max: 100,
      }"
      :value="discount?.discountPercentage"
      validation="required|num_minmax-1,100"
    />
    
    <Select
      name="status"
      label="Status"
      :value="discount?.status || 'ACTIVE'"
      :options="DISCOUNT_STATUS"
      :attributes="{
        placeholder: 'Select Status',
      }"
    />
    
    <Input
      name="startDate"
      label="Start Date"
      :attributes="{
        placeholder: 'Select start date',
        type: 'date'
      }"
      :value="discount?.startDate"
      validation="required"
    />
    
    <Input
      name="endDate"
      label="End Date"
      :attributes="{
        placeholder: 'Select end date',
        type: 'date'
      }"
      :value="discount?.endDate"
      validation="required"
    />

    <div class="col-span-2">
      <!-- <Checkbox
        name="overrideGlobalDiscount"
        label="Override Global Discount"
        :value="discount?.overrideGlobalDiscount"
      /> -->
    </div>
  </Form>
</template>