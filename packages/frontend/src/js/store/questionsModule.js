import questions from '@/questions.json'
import QuestionsService from '@/services/questionsService'

let quest = questions.reduce((obj, item) => {
	obj[item.id] = { id: item.id, recordURL: null, blob: null, uploaded: false }
	return obj
}, {})

export default {
	state: {
		questions: quest,
		successfullyCompletedQuestionIndex: 0,
	},
	mutations: {
		setRecordForQuestion(state, data) {
			state.questions[data.id].recordURL = data.recordURL
			state.questions[data.id].blob = data.blob
		},
		setSuccessfulIndex(state, index) {
			state.successfullyCompletedQuestionIndex = index
		},
	},
	actions: {
		async writeAudio(context, data) {
			context.commit('setRecordForQuestion', data)
			try {
				// upload given recording to server
				let res = await QuestionsService.uploadAudio({
					filename: `${context.getters.getSessionID}_${data.id}`,
					foldername: `${context.getters.getSessionID}`,
					audio: data.blob,
				})
				if (res.status === 200) {
					context.commit('setRecordForQuestion', data)
					context.commit('setSuccessfulIndex', parseInt(data.index) + 1)
				} else {
					throw new Error('File upload unsuccessful')
				}
			} catch (e) {
				alert(e.msg)
			}
		},
	},
	getters: {
		getQuestionById: (state) => (id) => state.questions[id],
		getNumQuestions(state) {
			return Object.keys(state.questions).length
		},
		getCompletedQuestions(state) {
			return state.successfullyCompletedQuestionIndex
		},
		getPercentComplete(state, getters) {
			return (
				(getters.getCompletedQuestions / getters.getNumQuestions) * 100
			)
		},
	},
}
