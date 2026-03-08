<template>
  <div v-if="pending" class="flex items-center justify-center min-h-[400px]">
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"
    ></div>
  </div>
  <div v-else-if="error" class="p-6 text-center text-red-500">
    <p>Error loading order details: {{ error }}</p>
    <Button @click="$router.back()" class="mt-4" type="edge"
      >Back to Orders</Button
    >
  </div>
  <div v-else-if="order" class="bg-[#F5F5F5] p-6 rounded-lg">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Order Items -->
      <div class="bg-white p-4 space-y-4 rounded-md shadow-sm">
        <h2
          class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3"
        >
          Order Items
        </h2>
        <div class="flex justify-between bg-[#F4F4F4] p-3 text-sm rounded">
          <div class="space-y-1">
            <p class="text-gray-500">Order ID</p>
            <p class="text-gray-500">Order created</p>
          </div>
          <div class="text-right space-y-1">
            <p class="font-medium select-all">{{ order._id }}</p>
            <p>{{ dateFormat(order.createdAt) }}</p>
          </div>
        </div>

        <!-- Items List -->
        <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <div
            v-for="item in order.orderItems"
            :key="item._id"
            class="flex items-center gap-4 group"
          >
            <img
              :src="`${staticRoute}/${item.image}`"
              class="w-16 h-16 rounded border object-cover bg-gray-50"
              v-if="item?.image"
            />
            <div class="flex-1">
              <div
                class="flex items-center justify-between border-b-2 border-black/5 pb-2"
              >
                <p class="text-sm font-medium">{{ item?.title }}</p>
                <p class="text-sm text-gray-500">x{{ item?.quantity }}</p>
              </div>
              <p class="text-sm mt-1 font-bold">
                {{ currencyFormat(item?.price) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Price Details -->
        <div class="pt-3 mt-3 text-sm space-y-2 border-t border-gray-100">
          <div class="flex justify-between">
            <span class="text-gray-500">Sub-total</span>
            <span>{{ currencyFormat(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between" v-if="order.tax > 0">
            <span class="text-gray-500">VAT</span>
            <span>{{ currencyFormat(order.tax) }}</span>
          </div>
          <div class="flex justify-between" v-if="order.discount > 0">
            <span class="text-red-500">Discount</span>
            <span class="text-red-500"
              >-{{ currencyFormat(order.discount) }}</span
            >
          </div>
          <div class="flex justify-between border-b-2 border-black/5 pb-3">
            <span class="text-gray-500">Shipping fee</span>
            <span>{{ currencyFormat(order.shippingCost) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg pt-1">
            <span>Total</span>
            <span class="text-black">{{ currencyFormat(order.total) }}</span>
          </div>
        </div>
      </div>

      <!-- Customer Section -->
      <div class="bg-white p-4 space-y-4 rounded-md shadow-sm">
        <h2
          class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3"
        >
          Customer
        </h2>
        <div class="text-sm space-y-2 bg-[#F4F4F4] p-3 rounded">
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">Full Name</span>
            <span class="font-medium">{{ order.customerInfo?.fullName }}</span>
          </div>
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">Phone Number</span>
            <span class="font-medium">{{
              order.customerInfo?.phoneNumber
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Email</span>
            <span class="font-medium">{{ order.customerInfo?.email }}</span>
          </div>
        </div>

        <!-- Payment Info -->
        <div class="bg-[#F4F4F4] p-3 rounded">
          <h3 class="text-sm font-semibold border-b-2 border-black/5 pb-2 mb-2">
            Payment Info
          </h3>
          <div class="text-sm space-y-1">
            <div class="flex justify-between">
              <span class="text-gray-500">Method</span>
              <span class="font-medium">{{
                order.paymentInfo?.paymentMethod
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Status</span>
              <span
                class="font-bold"
                :class="
                  order.paymentStatus === 'PAID'
                    ? 'text-green-600'
                    : 'text-red-500'
                "
                >{{ order.paymentStatus }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Shipping Address Section -->
      <div class="bg-white p-4 space-y-4 rounded-md shadow-sm">
        <h2
          class="text-lg font-semibold text-gray-800 border-b-2 border-black/5 pb-3"
        >
          Shipping Address
        </h2>
        <div class="text-sm bg-[#F4F4F4] p-3 space-y-2 rounded">
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">Street</span>
            <span class="font-medium">{{
              order.shippingAddress?.streetAddress
            }}</span>
          </div>
          <div
            v-if="order.shippingAddress?.apartment"
            class="flex justify-between border-b-2 border-black/5 pb-2"
          >
            <span class="text-gray-500">Apt / Unit</span>
            <span class="font-medium">{{
              order.shippingAddress?.apartment
            }}</span>
          </div>
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">City</span>
            <span class="font-medium">{{ order.shippingAddress?.city }}</span>
          </div>
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">Province</span>
            <span class="font-medium">{{
              order.shippingAddress?.province
            }}</span>
          </div>
          <div class="flex justify-between border-b-2 border-black/5 pb-2">
            <span class="text-gray-500">Postal Code</span>
            <span class="font-medium">{{
              order.shippingAddress?.postalCode
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Country</span>
            <span class="font-medium">{{
              order.shippingAddress?.country
            }}</span>
          </div>
        </div>

        <!-- Order Status Actions -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <h3 class="text-sm font-semibold mb-3">Order Actions</h3>
          <div class="flex flex-col gap-2">
            <button
              @click="handleShip"
              class="w-full h-11 rounded text-sm font-medium transition-colors"
              :class="
                order.orderStatus === 'SHIPPED'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-black text-white hover:bg-black/90'
              "
              :disabled="order.orderStatus === 'SHIPPED'"
            >
              {{
                order.orderStatus === "SHIPPED"
                  ? "Already Shipped"
                  : "Ship To Customer"
              }}
            </button>
            <button
              v-if="
                !['SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'].includes(
                  order.orderStatus,
                )
              "
              class="w-full h-11 bg-white border border-red-200 text-red-600 rounded text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Cancel Order and Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useApiRequest } from "~/composables/useApiRequest";
import { getOrderById } from "~/features/public/api/orderApi";
import { dateFormat, currencyFormat, staticRoute } from "~/utils/utils";
import Button from "~/components/Button.vue";
import { openModal } from "@customizer/modal-x";

const route = useRoute();
const { response, send, pending, error } = useApiRequest();

onMounted(() => {
  if (route.params.id) {
    send(() => getOrderById(route.params.id));
  }
});

const order = computed(() => {
  return response.value?.data || {};
});

const handleShip = () => {
  if (!order.value?._id) return;
  openModal("ShipOrder", { orderId: order.value._id }, (success) => {
    if (success) {
      send(() => getOrderById(route.params.id));
    }
  });
};
</script>
