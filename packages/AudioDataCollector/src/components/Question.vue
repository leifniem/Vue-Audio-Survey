<template>
	<div :class="'question question-' + index">
		<h3>
			This is Question {{ parseInt(index) + 1 }} of {{ questions.length }}
		</h3>
		<p>
			{{ this.questions[index].text }}
		</p>
		<Recorder :id="index" class="recorder" />
		<router-link :to="nextPage">
			<button>
				{{ buttonText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import questions from '@/questions.json'
import Recorder from '@/components/Recorder'

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
		buttonText () {
			return this.index < questions.length - 1
			? 'Skip Question'
			: 'Complete Questionnaire'
		}
	},
}
</script>

<style>
	.recorder{
		max-width: 100%;
		box-shadow: none;
		padding: 2rem;
	}
</style>