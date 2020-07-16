import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Privacy from '@/components/Privacy'
import Question from '@/components/Question'
import Thanks from '@/components/Thanks'
import Hint from '@/components/MicrophoneHint'
import Metadata from '@/components/Metadata'
import FourOhFour from '@/components/404'
import {getToken} from '@/js/tokenHandler'

Vue.use(VueRouter)

export default new VueRouter({
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
	// TODO catch GDPR consent, token, last uploaded question
	beforeEach (to, from, next) {
		const publicRoutes = [
			'/',
			'/404',
			'/privacy',
			'/metadata',
		]
		const authRequired = !publicRoutes.includes(to.path)

		authRequired && getToken() != null
		? next()
		: next('/')
	}
})
