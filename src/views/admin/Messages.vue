<template>
  <div class="p-6 space-y-6 font-sans">
    <!-- Top Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-800">Messages</h1>
    </div>

    <!-- Messages Table -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-black/5 h-[48px] text-black">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Full name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Phone number</th>
            <th class="px-4 py-2">Message</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(message, index) in paginatedMessages"
            :key="index"
            class="relative"
          >
            <td class="px-4 py-3">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="px-4 py-3">{{ message.name }}</td>
            <td class="px-4 py-3">{{ message.email }}</td>
            <td class="px-4 py-3 truncate max-w-xs">{{ message.phone }}</td>
            <td class="px-4 py-3 truncate max-w-sm">{{ message.message }}</td>
            <td class="px-4 py-3">
  <RouterLink
    :to="`/admin/messages/${(currentPage - 1) * pageSize + index}`"
    class="text-black underline hover:font-medium"
  >
    Open
  </RouterLink>
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
          @click="prevPage"
          :disabled="currentPage === 1"
          class="w-24 h-12 bg-gray-50 border border-black/10 text-black px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="w-24 h-12 bg-black text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const messages = ref([
  { name: 'Jon Doe', email: 'johndoe@example.com', phone: '+1 (416) 555-0199', message: 'I loved your berbere, can you please get me in a bigger size like in 245 kg...' },
  { name: 'Sara Smith', email: 'sara@example.com', phone: '+1 (416) 555-0198', message: 'Can you ship to Europe?' },
  { name: 'Ali Ahmed', email: 'ali@example.com', phone: '+1 (416) 555-0197', message: 'Bulk order request: 100 kg' },
  { name: 'Liya Tesfaye', email: 'liya@example.com', phone: '+1 (416) 555-0196', message: 'How long does delivery take to DC?' },
  { name: 'Mike Chen', email: 'mike@example.com', phone: '+1 (416) 555-0195', message: 'Is your mitmita gluten-free?' },
  { name: 'Emma Johnson', email: 'emma@example.com', phone: '+1 (416) 555-0194', message: 'I want to resell your spices in my store.' },
  { name: 'Carlos Gomez', email: 'carlos@example.com', phone: '+1 (416) 555-0193', message: 'Payment failed on checkout.' },
  { name: 'Fatima Yusuf', email: 'fatima@example.com', phone: '+1 (416) 555-0192', message: 'Can you send samples?' },
])

const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(messages.value.length / pageSize))
const paginatedMessages = computed(() =>
  messages.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
)
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
</script>

