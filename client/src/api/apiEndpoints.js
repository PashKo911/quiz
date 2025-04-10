const API_VERSION = import.meta.env.VITE_APP_API_VERSION

const API_BASE = import.meta.env.VITE_APP_API_BASE || 'http://localhost:3000'

const API_URL = `${API_BASE}/api/${API_VERSION}`

const apiEndpoints = {
	auth: {
		signin: () => `${API_URL}/auth/signin`,
		signup: () => `${API_URL}/auth/signup`,
		profileByToken: () => `${API_URL}/auth/profile`,
	},
	users: {
		getUsersWithAttempts: () => `${API_URL}/users/users-with-attempts`,
		deleteUser: (id) => `${API_URL}/users/${id}`,
	},
	quizAttempts: {
		startOrResumeQuiz: () => `${API_URL}/quiz/attempt`,
		submitQuizAnswers: () => `${API_URL}/quiz/submit`,
		getQuizResult: (id) => `${API_URL}/quiz/result/${id}`,
	},
}

export default apiEndpoints
