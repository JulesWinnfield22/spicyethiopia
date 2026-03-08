<script setup lang="ts">
import FormModalParent from "~/components/FormModalParent.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import UserForm from "~/features/admin/user/form/UserForm.vue";
import icons from "~/utils/icons";
import { closeModal } from "@customizer/modal-x";
import type { PropType } from "vue";
import { getRoles } from "../../api/roleApi";
import { useForm } from "~/components/new_form_builder/useForm";
import Button from "~/components/Button.vue";
import type { User } from "~/interface";
import { createUser, updateUser } from "../../api/userApi";
import { useUsersStore } from "../store/usersStore";

const props = defineProps({
	data: {
		type: Object as PropType<User>,
		required: true
	}
})

const userReq = useApiRequest();
const roleReq = useApiRequest();

roleReq.send(
  () => getRoles(),
  (res) => {}
);

const { submit } = useForm("user-form");

const usersStore = useUsersStore()
function addUser({ values }: { values: User }) {
  if (userReq.pending.value) return;

  userReq.send(
    () => createUser(values),
    (res) => {
      if(res.success) {
        usersStore.add(res.data)
      }
    }
  );
}
</script>
<template>
  <FormModalParent title="Edit User">
    <UserForm
      v-if="!roleReq.pending.value"
			:user="data"
      :roles="roleReq.response.value?.response"
    />
    <template #bottom>
      <Button
        :pending="userReq.pending.value"
        @click="submit?.(addUser)"
        size="md"
        type="secondary"
        class="w-full"
      >
        Edit User
      </Button>
    </template>
  </FormModalParent>
</template>
