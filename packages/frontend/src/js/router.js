import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Privacy from '@/components/Privacy'
import Question from '@/components/Question'
import Thanks from '@/components/Thanks'
import Hint from '@/components/MicrophoneHint'
import Metadata from '@/components/Metadata'
import FourOhFour from '@/components/404'
import Store from '@/js/store/index'
import { getToken } from '@/js/tokenHandler'

Vue.use(VueRouter)
const router = new VueRouter({
	props: true,
	routes: [
		{ path: '/', component: Home },
		{ path: '/privacy', component: Privacy },
		{ path: '/metadata', component: Metadata },
		{ path: '/microphone', component: Hint },
		{ path: '/question/:index', component: Question, props: true },
		{ path: '/thanks', component: Thanks },
		{ path: '/404', component: FourOhFour },
		{
			path: '*',
			redirect: '/404',
		},
	],
})

// Add navigation guards to protect routes that should only be accessible with
// a token and / or accepted privacy policy
router.beforeEach((to, from, next) => {
	const publicRoutes = ['/', '/404', '/privacy', '/metadata']
	const privacyRoutes = ['/', '/404', '/privacy']
	const acknowledgementRequired = !privacyRoutes.includes(to.path)
	const authRequired = !publicRoutes.includes(to.path)
	if (
		authRequired &&
		getToken() != null &&
		acknowledgementRequired &&
		Store.getters.getPrivacyAcknowledgement
	) {
		return next()
	} else if (
		(authRequired && getToken() === null) ||
		(acknowledgementRequired && !Store.getters.getPrivacyAcknowledgement)
	) {
		return next('/')
	} else {
		next()
	}
})

export default router
