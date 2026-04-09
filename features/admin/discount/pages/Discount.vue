<script setup lang="ts">
import { usePagination } from "~/composables/usePagination";
import { getAllDiscounts } from "../api/discountApi";
import Button from "~/components/Button.vue";
import { openModal } from "@customizer/modal-x";
import Table from "~/components/Table.vue";
import icons from "~/utils/icons";
import Dropdown from "~/components/Dropdown.vue";
import DropdownParent from "~/composables/DropdownParent.vue";
import { useDiscountsStore } from "../store/discountsStore";
import { ref, watch } from "vue";
import SearchInput from "~/features/admin/components/SearchInput.vue";

const searchQuery = ref("");
const activeFilter = ref("ACTIVE");

const DISCOUNT_STATUS = ["ACTIVE", "INACTIVE", "ALL"];

const pagination = usePagination({
  cb: (data: any) =>
    getAllDiscounts({
      status: activeFilter.value !== "ALL" ? activeFilter.value : undefined,
      ...data,
    }),
  watch: [activeFilter],
});

// Watch for changes in searchQuery and update the pagination's search value
watch(searchQuery, (newValue) => {
  pagination.search.value = newValue;
});

// Format date to readable format
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Calculate duration between start and end date
function calculateDuration(startDate: string, endDate: string) {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return `${diffDays} days (${formatDate(startDate)} - ${formatDate(endDate)})`;
}
</script>

<template>
  <Teleport to="#admin-actions" defer>
    <Button @click="openModal('AddDiscount')" type="secondary">
      Add Global Discount
    </Button>
  </Teleport>
  <div class="flex justify-between items-center mb-4">
    <div class="flex gap-2.5">
      <Button
        :type="activeFilter == f ? 'secondary' : 'edge'"
        v-for="f in DISCOUNT_STATUS"
        :key="f"
        @click="activeFilter = f"
      >
        {{ f }}
      </Button>
    </div>
    <SearchInput
      v-model="searchQuery"
      placeholder="Search Discounts"
      width="w-96"
    />
  </div>
  <Table
    :pending="pagination.pending.value"
    :headers="{
      head: ['Discount Percentage', 'Duration', 'Status', 'Actions'],
      row: ['discountPercentage', 'duration', 'status'],
    }"
    :rows="pagination.data.value || []"
    :cells="{
      discountPercentage: (value: number) => `${value}%`,
      duration: (_, row) => calculateDuration(row.startDate, row.endDate),
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
              name: 'Edit Discount',
              icon: icons.brush,
              action: () => openModal('EditDiscount', row),
            },
            {
              name: 'Remove Discount',
              action: () => console.log('Delete Discount clicked for', row.id),
            },
          ]"
        />
      </Dropdown>
    </template>
  </Table>
</template>
