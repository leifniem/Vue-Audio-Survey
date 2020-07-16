import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import QuestionsModule from './questionsModule'
import MetaDataModule from './metaDataModule'
import SessionModule from './sessionModule'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		QuestionsModule,
		MetaDataModule,
		SessionModule,
	},
	plugins: [createPersistedState()],
})
