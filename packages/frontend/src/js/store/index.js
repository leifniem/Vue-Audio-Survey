import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import QuestionsModule from './questionsModule'
import MetaDataModule from './metaDataModule'
import SessionModule from './sessionModule'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		QuestionsModule,
		MetaDataModule,
		SessionModule,
	},
	plugins: [createPersistedState()],
})

export default store