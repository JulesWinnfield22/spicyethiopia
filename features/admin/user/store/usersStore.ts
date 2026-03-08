import type { User } from '~/interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('userstore', () => {
	const users = ref<User[]>([])

	function getAll() {
		return users.value
	}

	function set(data: User[]) {
		users.value = data
	}

	function add(data: User) {
		users.value.unshift(data)
	}

	return {
		users,
		getAll,
		set,
		add
	}
})