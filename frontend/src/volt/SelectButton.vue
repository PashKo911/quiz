<template>
	<SelectButton
		unstyled
		:pt="theme"
		:ptOptions="{
			mergeProps: ptViewMerge,
		}"
	>
		<template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
			<slot :name="slotName" v-bind="slotProps ?? {}" />
		</template>
	</SelectButton>
</template>

<script setup lang="ts">
import SelectButton, {
	type SelectButtonPassThroughOptions,
	type SelectButtonProps,
} from 'primevue/selectbutton'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ SelectButtonProps {}
defineProps<Props>()

const theme = ref<SelectButtonPassThroughOptions>({
	root: ` sm:grid sm:grid-cols-2 select-none rounded-md gap-3
        p-invalid:outline p-invalid:outline-offset-0 p-invalid:outline-red-400 `,
	pcToggleButton: {
		root: `flex w-full items-center justify-center overflow-hidden relative cursor-pointer select-none grow
            text-surface-500 dark:text-surface-400
            p-checked:text-surface-700 dark:p-checked:text-surface-0
            text-base font-medium
            focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-primary focus-visible:relative focus-visible:z-10
            disabled:cursor-default
            disabled:bg-surface-200 disabled:border-surface-200 disabled:text-surface-500
            disabled:dark:bg-surface-700 disabled:dark:border-surface-700 disabled:dark:text-surface-400
            p-invalid:border-red-400 dark:p-invalid:border-red-300
            transition-colors duration-200
            p-1 p-small:text-sm p-large:text-lg
        `,
		content: `relative flex-auto inline-flex items-center justify-center gap-2 py-1 px-3
            rounded-md transition-colors duration-200 
            border border-primary-200
			p-checked:bg-primary-100 p-checked:border-primary-600 shadow-2xs 
			p-checked:text-primary-800
			`,
		icon: ``,
		label: ``,
	},
})
</script>
