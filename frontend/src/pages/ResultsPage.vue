<template>
	<main-layout>
		<div
			class="p-50-20 gy-32-25 relative mx-auto flex w-full max-w-[43.75rem] flex-col rounded-3xl shadow-lg"
		>
			<h2 class="text-30-24 text-center font-bold">
				"Great Job! Your Test is Completed"
			</h2>
			<ul class="grid gap-3">
				<li
					v-for="a in quizResult?.answers"
					:key="a.id"
					class="flex items-center justify-between gap-4 rounded-md border bg-green-100 px-2 py-1.5 transition-colors duration-300"
					:class="{ 'bg-red-100': !a.isCorrect }"
				>
					<span>
						{{ a.question?.text }}
					</span>
					<span>{{ a.isCorrect ? '✅' : '❌' }}</span>
				</li>
			</ul>
			<Button
				label="Try Again"
				@click="onReset"
				size="large"
				class="mx-auto w-max min-w-[12.5rem]"
			/>
		</div>
	</main-layout>
</template>

<script setup>
import { useQuizAttemptStore } from '@/stores/quizAttempt'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import MainLayout from '@/components/layouts/MainLayout.vue'
import Button from '@/volt/Button.vue'

const quizAttemptStore = useQuizAttemptStore()

const { getQuizResult } = quizAttemptStore
const { quizResult } = storeToRefs(quizAttemptStore)
const route = useRoute()
const router = useRouter()

const onReset = () => {
	router.push({ name: 'questions' })
}

onMounted(async () => {
	await getQuizResult(route.params.id)
})
</script>
