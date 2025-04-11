<template>
	<header-menu />
	<main class="grow">
		<Toast />
		<div class="container pt-[7.5rem] pb-8">
			<slot />
		</div>
	</main>
</template>

<script setup>
import HeaderMenu from '@/components/partials/header/HeaderMenu.vue'
import Toast from '@/volt/Toast.vue'
</script>
