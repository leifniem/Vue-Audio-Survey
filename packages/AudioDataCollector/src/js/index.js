import Vue from 'vue'
import '@babel/polyfill'
import router from '@/js/router'
import store from '@/js/store'
import App from '@/components/App'

const app = new Vue({
	router,
	store,
	components: { App },
	render: h => h(App),
}).$mount('#app')
