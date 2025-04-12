<template>
	<main-layout>
		<div
			class="p-50-20 gy-32-25 relative mx-auto flex w-full max-w-[43.75rem] flex-col rounded-3xl shadow-lg"
			v-if="currentQuestion"
		>
			<h2 class="text-24-18 relative text-center font-bold">
				{{ currentQuestion.text }}
			</h2>

			<SelectButton
				v-model="selectedAnswer"
				:options="currentQuestion.options"
				optionLabel="text"
				size="large"
				optionValue="_id"
			/>

			<Message
				v-if="errorMessage"
				severity="error"
				size="small"
				variant="simple"
				class="absolute top-1.5 left-1/2 w-max -translate-x-1/2"
			>
				{{ errorMessage }}
			</Message>

			<Button
				@click="nextQuestion"
				class="mx-auto w-max min-w-40"
				label="Next"
				size="large"
			/>
		</div>
	</main-layout>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useQuizAttemptStore } from '@/stores/quizAttempt'
import { storeToRefs } from 'pinia'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import MainLayout from '@/components/layouts/MainLayout.vue'
import Button from '@/volt/Button.vue'
import SelectButton from '@/volt/SelectButton.vue'
import Message from '@/volt/Message.vue'

const quizAttemptStore = useQuizAttemptStore()
const { currentQuizAttempt, hasNextQuestion } = storeToRefs(quizAttemptStore)
const { startOrResumeQuiz, addAnswer, submitQuizAnswers, resetQuizAttempt } =
	quizAttemptStore

const router = useRouter()
const currentQuestionIndex = ref(0)
const errorMessage = ref(null)
const selectedAnswer = ref(null)

const currentQuestion = computed(() => {
	return (
		currentQuizAttempt.value?.questions?.[currentQuestionIndex.value] || null
	)
})

async function nextQuestion() {
	if (!selectedAnswer.value) {
		errorMessage.value = 'Please select the answer'
		return
	}

	errorMessage.value = null

	addAnswer(currentQuestion.value._id, selectedAnswer.value)

	selectedAnswer.value = null

	if (hasNextQuestion.value) {
		currentQuestionIndex.value++
	} else {
		await submitQuizAnswers()
		router.push({
			name: 'results',
			params: { id: currentQuizAttempt.value.attemptId },
		})
	}
}

onBeforeRouteLeave(() => {
	resetQuizAttempt()
})

onMounted(async () => {
	await startOrResumeQuiz()
})
</script>
