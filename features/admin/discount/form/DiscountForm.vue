<script setup lang="ts">
import { Form, Input, Select } from "~/components/new_form_elements";
import { ref, type PropType } from "vue";
import type { Discount } from "../store/discountsStore";
import { dateFormat } from '~/utils/utils'

const props = defineProps({
  discount: {
    type: Object as PropType<Discount>,
    default: () => ({
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      status: 'ACTIVE'
    })
  }
});

const DISCOUNT_STATUS = ["ACTIVE", "REMOVED", "INACTIVE"];
</script>

<template>
  <Form :inner="false" id="discount-form" class="grid grid-cols-2 gap-6">
    <Input
      name="discountPercentage"
      label="Discount Percentage"
      :attributes="{
        placeholder: 'Enter discount percentage',
        min: 1,
        max: 100
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
      :value="dateFormat(discount?.startDate)"
      validation="required|greaterThanToday"
    />
    
    <Input
      name="endDate"
      label="End Date"
      :attributes="{
        placeholder: 'Select end date',
        type: 'date'

      }"
      :value="dateFormat(discount?.endDate)"
      validation="required|dateAfter-startDate"
    />
  </Form>
</template>