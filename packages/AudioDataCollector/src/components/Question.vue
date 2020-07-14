<template>
	<div :class="'question question-' + index">
		<h3>
			This is Question {{ parseInt(index) + 1 }} of {{ questions.length }}
		</h3>
		<div class="task">
			<p>
				{{ this.questions[index].text }}
			</p>
			<Recorder
				:index="index"
				:id="id"
				ref="audiorecorder"
				@urlChanged="setRecordUrl"
			/>
		</div>
		<router-link :to="nextPage" tabindex="-1">
			<button tabindex="0" :disabled="blockProceed">
				{{ buttonText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import questions from '@/questions.json'
import Recorder from '@/components/Recorder'
import { nextPageText, finishText } from '@/config.js'

export default {
	name: 'Question',
	props: ['index'],
	components: { Recorder },
	data() {
		return {
			questions,
		}
	},
	methods: {
		setRecordUrl(e) {
			console.log("Question: ", this.id, e)
			this.$store.commit('setRecordForQuestion', {
				id: this.id,
				url: e
			})
		},
	},
	computed: {
		nextPage() {
			return this.index < questions.length - 1
				? '/question/' + (this.index + 1).toString()
				: '/thanks'
		},
		buttonText() {
			return this.index < questions.length - 1 ? nextPageText : finishText
		},
		blockProceed() {
			if (questions[this.index].required) {
				return this.$refs.audiorecorder.currentURL == null
			}
			return false
		},
		id() {
			return questions[this.index].id
		},
	},
}
</script>

<style lang="scss">
@import '@/scss/variables';

.task {
	background: $light-background;
	padding: 1rem 2rem 2rem;
	margin-bottom: 2rem;
	border-radius: 5px;
}
</style>
