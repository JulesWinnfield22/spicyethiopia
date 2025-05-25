<script lang="ts" setup>
import AdminDefaultPageWrapper from "@/components/AdminDefaultPageWrapper.vue";
import Button from "@/components/Button.vue";
import ShipmentStatusCell from "@/components/ShipmentStatusCell.vue";
import Table from "@/components/Table.vue";
import { usePagination } from "@/composables/usePagination";
import { getOrders } from "@/features/public/api/orderApi";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const dropdownOpen = ref<number | null>(null);
const toggleDropdown = (index: number) => {
  dropdownOpen.value = dropdownOpen.value === index ? null : index;
};

const router = useRouter();

const pagination = usePagination({
  cb: getOrders,
});

const handleAction = (product: any, action: string) => {
  alert(`Action "${action}" for product ${product.id}`);
  dropdownOpen.value = null;
};

const filters = ["Waiting", "Shipped", "Delivered", "Refunded", "All"];
const activeFilter = ref("Waiting");
</script>
<template>
  <AdminDefaultPageWrapper >
    <template #actions>
      <Button type="secondary"> New Orders </Button>
    </template>
    <div class="flex justify-between items-center">
      <div class="flex gap-2.5">
        <Button
          :type="activeFilter == f ? 'secondary' : 'edge'"
          v-for="f in filters"
          :key="f"
          @click="activeFilter = f"
        >
          {{ f }}
        </Button>
      </div>
      <div class="relative">
        <i
          class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-black/30"
        ></i>
        <input
          v-model="pagination.search.value"
          type="text"
          placeholder="Search Products"
          class="bg-gray px-10 py-1 rounded-md text-base w-96 h-12"
        />
      </div>
    </div>
    <Table
      :pending="pagination.pending.value"
      :headers="{
        head: [
          'Order ID',
          'Customer Full Name',
          'Order',
          'Order Price',
          'Phone',
          'Since',
          'Status',
          'Actions',
        ],
        row: [
          'id',
          'customerInfo.fullName',
          'item',
          'subtotal',
          'customerInfo.phoneNumber',
          'since',
          'orderStatus',
        ],
      }"
      :data="pagination.data.value?.data?.response || []"
      :cells="{
        orderStatus: ShipmentStatusCell,
      }"
    >
      <template #actions="{ row, index }">
        <div class="relative inline-block text-left">
          <button @click="toggleDropdown(index)">
            More
            <span v-if="dropdownOpen === index">
              <i class="fa-solid fa-chevron-up"></i>
            </span>
            <span v-else>
              <i class="fa-solid fa-chevron-down"></i>
            </span>
          </button>

          <div
            v-if="dropdownOpen === index"
            class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50 py-2"
          >
            <ul class="text-sm">
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                @click="handleAction(row, 'Edit')"
              >
                <i class="fa-solid fa-folder-open mr-2"></i> Open
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                @click="handleAction(row, 'Hide from Shop')"
              >
                <i class="fa-solid fa-truck-fast mr-2"></i> Ship Order
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                @click="handleAction(row, 'Out of Stock')"
              >
                <i class="fa-solid fa-envelope mr-2"></i> Email Customer
              </li>
              <li
                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                @click="handleAction(row, 'Delete Product')"
              >
                <i class="fa-regular fa-circle-xmark mr-2"></i> Reject Order
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Table>
  </AdminDefaultPageWrapper>
</template>
