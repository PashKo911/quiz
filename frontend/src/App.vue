<template>
	<router-view />
	<Loader :loading="isServerWakeVisible" />
</template>

<script setup>
import Loader from './components/partials/loader/Loader.vue'
import { useServerWakeState } from '@/composables/useServerWakeState'

const { isServerWakeVisible } = useServerWakeState()
</script>
