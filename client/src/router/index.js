import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomePage from '@/pages/HomePage.vue'
import QuestionsPage from '@/pages/QuestionsPage.vue'
import ResultsPage from '@/pages/ResultsPage.vue'
import UsersPage from '@/pages/UsersPage.vue'
import { storeToRefs } from 'pinia'

export const routes = [
	{
		path: '/',
		name: 'home',
		meta: { requireAuth: false },
		component: HomePage,
	},
	{
		path: '/questions',
		name: 'questions',
		meta: { requireAuth: true },
		component: QuestionsPage,
	},
	{
		path: '/results/:id',
		name: 'results',
		meta: { requireAuth: false },
		component: ResultsPage,
	},
	{
		path: '/users',
		name: 'users',
		meta: {
			requireAuth: true,
			hasAccess: (role) => role === 'admin',
		},
		component: UsersPage,
	},
	{
		path: '/:path(.*)*',
		name: 'page-not-found',
		meta: { requireAuth: false },
		component: () => import('../pages/PageNotFound.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach(async (to) => {
	const authStore = useAuthStore()
	const { isAuthenticated, userRole } = storeToRefs(authStore)

	if (!isAuthenticated.value) {
		await authStore.getUserProfileByToken()
		console.log('auth')
	}
	if (to.meta?.requireAuth && !isAuthenticated.value) {
		return { name: 'home' }
	}

	if (to.meta?.hasAccess && !to.meta.hasAccess(userRole.value)) {
		return { name: 'page-not-found' }
	}
})

export default router
