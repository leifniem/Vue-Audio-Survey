import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import QuestionsModule from './questionsModule'
import MetaDataModule from './metaDataModule'
import Router from '@/js/router'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		QuestionsModule,
		MetaDataModule,
	},
	plugins: [
		createPersistedState({
			rehydrated(store) {
				// Reset Blobs and URls set before if session has to be restored
				// because the blobs are not valid after page reloads
				for (let question in store.state.questions) {
					store.commit('setRecordForQuestion', {
						id: question,
						recordURL: null,
						blob: null,
					})
				}
				// if user was already assigned a sessionID restore
				// them to the page of the last successful question index
				if (store.getters.sessionID) {
					Router.push('/question/' + store.getCompletedQuestions + 1)
				}
			},
		}),
	],
	state: {
		privacyPolicyAccepted: false,
	},
	mutations: {
		setPrivacyAcknowledgement(state, accepted) {
			state.privacyPolicyAccepted = accepted
		},
	},
	getters: {
		getPrivacyAcknowledgement(state) {
			return state.privacyPolicyAccepted
		},
	},
})

export default store
