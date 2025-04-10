import { defineStore } from 'pinia'
import { useGeneralStore } from './general'
import { ref } from 'vue'
import apiClient from '@/api/axiosConfig'
import apiEndpoints from '@/api/apiEndpoints'

export const useUsersStore = defineStore('users', () => {
	const generalStore = useGeneralStore()
	const { generalApiOperation } = generalStore

	const usersWithAttempts = ref(null)

	const getUsersWithAttempts = async () => {
		usersWithAttempts.value = await generalApiOperation({
			operation: async () => {
				const response = await apiClient.get(
					apiEndpoints.users.getUsersWithAttempts(),
				)
				return response.data.usersList
			},
		})
	}

	const deleteUser = async (id) => {
		await generalApiOperation({
			operation: async () => {
				const response = await apiClient.delete(
					apiEndpoints.users.deleteUser(id),
				)
				usersWithAttempts.value = usersWithAttempts.value.filter(
					(u) => u._id !== id,
				)
				return response.data
			},
		})
	}

	return {
		getUsersWithAttempts,
		usersWithAttempts,
		deleteUser,
	}
})
