<template>
	<div :class="'question question-' + index">
		<h3>
			This is Question {{ index }} of {{ questions.length }}
		</h3>
		<div class="task">
			<p>
				{{ this.questions[index-1].text }}
			</p>
			<Recorder :id="id" :index="index - 1" ref="audiorecorder" />
		</div>
		<!--
			Router link removed from tabindex because button triggers it and is
			visible
		-->
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
	// index is starts at 1 as it is the visual indicator,
	// please pay attention
	props: ['index'],
	components: { Recorder },
	data() {
		return {
			questions,
		}
	},
	computed: {
		nextPage() {
			return this.index < questions.length
				? '/question/' + (parseInt(this.index) + 1)
				: '/thanks'
		},
		buttonText() {
			return this.index < questions.length ? nextPageText : finishText
		},
		// disable navigation to next page if there is no audio recording
		blockProceed() {
			if (questions[this.index - 1].required) {
				return (
					this.$store.getters.getQuestionById(this.id).recordURL ==
					null
				)
			}
			return false
		},
		// id of the current question
		id() {
			return questions[this.index - 1].id
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
