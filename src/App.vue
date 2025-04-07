<script setup lang="ts">
import logo from '@/assets/img/spicylogo.png';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const route = useRoute();
const router = useRouter();

const activeStyle = "font-weight: bold; text-decoration: underline; color: white;";
const defaultStyle = "text-decoration: none; color: white;";


const cartCount = ref(0);

const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartCount.value = cart.reduce((total: number, item: any) => total + item.quantity, 0); // ← this is key
};


onMounted(() => {
  updateCartCount();
  window.addEventListener('storage', updateCartCount);
  window.addEventListener('cart-updated', updateCartCount); // Custom event
});

onBeforeUnmount(() => {
  window.removeEventListener('storage', updateCartCount);
  window.removeEventListener('cart-updated', updateCartCount);
});
</script>

<template>
  <div>
    <nav
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #111;
        padding: 10px 60px;
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
        <RouterLink
          to="/cart"
          style="
            background: white;
            color: #333;
            border: none;
            padding: 8px 32px;
            cursor: pointer;
            border-radius: 25px;
            text-decoration: none;
          "
        >
          <i class="fas fa-shopping-cart"></i>
          Cart ({{ cartCount }})
        </RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
