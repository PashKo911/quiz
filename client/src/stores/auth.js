import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/axiosConfig'
import apiEndpoints from '@/api/apiEndpoints'
import router from '@/router'
import { useGeneralStore } from './general'

export const useAuthStore = defineStore('auth', () => {
	const generalStore = useGeneralStore()
	const { generalApiOperation } = generalStore

	const user = ref(null)
	const token = ref(localStorage.getItem('token') || null)

	const isAuthenticated = computed(() => user.value)
	const isAdmin = computed(() => user.value?.role.name === 'admin')
	const userRole = computed(() => user.value?.role.name)

	const setToken = (newToken) => {
		token.value = newToken
		if (newToken) {
			localStorage.setItem('token', newToken)
		} else {
			localStorage.removeItem('token')
		}
	}

	const signin = async (username, password) => {
		return generalApiOperation({
			operation: async () => {
				const response = await apiClient.post(apiEndpoints.auth.signin(), {
					username,
					password,
				})

				setToken(response.data.token)
				user.value = response.data.user

				if (isAdmin.value) {
					console.log(isAdmin.value, 'isAdmin')
					router.push({ name: 'users' })
				} else {
					router.push({ name: 'questions' })
				}
				return response.data.user
			},
		})
	}

	const getUserProfileByToken = async () => {
		const currentToken = localStorage.getItem('token')

		if (!currentToken) return null
		return generalApiOperation({
			operation: async () => {
				const response = await apiClient.get(apiEndpoints.auth.profileByToken())
				setToken(response.data.token)
				user.value = response.data.user
				return response.data.user
			},
		})
	}

	const signup = async (username, password) => {
		return generalApiOperation({
			operation: async () => {
				const response = await apiClient.post(apiEndpoints.auth.signup(), {
					username,
					password,
				})

				setToken(response.data.token)
				user.value = response.data.user

				router.push({ name: 'questions' })

				return response.data
			},
		})
	}

	const logout = () => {
		setToken(null)
		user.value = null
		router.push({ name: 'home' })
	}

	return {
		user,
		token,
		getUserProfileByToken,
		signin,
		signup,
		logout,
		isAuthenticated,
		isAdmin,
		userRole,
	}
})
