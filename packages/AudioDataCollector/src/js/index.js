import Vue from 'vue'
import '@babel/polyfill'
import router from '@/js/router'
import store from '@/js/store/index'
import App from '@/components/App'
import AudioRecorder from 'audio-recorder-polyfill'

window.MediaRecorder = AudioRecorder

const app = new Vue({
	router,
	store,
	components: { App },
	render: h => h(App),
}).$mount('#app')
