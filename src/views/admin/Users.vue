<template>
  <div class="p-6 space-y-8 font-sans">
    
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-chevron-left text-sm"></i>
        <h1 class="text-lg font-medium text-gray-800">Add Product</h1>
      </div>
      <button class="text-xs border px-4 py-2 rounded border-gray-300 hover:bg-gray-100">Email Customer</button>
    </div>

    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      
      <!-- Product Section -->
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-semibold text-lg mb-2">Product</h2>

          <!-- Visibility Dropdown -->
        <div class="relative ">
          <button @click="toggleVisibilityDropdown" class="flex items-center space-x-2 bg-[#F2F3F6] px-7 py-3 cursor-pointer rounded text-sm">
            <i :class="form.visible ? 'fa-solid fa-eye text-gray-500 -ml-5' : 'fa-solid fa-eye-slash text-gary-500 -ml-5'"></i>
            <span>{{ form.visible ? 'Visible' : 'Hidden' }}</span>
            <i class="fa-solid fa-chevron-down ml-5 text-[#111111]"></i>
          </button>
        <div v-if="showDropdown" class="absolute right-0 mt-2 bg-[#F2F3F6] rounded shadow z-10 w-36">
          <button @click="setVisibility(true)" class="flex items-center cursor-pointer gap-2 px-4 py-2 hover:bg-gray-100 w-full">
            <i class="fa-solid fa-eye text-gray-500"></i>
            <span>Visible</span>
          </button>
          <button @click="setVisibility(false)" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
            <i class="fa-solid fa-eye-slash text-gray-500"></i>
            <span>Hidden</span>
          </button>
        </div>
      </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mt-5">
            <label class="text-sm font-medium">* Title</label>
            <input v-model="form.name" type="text" class="w-full bg-[#F2F3F6] rounded px-4 py-3 mt-4" placeholder="Your product title" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium invisible">Upload Images</label>
            <button class="w-full border-2 border-dashed border-[#C5CDE9] cursor-pointer rounded py-4 text-center text-base text-black flex justify-center items-center gap-2">
              <div class="flex items-center justify-between gap-[470px]">
                <div class="flex items-center">
                  <div class="bg-[#F2F3F6] w-12 h-12 rounded-md items-center p-3">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                <span class="ml-3">Upload images</span>
              </div>
              <div>
                <i class="fa-solid fa-chevron-right"></i>
              </div>
              </div>
              
            </button>
          </div>
        </div>

        <div class="mt-4">
          <label class="text-sm font-medium">Description</label>
          <textarea v-model="form.description" class="w-full bg-[#F2F3F6] rounded mt-1 p-3 h-32" placeholder="Product description"></textarea>
        </div>

        

      </div>   
    </div>

    <!-- Pricing Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h2 class="font-semibold text-lg mb-2 border-b-2 border-black/5 pb-3">Pricing</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label class="text-sm font-medium">* Price</label>
            <input v-model.number="form.price" type="number" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="$ 2.00" />
          </div>
          <div>
            <label class="text-sm font-medium">Discount price</label>
            <input v-model.number="form.discountPrice" type="number" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="$ 1.00" />
          </div>
          <div>
            <label class="text-sm font-medium">SKU</label>
            <input v-model="form.sku" type="text" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="62638202" />
          </div>
          <div>
            <label class="text-sm font-medium">Weight (kg)</label>
            <input v-model="form.weight" type="text" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1"  placeholder="1 KG" />
          </div>
          <div>
            <label class="text-sm font-medium">* Quantity</label>
            <input v-model.number="form.quantity" type="number" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="10" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Categories -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6"> 
      <div>
        <h2 class="font-semibold text-lg mb-2 border-b-2 border-black/5 pb-3">Categories</h2>
        <button class="w-full text-xs text-black cursor-pointer text-left">
          + Assign to category or add new
        </button>
        
      </div>
    </div>

    <!-- Submit -->
      <div class="flex justify-end">
        <button @click="handleSubmit" class="bg-black text-white px-6 py-2 rounded">Publish</button>
      </div>



  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '../../composables/productsStore'


const productsStore = useProductsStore()

const form = ref({
  name: '',
  description: '',
  price: '',
  discountPrice: '',
  sku: '',
  weight: '',
  quantity: '',
  category: '',
  visible: true,
})

const showDropdown = ref(false)
const toggleVisibilityDropdown = () => {
  showDropdown.value = !showDropdown.value
}
const setVisibility = (value: boolean) => {
  form.value.visible = value
  showDropdown.value = false
}

const handleSubmit = () => {
  const newProduct = {
    id: crypto.randomUUID(),
    name: form.value.name,
    description: form.value.description,
    price: Number(form.value.price),
    discountPrice: form.value.discountPrice ? Number(form.value.discountPrice) : undefined,
    sku: form.value.sku || undefined,
    weight: form.value.weight || undefined,
    quantity: Number(form.value.quantity) || 0,
    status: form.value.visible ? 'Published' : 'Hidden',
    category: form.value.category,
  }

  productsStore.addProduct(newProduct)
  console.log('Product added:', newProduct)

  Object.assign(form.value, {
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    sku: '',
    weight: '',
    quantity: '',
    category: '',
    visible: true,
  })
  showDropdown.value = false
}
</script>

<style scoped>
</style>

