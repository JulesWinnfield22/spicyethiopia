<template>
  <div class="p-6 space-y-6 font-sans">
    <!-- Top Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800">Products</h1>
      <button
        @click="goToAddProduct"
        class="w-44 h-12 bg-black text-white cursor-pointer px-4 py-2 rounded text-sm font-medium"
      >
        Add New Product
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

    <!-- Products Table -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-black/5 h-[48px] text-black">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Products ID</th>
            <th class="px-4 py-2">Product Name</th>
            <th class="px-4 py-2">Products Description</th>
            <th class="px-4 py-2">On stock</th>
            <th class="px-4 py-2">Weight</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">More</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="relative"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3">{{ product.id }}</td>
            <td class="px-4 py-3">{{ product.name }}</td>
            <td class="px-4 py-3 truncate max-w-xs">{{ product.description }}</td>
            <td class="px-4 py-3">{{ product.stock }} Items</td>
            <td class="px-4 py-3">{{ product.weight }}</td>
            <td class="px-4 py-3 font-bold">${{ product.price }}</td>
            <td class="px-4 py-3">
              <span
                :class="{
                  'bg-[#ADF7AA] text-[#094411]': product.status === 'Available',
                  'bg-yellow-100 text-yellow-800': product.status === 'Hidden',
                  'bg-red-100 text-red-600': product.status === 'Out of Stock'
                }"
                class="px-3 py-2 rounded-lg text-xs font-medium"
              >
                {{ product.status }}
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
                      @click="handleAction(product, 'Edit')"
                    >
                      <i class="fa-regular fa-pen-to-square mr-2"></i> Edit
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      @click="handleAction(product, 'Hide from Shop')"
                    >
                      <i class="fa-regular fa-eye-slash mr-2"></i> Hide from Shop
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                      @click="handleAction(product, 'Out of Stock')"
                    >
                      <i class="fa-solid fa-boxes-stacked mr-2"></i> Out of Stock
                    </li>
                    <li
                      class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      @click="handleAction(product, 'Delete Product')"
                    >
                      <i class="fa-solid fa-trash mr-2"></i> Delete Product
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

const filters = ['Available', 'Out of Stock', 'Hidden', 'All']
const activeFilter = ref('Available')
const searchQuery = ref('')

const products = ref([
  { id: 'EID236789', name: 'Berebere', description: 'Bring bold, authentic Ethiopian flavors to your kitchen...', stock: 12, weight: '500G', price: 20, status: 'Available' },
  { id: 'EID23849', name: 'Senafich', description: 'Add a sharp, authentic kick to your dishes with our ...', stock: 0, weight: '250G', price: 15, status: 'Out of Stock' },
  { id: 'EID23865', name: 'Mitmita', description: 'Turn up the heat with our fiery Mitmita! Made from...', stock: 8, weight: '1KG', price: 12, status: 'Available' },
  { id: 'EID23901', name: 'Shiro Powder', description: 'Experience the rich, nutty flavor of our premium Shi...', stock: 0, weight: '500G', price: 18, status: 'Out of Stock' },
  { id: 'EID23956', name: 'Berbere Spice Mix', description: 'Elevate your culinary creations with our Berbere Spi...', stock: 20, weight: '300G', price: 22, status: 'Available' },
  { id: 'EID24012', name: 'Tena Adam', description: 'Discover the unique flavor of Tena Adam, an aromat...', stock: 25, weight: '100G', price: 10, status: 'Hidden' },
  { id: 'EID24078', name: 'Korerima', description: 'Enhance your meals with our Korerima, also known...', stock: 18, weight: '500G', price: 25, status: 'Available' },
  { id: 'EID24134', name: 'Niter Kibbeh', description: 'Indulge in the rich, clarified butter infused with spic...', stock: 12, weight: '250G', price: 18, status: 'Hidden' },
  { id: 'EID24199', name: 'Doro Wat Spice Kit', description: 'Create the iconic Ethiopian chicken stew with our D...', stock: 8, weight: '200G', price: 30, status: 'Available' },
  { id: 'EID24256', name: 'Teff Flour', description: 'Embrace the ancient grain with our Teff Flour, perfe...', stock: 30, weight: '1KG', price: 15, status: 'Available' },
  { id: 'EID24312', name: 'Berbere BBQ Sauce', description: 'Experience the fusion of flavors with our Berbere B...', stock: 14, weight: '350G', price: 12, status: 'Hidden' },
  { id: 'EID24378', name: 'Ethiopian Coffee', description: 'Savor the rich, aromatic taste of our Ethiopian Coff...', stock: 50, weight: '250G', price: 15, status: 'Available' },
])

const filteredProducts = computed(() => {
  let result = products.value

  if (activeFilter.value !== 'All') {
    result = result.filter((product) => product.status === activeFilter.value)
  }

  if (searchQuery.value) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})
</script>

<style scoped></style>
