<template>
	<div :class="'question question-' + index">
		<h3>
			This is Question {{ parseInt(index) + 1 }} of {{ questions.length }}
		</h3>
		<div class="task">
			<p>
				{{ this.questions[index].text }}
			</p>
			<Recorder :id="index" />
		</div>
		<router-link :to="nextPage" tabindex="-1">
			<button tabindex="0">
				{{ buttonText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import questions from '@/questions.json'
import Recorder from '@/components/Recorder'
import { nextPageText } from '@/config.js'

export default {
	name: 'Question',
	props: ['index'],
	components: { Recorder },
	data() {
		return {
			questions,
		}
	},
	computed: {
		nextPage() {
			return this.index < questions.length - 1
				? '/question/' + (parseInt(this.index) + 1).toString()
				: '/thanks'
		},
		buttonText() {
			return this.index < questions.length - 1
				? nextPageText
				: 'Complete Questionnaire'
		},
	},
}
</script>

<style lang="scss">
@import "@/scss/variables";

.task {
	background: $light-background;
	padding: 1rem 2rem 2rem;
	margin-bottom: 2rem;
	border-radius: 5px;
}
</style>
