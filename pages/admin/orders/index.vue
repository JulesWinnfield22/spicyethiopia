<script lang="ts" setup>
import Button from "~/components/Button.vue";
import Search from "~/components/Search.vue";
import ShipmentStatusCell from "~/components/ShipmentStatusCell.vue";
import Table from "~/components/Table.vue";
import DropdownWrapper from "~/components/DropdownWrapper.vue";
import OrderCustomerCell from "~/features/admin/components/OrderCustomerCell.vue";
import OrderItemsCell from "~/features/admin/components/OrderItemsCell.vue";
import OrderFinancialsCell from "~/features/admin/components/OrderFinancialsCell.vue";
import { usePagination } from "~/composables/usePagination";
import { getOrders } from "~/features/public/api/orderApi";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { openModal } from "@customizer/modal-x";
import { dateFormat } from "~/utils/utils";
import type { Order } from "~/interface/order";

const router = useRouter();

const orderActions = [
  { name: "Open", icon: "fa-solid fa-folder-open" },
  { name: "Ship Order", icon: "fa-solid fa-truck-fast" },
  { name: "Email Customer", icon: "fa-solid fa-envelope" },
  {
    name: "Reject Order",
    icon: "fa-regular fa-circle-xmark",
    class: "text-red-500",
  },
];

const orderStatusFilters = [
  "All",
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
  "EXPIRED",
];

const paymentStatusFilters = ["All", "PENDING", "PAID", "FAILED", "REFUNDED"];

const activeOrderStatus = ref("All");
const activePaymentStatus = ref("All");

const pagination = usePagination<Order>({
  cb: (query: any) =>
    getOrders({
      ...query,
      status:
        activeOrderStatus.value === "All" ? undefined : activeOrderStatus.value,
      paymentStatus:
        activePaymentStatus.value === "All"
          ? undefined
          : activePaymentStatus.value,
    }),
  watch: [activeOrderStatus, activePaymentStatus],
});

const handleAction = (order: Order, actionText: string) => {
  if (actionText === "Open") {
    router.push(`/admin/orders/${order._id}`);
  } else if (actionText === "Ship Order") {
    openModal("ShipOrder", { orderId: order._id }, (success: any) => {
      if (success) {
        pagination.send();
      }
    });
  } else {
    alert(`Action "${actionText}" for order ${order.id}`);
  }
};
</script>

<template>
  <Teleport to="#admin-actions" defer>
    <Button type="secondary"> New Orders </Button>
  </Teleport>
  <div class="flex flex-col md:flex-row items-start md:items-center gap-3">
    <div class="flex gap-2 w-full md:w-auto">
      <!-- Order Status dropdown -->
      <div class="flex flex-col gap-1 flex-1 md:flex-initial">
        <label
          class="text-[11px] font-semibold text-gray-400 uppercase tracking-wide"
          >Order Status</label
        >
        <select
          v-model="activeOrderStatus"
          class="h-9 px-3 pr-8 rounded-lg border border-gray-300 bg-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <option v-for="f in orderStatusFilters" :key="f" :value="f">
            {{
              f === "All"
                ? "All Statuses"
                : f.charAt(0) + f.slice(1).toLowerCase()
            }}
          </option>
        </select>
      </div>
      <!-- Payment Status dropdown -->
      <div class="flex flex-col gap-1 flex-1 md:flex-initial">
        <label
          class="text-[11px] font-semibold text-gray-400 uppercase tracking-wide"
          >Payment</label
        >
        <select
          v-model="activePaymentStatus"
          class="h-9 px-3 pr-8 rounded-lg border border-gray-300 bg-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <option v-for="f in paymentStatusFilters" :key="f" :value="f">
            {{
              f === "All"
                ? "All Payments"
                : f.charAt(0) + f.slice(1).toLowerCase()
            }}
          </option>
        </select>
      </div>
    </div>
    <Search
      v-model="pagination.search.value"
      class="w-full md:w-auto md:ml-auto"
    />
  </div>
  <Table
    :pending="pagination.pending.value"
    @row="() => {}"
    :rows="pagination.data.value || []"
    :headers="{
      head: [
        'Order ID',
        'Date',
        'Customer',
        'Items Summary',
        'Financials',
        'Status',
        'Actions',
      ],
      row: [
        'id',
        'createdAt',
        'customerInfo',
        'orderItems',
        'total',
        'orderStatus',
      ],
    }"
  >
    <template #createdAt="{ value, row }">
      {{ dateFormat(row.createdAt) }}
    </template>

    <template #customerInfo="{ value, row }">
      <OrderCustomerCell :row="row" />
    </template>

    <template #orderItems="{ row }">
      <OrderItemsCell :row="row" />
    </template>

    <template #total="{ row }">
      <OrderFinancialsCell :row="row" />
    </template>

    <template #orderStatus="{ row }">
      <ShipmentStatusCell :row="row" />
    </template>

    <template #actions="{ row }">
      <div class="flex items-center gap-2">
        <DropdownWrapper
          label="Order Actions"
          actionText="Actions"
          :options="orderActions.map((a) => a.name)"
          alignment="right-bottom"
          @select="(actionName) => handleAction(row, actionName)"
        >
          <template #item="{ item }">
            <div
              class="flex items-center gap-2"
              :class="orderActions.find((a) => a.name === item)?.class"
            >
              <i :class="orderActions.find((a) => a.name === item)?.icon"></i>
              <span>{{ item }}</span>
            </div>
          </template>
        </DropdownWrapper>
      </div>
    </template>
  </Table>
</template>
