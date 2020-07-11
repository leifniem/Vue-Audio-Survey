import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Privacy from '@/components/Privacy'
import Question from '@/components/Question'
import Thanks from '@/components/Thanks'
import Metadata from '@/components/Metadata'
import FourOhFour from '@/components/404'

Vue.use(VueRouter)

export default new VueRouter({
	props: true,
	routes: [
		{ path: '/', component: Home },
		{ path: '/privacy', component: Privacy },
		{ path: '/metadata', component: Metadata },
		{ path: '/question/:index', component: Question, props: true },
		{ path: '/thanks', component: Thanks },
		{ path: '/404', component: FourOhFour },
		{
			path: '*',
			redirect: '/404',
		},
	]
})
