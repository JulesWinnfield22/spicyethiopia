import { ref } from 'vue'
import { defineStore } from 'pinia'

function* getId() {
  let id = 0;
  while (true) { 
    yield `${++id}`
  }
}

const id = getId()

export const useToast = defineStore('toast', () => {

  const toasts = ref([])

  function addToast(toast) {
    // If toast is a string, wrap it in an object
    const toastData = typeof toast === 'string' ? { message: toast, type: 'info' } : toast;
    toasts.value.unshift({ id: id.next().value, toast: toastData })
  }

  function removeToast(id) {
    const index = toasts.value.findIndex(el => el.id == id);
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return { toasts, addToast, removeToast }
})
