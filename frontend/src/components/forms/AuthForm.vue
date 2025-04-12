<template>
	<Form
		v-slot="$form"
		ref="formRef"
		:resolver="resolver"
		@submit="onFormSubmit"
		:validateOnSubmit="true"
		:validateOnValueUpdate="false"
		class="p-50-20 gy-32-25 relative mx-auto flex w-full max-w-[43.75rem] flex-col rounded-3xl shadow-lg"
	>
		<h2 class="text-30-24 font-bold">{{ formTitle }}</h2>
		<div class="relative flex flex-col gap-1">
			<InputText name="username" placeholder="Username" fluid />
			<Message
				v-if="$form.username?.invalid"
				severity="error"
				size="small"
				variant="simple"
				class="absolute bottom-0 left-2 translate-y-full"
			>
				{{ $form.username?.error.message }}
			</Message>
			<Message
				v-if="serverErrorMessage"
				severity="error"
				size="small"
				variant="simple"
				class="absolute top-0 right-0 -translate-y-[calc(100%_+_.5rem)]"
			>
				{{ serverErrorMessage }}
			</Message>
		</div>
		<div class="card relative flex flex-col gap-1">
			<Password
				name="password"
				placeholder="Password"
				toggleMask
				fluid
				:feedback="false"
			/>
			<Message
				v-if="$form.password?.invalid"
				severity="error"
				size="small"
				variant="simple"
				class="absolute bottom-0 left-2 translate-y-[calc(100%_+_.0625rem)]"
			>
				{{ $form.password?.error.message }}
			</Message>
		</div>
		<div class="grid gap-2.5">
			<Button type="submit" :loading="isLoading" :label="formTitle" />
			<div>
				{{ subText }}
				<button
					type="button"
					@click="onChangeMode"
					class="hover:text-primary cursor-pointer underline duration-300"
				>
					{{ subButtonTitle }}
				</button>
			</div>
		</div>
	</Form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import * as yup from 'yup'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'
import InputText from '@/volt/InputText.vue'
import Password from '@/volt/Password.vue'
import { Form } from '@primevue/forms'
import Message from '@/volt/Message.vue'
import Button from '@/volt/Button.vue'

const authStore = useAuthStore()
const generalStore = useGeneralStore()

const { isLoading, hasError } = storeToRefs(generalStore)
const { signin, signup } = authStore

const serverErrorMessage = computed(() => {
	return hasError.value?.response?.data?.error?.[0]?.message
})

const isSignup = ref(true)

const onChangeMode = () => {
	isSignup.value = !isSignup.value
	formRef.value.reset()
}

const formTitle = computed(() => {
	return isSignup.value ? 'Sign Up' : 'Sign in'
})
const subButtonTitle = computed(() => {
	return isSignup.value ? 'Sign in' : 'Sign Up'
})

const subText = computed(() => {
	return isSignup.value
		? 'Already have an account?'
		: "Don't have an account yet?"
})

const schema = yup.object().shape({
	username: yup
		.string()
		.min(1, 'Min 3 characters')
		.max(20, 'Max 20 characters')
		.required('Required'),
	password: yup.string().trim().min(6, 'Min 6 characters').required('Required'),
})

const formRef = ref(null)

const resolver = ref(yupResolver(schema))

const onFormSubmit = async ({ valid, values }) => {
	if (valid) {
		if (isSignup.value) {
			await signup(values.username, values.password)
		} else {
			await signin(values.username, values.password)
		}
	}
}
</script>
