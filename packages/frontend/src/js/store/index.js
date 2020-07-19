import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import QuestionsModule from './questionsModule'
import MetaDataModule from './metaDataModule'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		QuestionsModule,
		MetaDataModule,
	},
	plugins: [createPersistedState()],
	state: {
		privacyPolicyAccepted: false
	},
	mutations: {
		setPrivacyAcknowledgement (state, accepted) {
			state.privacyPolicyAccepted = accepted
		}
	},
	getters: {
		getPrivacyAcknowledgement (state) {
			return state.privacyPolicyAccepted
		}
	}
})

export default store