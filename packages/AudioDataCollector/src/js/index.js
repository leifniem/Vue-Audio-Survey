import Vue from 'vue'
import '@babel/polyfill'
import router from '@/router'
import App from '@/components/App'
// import AudioRecorder from 'vue-audio-recorder'

// Vue.use(AudioRecorder)

const app = new Vue({
	router,
	components: { App },
	render: h => h(App),
}).$mount('#app')
