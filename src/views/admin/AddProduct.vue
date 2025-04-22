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

    <!-- Product Section -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-lg mb-2">Product</h2>
        <!-- Visibility Dropdown -->
        <div class="relative">
          <button @click="toggleVisibilityDropdown" class="flex items-center space-x-2 bg-[#F2F3F6] px-7 py-3 cursor-pointer rounded text-sm">
            <i :class="form.visible ? 'fa-solid fa-eye text-gray-500 -ml-5' : 'fa-solid fa-eye-slash text-gray-500 -ml-5'"></i>
            <span>{{ form.visible ? 'Visible' : 'Hidden' }}</span>
            <i class="fa-solid fa-chevron-down ml-5 text-[#111111]"></i>
          </button>
          <div v-if="showDropdown" class="absolute right-0 mt-2 bg-[#F2F3F6] rounded shadow z-10 w-36">
            <button @click="setVisibility(true)" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
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
        <div>
          <label class="text-sm font-medium">* Title</label>
          <input v-model="form.name" type="text" class="w-full bg-[#F2F3F6] rounded px-4 py-3 mt-4" placeholder="Your product title" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium invisible">Upload Images</label>
          <button class="w-full border-2 border-dashed border-[#C5CDE9] cursor-pointer rounded py-4 text-base text-black flex justify-center items-center gap-2">
            <div class="flex items-center justify-between w-full px-4">
              <div class="flex items-center gap-3">
                <div class="bg-[#F2F3F6] w-12 h-12 rounded-md items-center p-3">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <span>Upload images</span>
              </div>
              <i class="fa-solid fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium">Description</label>
        <textarea v-model="form.description" placeholder="Write your message" class="w-full h-56 mt-4 bg-[#F2F3F6] px-4 py-2 rounded-md resize-none text-sm"></textarea>
      </div>

      <!-- Ingredients and Instructions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="text-sm font-medium">* Ingredient Details</label>
          <textarea v-model="form.ingredientDescription" placeholder="Enter ingredient description" class="w-full h-[120px] bg-[#F2F3F6] px-4 py-2 mt-4 rounded-md resize-none text-sm"></textarea>
          <ul class="list-disc pl-5 mt-4 space-y-1">
            <li v-for="(item, index) in form.ingredients" :key="index">{{ item }}</li>
          </ul>
          <input v-model="newIngredient" placeholder="Ingredient" class="mt-3 w-full bg-[#F2F3F6] px-4 py-2 rounded-md text-sm" />
          <p class="text-sm font-medium cursor-pointer mt-2" @click="addIngredient">+ Add Ingredient</p>
        </div>
        <div>
          <label class="text-sm font-medium">* Use Instructions</label>
          <textarea v-model="form.instructionDescription" placeholder="Enter instruction description" class="w-full h-[120px] bg-[#F2F3F6] px-4 py-2 mt-4 rounded-md resize-none text-sm"></textarea>
          <ul class="list-disc pl-5 mt-4 space-y-1">
            <li v-for="(step, index) in form.instructions" :key="index">{{ step }}</li>
          </ul>
          <input v-model="newInstruction" placeholder="Step" class="mt-3 w-full bg-[#F2F3F6] px-4 py-2 rounded-md text-sm" />
          <p class="text-sm font-medium cursor-pointer mt-2" @click="addInstruction">+ Add Instruction Steps</p>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label class="text-sm font-medium">* Price</label>
        <input v-model="form.price" type="number" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="20.00" />
      </div>
      <div>
        <label class="text-sm font-medium">* Weight</label>
        <div class="flex mt-1">
          <input v-model="form.weight" type="number" class="w-full bg-[#F2F3F6] rounded-l px-4 py-2" placeholder="2" />
          <select v-model="form.weightUnit" class="bg-[#F2F3F6] border-l border-gray-300 rounded-r px-4 py-2">
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-sm font-medium">* Quantity</label>
        <input v-model="form.quantity" type="number" class="w-full bg-[#F2F3F6] rounded px-4 py-2 mt-1" placeholder="100" />
      </div>
    </div>

    <!-- Categories -->
    <!-- Categories -->
<div class="bg-white rounded-lg shadow p-6 space-y-6">
  <h2 class="font-semibold text-lg mb-2 border-b-2 border-black/5 pb-3">Categories</h2>

  <div class="flex flex-wrap gap-6 mt-2 w-full">
    <button
      v-for="cat in allCategories"
      :key="cat"
      type="button"
      @click="selectCategory(cat)"
      class="flex items-center  w-[260px] h-[50px] gap-32 px-4 py-2 rounded-md text-sm border border-[#DADCE0]"
      :class="form.category === cat ? 'bg-black text-white' : 'bg-white text-gray-800'"
    >
      <span>{{ cat }}</span>
      <input
        type="checkbox"
        class="accent-black"
        :checked="form.category === cat"
        readonly
      />
      
    </button>
  </div>

  <button class="text-xs text-black cursor-pointer mt-2">+ Assign new category</button>
</div>


    <!-- Publish Button -->
    <div class="flex justify-end">
      <button @click="handleSubmit" class="bg-black text-white px-6 py-2 rounded">Publish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '../../composables/productsStore'

const productsStore = useProductsStore()

const allCategories = ['Category one', 'Category two', 'Category three', 'Category four']

const form = ref({
  name: '',
  description: '',
  ingredientDescription: '',
  ingredients: [] as string[],
  instructionDescription: '',
  instructions: [] as string[],
  price: 0,
  discountPrice: 0,
  sku: '',
  weight: 0,
  weightUnit: 'kg',
  quantity: 0,
  category: '', // changed from array to string
  visible: true,
})

const newIngredient = ref('')
const newInstruction = ref('')
const showDropdown = ref(false)

const toggleVisibilityDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const setVisibility = (value: boolean) => {
  form.value.visible = value
  showDropdown.value = false
}

const addIngredient = () => {
  if (newIngredient.value.trim()) {
    form.value.ingredients.push(newIngredient.value.trim())
    newIngredient.value = ''
  }
}

const addInstruction = () => {
  if (newInstruction.value.trim()) {
    form.value.instructions.push(newInstruction.value.trim())
    newInstruction.value = ''
  }
}

const selectCategory = (cat: string) => {
  form.value.category = form.value.category === cat ? '' : cat
}

const handleSubmit = () => {
  const newProduct = {
    id: crypto.randomUUID(),
    name: form.value.name,
    description: form.value.description,
    ingredientDescription: form.value.ingredientDescription,
    ingredients: form.value.ingredients,
    instructionDescription: form.value.instructionDescription,
    instructions: form.value.instructions,
    price: Number(form.value.price),
    discountPrice: form.value.discountPrice ? Number(form.value.discountPrice) : undefined,
    sku: form.value.sku || undefined,
    weight: `${form.value.weight} ${form.value.weightUnit}`,
    quantity: Number(form.value.quantity) || 0,
    status: form.value.visible ? 'Published' : 'Hidden',
    category: form.value.category,
  }

  productsStore.addProduct(newProduct)
  console.log('Product added:', newProduct)

  Object.assign(form.value, {
    name: '',
    description: '',
    ingredientDescription: '',
    ingredients: [],
    instructionDescription: '',
    instructions: [],
    price: 0,
    discountPrice: 0,
    sku: '',
    weight: 0,
    weightUnit: 'kg',
    quantity: 0,
    category: '',
    visible: true,
  })

  showDropdown.value = false
}
</script>

<style scoped>
</style>

