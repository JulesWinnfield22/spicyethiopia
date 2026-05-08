<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <h1 class="error-code">{{ error?.statusCode || 500 }}</h1>

      <p class="error-message">
        {{ error?.statusCode === 404
          ? "We couldn't find the page you're looking for."
          : "Something went wrong. We're working on it."
        }}
      </p>

      <div class="error-actions">
        <button class="btn-home" @click="handleError">
          ← Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useHead({
  title: props.error?.statusCode === 404
    ? 'Page Not Found | Spicy Ethiopian'
    : 'Spicy Ethiopian',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Authentic Ethiopian Spices Delivered to Your Door' }
  ]
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  color: #fafafa;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 2rem;
}

.error-container {
  text-align: center;
  max-width: 480px;
}

.error-icon {
  color: #d97706;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.error-code {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-message {
  font-size: 1.125rem;
  color: #a1a1aa;
  margin: 0 0 2.5rem;
  line-height: 1.6;
}

.btn-home {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  color: #0a0a0a;
  border: none;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(217, 119, 6, 0.3);
}
</style>
