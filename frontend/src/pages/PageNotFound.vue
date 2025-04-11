<template>
	<div class="flex h-svh flex-col items-center justify-center gap-8">
		<h1 class="text-30-24 font-bold">Page Not Found</h1>
		<router-link :to="{ name: 'home' }">
			<Button label="Go Back" />
		</router-link>
	</div>
</template>

<script setup>
import Button from '@/volt/Button.vue'
</script>
