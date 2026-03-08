<script setup lang="ts" generic="T">
import { Form, Input, Select, Textarea } from "~/components/new_form_elements";
import { ref, watch, type PropType } from "vue";
import type { Product } from "../../store/productsStore";
import { ProductsStatus, weightUnit, type FormSubmitFunc } from "~/utils/utils";
import ProductImageUploadInput from "../components/ProductImageUploadInput.vue";
import Button from "~/components/Button.vue";
import ListInputWIthTextareaInput from "../components/ListInputWIthTextareaInput.vue";
import { getFakeProductFormData } from "../utils/populateStore";

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
  },
  onSubmit: {
    type: Function as PropType<(values: Product) => void>,
  },
  pending: {
    type: Boolean,
    default: false,
  },
});

function submitProduct({ values }: { values: Product }) {
  return props.onSubmit && props.onSubmit(values);
}
</script>

<template>
  <Form v-slot="{ submit }" id="product-form" class="grid grid-cols-2 gap-6">
    <div class="col-span-2 flex justify-between">
      <span class="font-bold text-xl">Product</span>
      <Select
        name="status"
        :value="product?.status || ProductsStatus.VISIBLE"
        :options="Object.keys(ProductsStatus)"
        :attributes="{
          placeholder: 'Select Status',
        }"
      />
    </div>
    <Input
      name="title"
      label="Product Title"
      :attributes="{
        placeholder: 'Enter Product Title',
      }"
      :value="product?.title"
      validation="required|minmax-2,100"
    />
    <ProductImageUploadInput
      :value="product?.images as string[]"
      name="images"
      validation="required"
    />
    <Textarea
      class="col-span-2"
      name="description"
      label="Description"
      :attributes="{
        placeholder: 'Enter product description',
      }"
      :value="product?.description"
      validation="required|alpha|minmax-395,1000"
    />
    <ListInputWIthTextareaInput
      :value="product?.ingredients as string[]"
      validation="arrayLength"
      label="Ingredient Details"
      :attributes="{
        placeholder: 'Enter ingredient description ',
      }"
      name="ingredients"
      btn-text="Add Ingredient"
    />
    <ListInputWIthTextareaInput
      :value="product?.instructions as string[]"
      validation="arrayLength"
      label="Use Instructions "
      :attributes="{
        placeholder: 'Enter instruction description ',
      }"
      name="instructions"
      btn-text="Add instruction steps"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
    <div
      class="col-span-2 grid grid-cols-3 gap-3 border rounded-md border-gray p-4"
    >
      <p class="col-span-3 border-b py-2 border-gray font-bold text-xl">
        Pricing
      </p>
      <Input
        name="price"
        label="Price"
        :attributes="{
          placeholder: 'Enter price',
        }"
        :value="product?.price"
        validation="required|price"
      />
      <div class="grid grid-cols-5 gap-1">
        <div class="col-span-4">
          <Input
            name="weight"
            label="Weight"
            validation="required"
            :attributes="{
              placeholder: 'Enter weight (e.g., 500G, 1KG)',
            }"
            :value="product?.weight"
          />
        </div>
        <Select
          :value="product?.weightUnit"
          label="."
          name="weightUnit"
          :options="weightUnit"
        />
      </div>
      <Input
        name="quantity"
        label="Quantity"
        :attributes="{
          placeholder: 'Enter stock quantity',
        }"
        :value="product?.quantity"
        validation="required|num"
      />
    </div>
    <div class="col-span-2 flex justify-end">
      <Button
        fullwidth
        size="md"
        type="secondary"
        :pending="pending"
        @click.prevent="submit(submitProduct)"
      >
        Submit
      </Button>
    </div>
  </Form>
</template>
