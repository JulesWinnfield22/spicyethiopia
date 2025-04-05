<script setup lang="ts">
import logo from '@/assets/img/spicylogo.png';

import { RouterLink, useRoute } from 'vue-router';
import { fas } from '@fortawesome/free-solid-svg-icons';


const route = useRoute(); // Get the current route

// Define styles for active and default links
const activeStyle = "font-weight: bold; text-decoration: underline; color: white;";
const defaultStyle = "text-decoration: none; color: white;";
</script>

<template>
  <div>
    <nav
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #111;
        padding: 10px 20px;
        padding-right: 60px;
        padding-left: 60px;
      "
    >
     
      <div>
        <img :src="logo" alt="Logo" style="height: 40px;" />
      </div>

      
      <div style="display: flex; gap: 60px; font-family: sans-serif;">
        <RouterLink to="/" :style="route.path === '/' ? activeStyle : defaultStyle">
          Home
        </RouterLink>
        <RouterLink to="/shop" :style="route.path === '/shop' ? activeStyle : defaultStyle">
          Shop
        </RouterLink>
        <RouterLink to="/contact" :style="route.path === '/contact' ? activeStyle : defaultStyle">
          Contact
        </RouterLink>
        <RouterLink to="/about" :style="route.path === '/about' ? activeStyle : defaultStyle">
          About
        </RouterLink>
        <RouterLink to="/recipes" :style="route.path === '/recipes' ? activeStyle : defaultStyle">
          Recipes
        </RouterLink>
        
      </div>

      
      <div>
        <button
          style="
            background: white;
            color: #333;
            border: none;
            padding: 8px 32px;
            cursor: pointer;
            border-radius: 25px;
          "
        >
        <i class="fas fa-shopping-cart"></i>
          Cart

        </button>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
