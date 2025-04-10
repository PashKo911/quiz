<template>
	<header class="fixed top-0 left-0 z-50 w-full bg-white">
		<div class="container flex items-center justify-end gap-8 py-2">
			<router-link
				v-if="isAdmin"
				:to="{ name: 'users' }"
				active-class="fill-primary"
			>
				<users-icon />
			</router-link>
			<button v-if="isAuthenticated" @click="logout" class="cursor-pointer">
				<logout-icon />
			</button>
		</div>
	</header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import UsersIcon from '@/components/icons/UsersIcon.vue'

const authStore = useAuthStore()

const { isAuthenticated, isAdmin } = storeToRefs(authStore)
const { logout } = authStore
</script>
