import questions from '@/questions.json'
import QuestionsService from '@/services/questionsService'

let quest = questions.reduce((obj, item) => {
	obj[item.id] = { id: item.id, recordURL: null, blob: null, uploaded: false }
	return obj
}, {})

export default {
	state: {
		questions: quest,
		successfullyCompleted: 0,
	},
	mutations: {
		setRecordForQuestion(state, data) {
			state.questions[data.id].recordURL = data.recordURL
			state.questions[data.id].blob = data.blob
		},
		setSuccessfulIndex(state, index) {
			state.successfullyCompleted = index
		},
	},
	actions: {
		async writeAudio(context, data) {
			context.commit('setRecordForQuestion', data)
			try {
				let res = await QuestionsService.uploadAudio({
					audio: data.blob,
					filename: `${context.getters.getSessionID}_${data.id}`,
					foldername: `${context.getters.getSessionID}`
				})
				context.commit('setRecordForQuestion', data)
				context.successfullyCompleted = data.index
			} catch (e) {
				// TODO Handle upload errors
				console.error(e)
			}
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
}
