<template>
  <div class="p-6 space-y-6 font-sans">
    <div class="flex justify-between items-center">
      <RouterLink to="/admin/messages" class="text-lg text-gray-800 cursor-pointer font-medium hover:underline">
         <i class="fa-solid fa-chevron-left text-sm"></i>
        Messages
      </RouterLink>
      <button
        @click="openReplyModal"
        class="bg-black text-white px-4 py-3 cursor-pointer rounded text-sm font-medium"
      >
        Reply to Customer
      </button>
    </div>
    <div class="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <p class="text-base font-semibold text-[#636363]">Full Name</p>
        <div class="w-full bg-[#F2F3F6] p-3 mt-3 rounded-sm">
            <p class="text-base">{{ message?.name }}</p>
        </div>     
      </div>
      <div>
        <p class="text-base font-semibold text-[#636363]">Email</p>
        <div class="w-full bg-[#F2F3F6] p-3 mt-3 rounded-sm">
            <p class="text-base text-[#1D1C1B]">{{ message?.email }}</p>
        </div> 
      </div>
      <div>
        <p class="text-base font-semibold text-[#636363]">Phone Number</p>
        <div class="w-full bg-[#F2F3F6] p-3 mt-3 rounded-sm">
            <p class="text-base text-[#1D1C1B]">{{ message?.phone }}</p>
        </div>
        
      </div>
      <div>
        <p class="text-xs font-semibold text-[#636363]">Message</p>
        <div class="w-full bg-[#F2F3F6] p-3 mt-3 rounded-sm">
            <p class="text-base text-[#1D1C1B]">{{ message?.message }}</p>
        </div>
        
      </div>
    </div>

    <!-- Reply Modal -->
    <div
  v-if="isReplyModalOpen"
  class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
  @click.self="isReplyModalOpen = false"
>
  <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 space-y-6 relative">
    <!-- Close Button -->
    <button
      @click="isReplyModalOpen = false"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
    >
      <i class="fa-regular fa-circle-xmark cursor-pointer"></i>
    </button>

    <h2 class="text-lg font-semibold text-[#1D1C1B] border-b-2 border-[#444444]/10 pb-3">Reply to Customer</h2>

    <div>
      <p class="mb-2 text-black">Reply</p>
      <textarea
        placeholder="Write your message"
        class="w-full h-[200px] bg-[#F2F3F6] px-4 py-2 rounded-md resize-none align-top text-sm"
      ></textarea>
    </div>

    <div class="flex flex-col sm:flex-row gap-2">
      <button
        @click="isReplyModalOpen = false"
        class="w-full px-4 py-4 bg-white border-2 border-black rounded text-base text-black font-medium"
      >
        Cancel
      </button>
      <button
        class="w-full px-4 py-4 bg-black text-white rounded text-base font-medium"
      >
        Send
      </button>
    </div>
  </div>
</div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'


const messages = [
  { name: 'Jon Doe', email: 'johndoe@example.com', phone: '+1 (416) 555-0199', message: 'I loved your berbere, can you please get me in a bigger size like in 245 kg...' },
  { name: 'Sara Smith', email: 'sara@example.com', phone: '+1 (416) 555-0198', message: 'Can you ship to Europe?' },
  { name: 'Ali Ahmed', email: 'ali@example.com', phone: '+1 (416) 555-0197', message: 'Bulk order request: 100 kg' },
 
]

const route = useRoute()
const message = ref(messages[parseInt(route.params.id as string)])

const isReplyModalOpen = ref(false)
const reply = ref('')

function openReplyModal() {
  isReplyModalOpen.value = true
}
</script>
