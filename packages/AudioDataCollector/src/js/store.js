import Vue from 'vue'
import Vuex from 'vuex'
import questions from '@/questions.json'

Vue.use(Vuex)

let quest = questions.reduce((obj, item) => {
	obj[item.id] = { id: item.id, recordUrl: null }
	return obj
}, {})

export default new Vuex.Store({
	strict: true,
	state: {
		questions: quest,
	},
	mutations: {
		setRecordForQuestion(state, data) {
			state.questions[data.id].recordUrl = data.url
		},
	},
	getters: {
		getNumQuestions(state) {
			return Object.keys(state.questions).length
		},
		getCompletedQuestions(state) {
			return Object.keys(state.questions).filter(
				(q) => state.questions[q].recordUrl != null
			).length
		},
		getPercentComplete(state, getters) {
			return (
				(getters.getCompletedQuestions / getters.getNumQuestions) * 100
			)
		},
	},
})
