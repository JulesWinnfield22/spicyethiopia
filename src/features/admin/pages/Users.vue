<script lang="ts" setup>
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Button from "@/components/Button.vue";
import UserStatusCell from "@/components/UserStatusCell.vue";
import Table from "@/components/Table.vue";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import type { User } from "@/interface";
import Dropdown from "@/components/Dropdown.vue";
import { USER_STATUS } from "@/utils/utils";
import DropdownParent from "@/composables/DropdownParent.vue";
import icons from "@/utils/icons";
import { usePagination } from "@/composables/usePagination";
import { getUsers } from "../api/userApi";
import SearchInput from "../components/SearchInput.vue";
import { openModal } from "@customizer/modal-x";
import { useUsersStore } from "../user/store/usersStore";

const router = useRouter(); // Used for navigation in goToAddUser if needed

const searchQuery = ref("");
const activeFilter = ref("ACTIVE");

const usersStore = useUsersStore();
const pagination = usePagination({
  store: usersStore,
  cb: (data: any) => getUsers({ status: activeFilter.value, ...data }),
  watch: [activeFilter],
});

// Watch for changes in searchQuery and update the pagination's search value
watch(searchQuery, (newValue) => {
  pagination.search.value = newValue;
});

watch(activeFilter, () => {
  console.log(activeFilter.value);
});
</script>

<template>
  <AdminDefaultPageWrapper>
    <template #actions>
      <Button @click="openModal('AddUser')" type="secondary"> Add User </Button>
    </template>
    <div class="flex justify-between items-center">
      <div class="flex gap-2.5">
        <Button
          :type="activeFilter == f ? 'secondary' : 'edge'"
          v-for="f in USER_STATUS"
          :key="f"
          @click="activeFilter = f"
        >
          {{ f }}
        </Button>
      </div>
      <SearchInput
        v-model="searchQuery"
        placeholder="Search Users"
        width="w-96"
      />
    </div>
    <Table
      :pending="pagination.pending.value"
      :headers="{
        head: ['Name', 'Email', 'Role', 'Phone', 'Status', 'Actions'],
        row: ['fullName', 'email', 'roleName', 'phone_number', 'userStatus'],
      }"
      :data="usersStore.users || []"
      :cells="{
        userStatus: UserStatusCell,
        fullName: (_: any, row: User) => `${row.firstName} ${row.fathersName}`,
        roleName: (_: any, row: User) => `${row.roles[0]?.name}`
      }"
    >
      <template #actions="{ row }">
        <Dropdown position="right-bottom" v-slot="{ open, toggle }">
          <button @click="() => toggle()">
            More
            <span v-if="open">
              <i class="fa-solid fa-chevron-up"></i>
            </span>
            <span v-else>
              <i class="fa-solid fa-chevron-down"></i>
            </span>
          </button>
          <DropdownParent
            :items="[
              {
                name: 'View Details',
                action: () =>
                  console.log('View Details clicked for', row.userUuid),
              },
              {
                name: 'Edit User',
                icon: icons.brush,
                action: () => openModal('EditUser', row),
              },
              {
                name: 'Email User',
                action: () => console.log('Email User clicked for', row.email),
              },
              {
                name: 'Delete User',
                action: () =>
                  console.log('Delete User clicked for', row.userUuid),
              },
            ]"
          />
        </Dropdown>
      </template>
    </Table>
  </AdminDefaultPageWrapper>
</template>
