<script lang="ts" setup>
import { ref } from "vue";
import Table from "~/components/Table.vue";
import Button from "~/components/Button.vue";
import Search from "~/components/Search.vue";
import { openModal } from "@customizer/modal-x";
import { getMessages } from "~/features/admin/api/messageApi";
import { usePagination } from "~/composables/usePagination";

const pagination = usePagination({
  cb: getMessages,
});
</script>

<template>
  <div class="space-y-6 pt-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Inbound Messages</h1>
      <Search v-model="pagination.search.value" />
    </div>

    <Table
      :pending="pagination.pending.value"
      :headers="{
        head: ['Full Name', 'Email', 'Phone', 'Message', 'Actions'],
        row: ['fullName', 'email', 'phoneNumber', 'message'],
      }"
      :rows="pagination.response.value || []"
    >
      <template #message="{ value }">
        <p class="truncate max-w-[300px]">{{ value }}</p>
      </template>
      <template #actions="{ row }">
        <Button
          @click="() => openModal('MessageDetail', row)"
          type="edge"
          size="sm"
          class="text-black underline hover:font-bold"
        >
          Open
        </Button>
      </template>
    </Table>
  </div>
</template>
