<template>
	<div class="intro">
		<h1>Welcome and thank you</h1>
		<p>{{ introduction }}</p>
		<router-link to='/privacy'>
			<button>
				{{ nextPageText }}
			</button>
		</router-link>
	</div>
</template>

<script>
import {introduction, nextPageText} from '@/config.js'
export default {
	name: 'Homepage',
	data () {
		return {
			introduction,
			nextPageText
		}
	}
}
</script>