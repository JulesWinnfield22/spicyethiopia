<script lang="ts" setup>
import Button from "~/components/Button.vue";
import UserStatusCell from "~/components/UserStatusCell.vue";
import Table from "~/components/Table.vue";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import type { User } from "~/interface";
import Dropdown from "~/components/Dropdown.vue";
import { USER_STATUS } from "~/utils/utils";
import icons from "~/utils/icons";
import { usePagination } from "~/composables/usePagination";
import { getUsers } from "~/features/admin/api/userApi";
import SearchInput from "~/features/admin/components/SearchInput.vue";
import { openModal } from "@customizer/modal-x";
import DropdownParent from "~/composables/DropdownParent.vue";

const searchQuery = ref("");
const activeFilter = ref("ALL");

const pagination = usePagination({
  cb: (data: any) =>
    getUsers({
      status: activeFilter.value !== "ALL" ? activeFilter.value : undefined,
      ...data,
    }),
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
  <Teleport to="#admin-actions" defer>
    <Button @click="openModal('AddUser' as any)" type="secondary">
      Add User
    </Button>
  </Teleport>
  <div
    class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
  >
    <div
      class="flex gap-2 overflow-x-auto w-full md:w-auto flex-nowrap pb-1 md:pb-0"
    >
      <Button
        :type="activeFilter == f ? 'secondary' : 'edge'"
        v-for="f in USER_STATUS"
        :key="f"
        @click="activeFilter = f"
        class="whitespace-nowrap shrink-0"
      >
        {{ f }}
      </Button>
    </div>
    <SearchInput
      v-model="searchQuery"
      placeholder="Search Users"
      width="w-full md:w-96"
    />
  </div>
  <Table
    :pending="pagination.pending.value"
    :headers="{
      head: ['Name', 'Email', 'Role', 'Phone', 'Status', 'Actions'],
      row: ['fullName', 'email', 'roleName', 'phone_number', 'userStatus'],
    }"
    :rows="pagination.data.value || []"
    :cells="{
      userStatus: UserStatusCell,
      fullName: (_: any, row: User) => `${row.firstName} ${row.fathersName}`,
      roleName: (_: any, row: User) => `${row.roles[0]?.name}`,
    }"
  >
    <template #actions="{ row }">
      <Dropdown position="right-bottom" v-slot="{ open, toggle }">
        <button
          class="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black transition-colors"
          @click="() => toggle()"
        >
          More
          <span>
            <i
              class="fa-solid"
              :class="open ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </span>
        </button>
        <DropdownParent
          :items="[
            {
              name: 'View Details',
              icon: icons.eye,
              action: () => console.log('View Details clicked for', row.id),
            },
            {
              name: 'Edit User',
              icon: icons.brush,
              action: () => openModal('EditUser' as any, row),
            },
            {
              name: 'Email User',
              icon: icons.mail,
              action: () => console.log('Email User clicked for', row.email),
            },
            {
              name: 'Delete User',
              icon: icons.trash1,
              action: () => console.log('Delete User clicked for', row.id),
            },
          ]"
        />
      </Dropdown>
    </template>
  </Table>
</template>
