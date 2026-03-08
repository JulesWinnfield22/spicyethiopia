<script setup lang="ts">
import Form from "~/components/new_form_builder/Form.vue";
import { Input } from "~/components/new_form_elements";
import InputPassword from "~/components/new_form_elements/InputPassword.vue";
import Select from "~/components/new_form_elements/Select.vue";
import type { Role, User } from "~/interface";
import type { PropType } from "vue";

const props = defineProps({
  user: Object as PropType<User>,
  roles: {
    type: Array as PropType<Role[]>,
    required: true,
  },
});
</script>

<template>
  <Form :inner="false" id="user-form" class="grid grid-cols-2 gap-4">
    <Input
      :value="user?.firstName"
      name="firstName"
      validation="required|alpha|minmax-2,15"
      label="First Name"
      :attributes="{
        placeholder: 'Enter First Name',
      }"
    />
    <Input
      :value="user?.fathersName"
      name="fathersName"
      validation="required|alpha|minmax-2,15"
      label="Fathers Name"
      :attributes="{
        placeholder: 'Enter Fathers Name',
      }"
    />
    <Input
      :value="user?.grandFathersName"
      name="grandFathersName"
      validation="alpha|minmax-2,15"
      label="Grand Fathers Name"
      :attributes="{
        placeholder: 'Enter Grand Fathers Name',
      }"
    />

    <Input
      :value="user?.email"
      name="email"
      validation="required|email"
      label="Email"
      :attributes="{
        placeholder: 'Enter your Email',
      }"
    />
    <Input
      :value="user?.phone_number"
      name="phone_number"
      validation="required|phone"
      label="Phone Number"
      :attributes="{
        placeholder: 'Enter your Phone Number',
      }"
    />
    <Select
      :value="user?.roles?.[0].id"
      :obj="true"
      name="roles"
      validation="required"
      label="Roles"
      :options="roles.map((el) => ({ label: el.name, value: el.id }))"
      :attributes="{
        placeholder: 'Roles',
      }"
    />
    <InputPassword
      :value="user?.password"
      name="password"
      validation="required|minmax-6,12"
      label="Password"
      :attributes="{
        placeholder: 'Password',
      }"
    />
  </Form>
</template>
