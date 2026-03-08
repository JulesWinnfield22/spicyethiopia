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

const filters = ["Waiting", "Shipped", "Delivered", "Refunded", "All"];
const activeFilter = ref("Waiting");

const pagination = usePagination<Order>({
  cb: (query: any) => getOrders({ ...query, status: activeFilter.value }),
  watch: [activeFilter],
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
    <Search v-model="pagination.search.value" />
  </div>
  <Table
    @row="() => {}"
    :rows="pagination.response.value || []"
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
