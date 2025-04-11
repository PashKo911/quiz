import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/api/axiosConfig'
import apiEndpoints from '@/api/apiEndpoints'

import { useGeneralStore } from './general'

export const useQuizAttemptStore = defineStore('quizAttempt', () => {
	const generalStore = useGeneralStore()

	const currentQuizAttempt = ref(null)
	const userAnswers = ref([])
	const quizResult = ref(null)

	const hasNextQuestion = computed(() => {
		return (
			currentQuizAttempt.value?.questions.length > userAnswers.value?.length
		)
	})

	const { generalApiOperation } = generalStore

	function addAnswer(questionId, answerId) {
		userAnswers.value.push({ questionId, answerId })
	}

	const startOrResumeQuiz = async () => {
		currentQuizAttempt.value = await generalApiOperation({
			operation: async () => {
				const response = await apiClient.post(
					apiEndpoints.quizAttempts.startOrResumeQuiz(),
				)
				return response.data
			},
		})
	}

	const submitQuizAnswers = async () => {
		await generalApiOperation({
			operation: async () => {
				const response = await apiClient.post(
					apiEndpoints.quizAttempts.submitQuizAnswers(),
					{
						attemptId: currentQuizAttempt.value.attemptId,
						answers: userAnswers.value,
					},
				)
				return response.data
			},
		})
	}
	const getQuizResult = async (id) => {
		quizResult.value = await generalApiOperation({
			operation: async () => {
				const response = await apiClient.get(
					apiEndpoints.quizAttempts.getQuizResult(id),
				)
				return response.data
			},
		})
	}

	const resetQuizAttempt = () => {
		currentQuizAttempt.value = null
		userAnswers.value = []
	}

	return {
		startOrResumeQuiz,
		currentQuizAttempt,
		userAnswers,
		hasNextQuestion,
		addAnswer,
		submitQuizAnswers,
		quizResult,
		getQuizResult,
		resetQuizAttempt,
	}
})
