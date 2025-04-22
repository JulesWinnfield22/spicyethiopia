
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-64 bg-black text-white font-sans flex flex-col justify-between">
      <!-- Top Logo -->
      <div>
        <div class="py-4 px-6">
          <a href="/">
            <img :src="logo" alt="Logo" style="height: 40px;" />
          </a>
        </div>

        <!-- Home -->
        <div class="mb-2 flex items-center px-6 py-2.5 text-gray-200 hover:text-white">
          <i class="fa-solid fa-house-user"></i>
          <span class="mx-2 text-sm">Home</span>
        </div>

        <!-- Orders Section -->
        <div class="mb-4 px-6">
          <h3 class="mb-2 text-xs text-gray-400 uppercase tracking-widest">Orders</h3>
          <router-link to="/admin/orders" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-bell mr-2"></i>
            Orders
            <span class="ml-auto bg-white text-black text-xs font-bold rounded-full px-2">{{ totalOrdersCount }}</span>
          </router-link>
          <router-link to="/admin/products" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-list mr-2"></i>
            Products
          </router-link>
          <router-link to="/admin/commercial" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-bullhorn mr-2"></i>
            Commercial
          </router-link>
          <router-link to="/admin/messages" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-comment mr-2"></i>
            Messages
            <span class="ml-auto bg-white text-black text-xs font-bold rounded-full px-2">1</span>
          </router-link>
        </div>

        <!-- CMS Section -->
        <div class="mb-4 px-6">
          <h3 class="mb-2 text-xs text-gray-400 uppercase tracking-widest">CMS</h3>
          <router-link to="/admin/about" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-book mr-2"></i>
            About
          </router-link>
          <router-link to="/admin/contact-info" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-address-book mr-2"></i>
            Contact Information
          </router-link>
          <router-link to="/admin/recipes" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-utensils mr-2"></i>
            Recipes
          </router-link>
        </div>

        <!-- Settings Section -->
        <div class="mb-4 px-6">
          <h3 class="mb-2 text-xs text-gray-400 uppercase tracking-widest">Settings</h3>
          <router-link to="/admin/users" class="flex items-center px-3 py-2 text-sm hover:bg-gray-800 rounded">
            <i class="fa-solid fa-users-gear mr-2"></i>
            Users
          </router-link>
        </div>
      </div>

      <!-- User Footer -->
      <div class="px-6 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-white rounded-full mr-2"></div>
          <span class="text-sm">Birhane Araya</span>
        </div>
        <i class="fa-solid fa-chevron-right text-sm"></i>
      </div>
    </div>

    <!-- Right Main Content -->
    <div class="flex-1 bg-gray-50 p-6">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/img/spicylogo.png";
import { useDashboardCounts } from '../composables/useDashboardCounts'

const { totalOrdersCount } = useDashboardCounts()


</script>
