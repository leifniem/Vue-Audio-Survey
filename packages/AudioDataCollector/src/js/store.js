import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import questions from '@/questions.json'

Vue.use(Vuex)

let quest = questions.reduce((obj, item) => {
	obj[item.id] = { id: item.id, recordURL: null }
	return obj
}, {})

export default new Vuex.Store({
	// strict: process.env.NODE_ENV !== 'production',
	state: {
		questions: quest,
	},
	mutations: {
		setRecordForQuestion(state, data) {
			state.questions[data.id].recordURL = data.recordURL
		},
	},
	getters: {
		getQuestionById: (state) => (id) => state.questions[id],
		getNumQuestions(state) {
			return Object.keys(state.questions).length
		},
		getCompletedQuestions(state) {
			return Object.keys(state.questions).filter(
				(q) => state.questions[q].recordURL != null
				).length
		},
		getPercentComplete(state, getters) {
			return (
				(getters.getCompletedQuestions / getters.getNumQuestions) * 100
			)
		},
	},
	plugins: [createPersistedState()],
})
