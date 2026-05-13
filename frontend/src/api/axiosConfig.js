import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useServerWakeState } from '@/composables/useServerWakeState'

const API_VERSION = import.meta.env.VITE_APP_API_VERSION

const API_BASE = import.meta.env.VITE_APP_API_BASE || 'http://localhost:3000'

const API_URL = `${API_BASE}/api/${API_VERSION}`

const apiClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

const { beginBackendWakeCheck, markBackendAwake } = useServerWakeState()

apiClient.interceptors.request.use(
	(config) => {
		beginBackendWakeCheck()

		const authStore = useAuthStore()
		const token = authStore.token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
	(response) => {
		markBackendAwake()
		return response
	},
	(error) => {
		markBackendAwake()

		if (error.response?.status === 401) {
			const authStore = useAuthStore()
			authStore.logout()
		}
		if (error.response?.status === 403) {
			router.push({ name: 'page-not-found' })
		}
		return Promise.reject(error)
	},
)

export default apiClient
