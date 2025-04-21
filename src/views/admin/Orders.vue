<template>
  <div class="p-6 space-y-6 font-sans">
    <!-- Top Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800">Orders</h1>
      <button
        
        class="w-44 h-12 bg-black text-white cursor-pointer px-4 py-2 rounded text-sm font-medium"
      >
        New Orders
      </button>
    </div>

    <!-- Filters + Search -->
    <div class="flex justify-between items-center">
      <div class="space-x-2">
        <button
          v-for="f in filters"
          :key="f"
          @click="activeFilter = f"
          class="h-[38px] px-4 py-1 rounded-sm text-sm font-medium"
          :class="{
            'bg-black text-white': activeFilter === f,
            'bg-gray-100 border border-black/10 text-black': activeFilter !== f
          }"
        >
          {{ f }}
        </button>
      </div>
      <div class="relative">
        <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-black/30"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Products"
          class="bg-gray-100 px-10 py-1 rounded-md text-base w-96 h-12"
        />
      </div>
    </div>

    <!-- Orders Table -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-black/5 h-[48px] text-black">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Order ID</th>
            <th class="px-4 py-2">Customer Full Name</th>
            <th class="px-4 py-2">Order</th>
            
            <th class="px-4 py-2">Order Price</th>
            <th class="px-4 py-2">Order Since</th>
            <th class="px-4 py-2">Phone number</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in filteredProducts"
            :key="index"
            class="relative"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3">{{ order.id }}</td>
            <td class="px-4 py-3">{{ order.customer }}</td>
            <td class="px-4 py-3 truncate max-w-xs">{{ order.item }}</td>
            <td class="px-4 py-3">{{ order.price }} Items</td>
            <td class="px-4 py-3">{{ order.since }}</td>
            <td class="px-4 py-3 font-bold">${{ order.phone }}</td>
            <td class="px-4 py-3">
              <span
                :class="{
                  'bg-[#ADF7AA] text-[#094411]': order.status === 'Delivered',
                  'bg-yellow-100 text-yellow-800': order.status === 'Waiting',
                  'bg-[#aad7f7] text-[#093544]': order.status === 'Shipped',
                  'bg-red-100 text-red-600': order.status === 'Refunded',
                }"
                class="px-4 py-2 rounded-lg text-xs font-medium"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-4 py-3 relative">
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
                      @click="handleAction(order, 'Edit')"
                    >
                      <i class="fa-solid fa-folder-open mr-2"></i> Open
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      @click="handleAction(order, 'Hide from Shop')"
                    >
                      <i class="fa-solid fa-truck-fast mr-2"></i> Ship Order
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      @click="handleAction(order, 'Out of Stock')"
                    >
                      <i class="fa-solid fa-envelope mr-2"></i> Email Customer
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      @click="handleAction(order, 'Delete Product')"
                    >
                      <i class="fa-regular fa-circle-xmark mr-2"></i> Reject Order
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination & Footer -->
    <div class="flex items-center justify-between">
      <h1 class="text-sm font-semibold text-gray-800">
        ©2025, The Spicy Ethiopian
      </h1>
      <div class="flex gap-2">
        <button
          class="w-24 h-12 bg-gray-50 border border-black/10 text-black px-4 py-2 rounded text-sm font-medium"
        >
          Previous
        </button>
        <button
          class="w-24 h-12 bg-black text-white px-4 py-2 rounded text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const dropdownOpen = ref<number | null>(null)
const toggleDropdown = (index: number) => {
  dropdownOpen.value = dropdownOpen.value === index ? null : index
}

const router = useRouter()

const goToAddProduct = () => {
  router.push('/addProduct')
}

const handleAction = (product: any, action: string) => {
  alert(`Action "${action}" for product ${product.id}`)
  dropdownOpen.value = null
}

const filters = ['Waiting', 'Shipped', 'Delivered', 'Refunded' , 'All']
const activeFilter = ref('Waiting')
const searchQuery = ref('')

const products = ref([
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Shipped',
  },
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Shipped',
  },
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Refunded',
  },
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Shipped',
  },
   {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Delivered',
  },
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Shipped',
  },
  {
    id: 'EID238978',
    customer: 'Alemu Tadesse',
    item: '3 X 1KG Mitmita',
    price: 105,
    since: '1 Day',
    phone: '+1987654321',
    status: 'Waiting',
  },
])

const filteredProducts = computed(() => {
  let result = products.value

  if (activeFilter.value !== 'All') {
    result = result.filter((order) => order.status === activeFilter.value)
  }

  if (searchQuery.value) {
    result = result.filter((order) =>
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})
</script>

<style scoped></style>

