const apiEndpoints = {
	auth: {
		signin: () => '/auth/signin',
		signup: () => '/auth/signup',
		profileByToken: () => '/auth/profile',
	},
	users: {
		getUsersWithAttempts: () => '/users/users-with-attempts',
		deleteUser: (id) => `/users/${id}`,
	},
	quizAttempts: {
		startOrResumeQuiz: () => '/quiz/attempt',
		submitQuizAnswers: () => '/quiz/submit',
		getQuizResult: (id) => `/quiz/result/${id}`,
	},
}

export default apiEndpoints
