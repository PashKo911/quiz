<template>
	<main-layout>
		<div class="relative rounded-2xl bg-white p-3 shadow-lg">
			<DataTable
				v-model:expandedRows="expandedRows"
				:value="usersWithAttempts"
				dataKey="_id"
				size="small"
				:loading="isLoading"
				tableStyle="min-width: 320px"
			>
				<Column expander style="width: 10px" />
				<Column field="username" header="Username"></Column>
				<Column field="role.name" header="Role"></Column>
				<Column header="Actions">
					<template #body="{ data }">
						<Button
							severity="danger"
							variant="text"
							raised
							rounded
							aria-label="delete"
							@click="onDelete(data._id)"
						>
							<template #icon>
								<DeleteIcon class="fill-red-500" />
							</template>
						</Button>
					</template>
				</Column>
				<template #expansion="slotProps">
					<div
						v-if="!slotProps.data.attempts.length"
						class="p-3 text-sm text-gray-600"
					>
						No completed quizzes for this user...
					</div>

					<div
						v-else
						v-for="attempt in slotProps.data.attempts"
						:key="attempt._id"
						class="mb-4 rounded-lg border border-gray-300 bg-white p-3 first:mt-4"
					>
						<p class="text-sm font-medium text-gray-600">
							<span class="font-bold">Date:</span>
							<span class="text-gray-900">
								{{ new Date(attempt.startedAt).toLocaleDateString() }}
							</span>
						</p>

						<ul class="mt-2 space-y-2">
							<li
								v-for="(a, index) in attempt.answers"
								:key="index"
								class="flex items-center justify-between gap-4 border-b pb-1"
							>
								<span>
									{{ a.question }}
								</span>
								<span>{{ a.isCorrect ? '✅' : '❌' }}</span>
							</li>
						</ul>
					</div>
				</template>
			</DataTable>
		</div>
	</main-layout>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useGeneralStore } from '@/stores/general'
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

import MainLayout from '@/components/layouts/MainLayout.vue'
import Button from '@/volt/Button.vue'
import DataTable from '@/volt/DataTable.vue'
import Column from 'primevue/column'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const expandedRows = ref({})
const toast = useToast()

const usersStore = useUsersStore()
const generalStore = useGeneralStore()

const { getUsersWithAttempts, deleteUser } = usersStore
const { usersWithAttempts } = storeToRefs(usersStore)
const { isLoading } = storeToRefs(generalStore)

const onDelete = async (id) => {
	try {
		await deleteUser(id)
		toast.add({
			severity: 'success',
			summary: 'Success',
			detail: 'User deleted successfully',
			life: 3000,
		})
	} catch (error) {
		console.error(error)
		toast.add({
			severity: 'error',
			summary: 'Rejected',
			detail: 'Something went wrong',
			life: 3000,
		})
	}
}

onMounted(async () => {
	await getUsersWithAttempts()
})
</script>
