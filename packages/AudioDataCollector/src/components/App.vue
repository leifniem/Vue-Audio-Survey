<template>
	<div id="app">
		<header class="wrapper site-header">
			<div class="logo">
				<img :src="logo.default" alt="" />
			</div>
			<div class="title">
				<h1 v-if="title">{{ title }}</h1>
				<h2 v-if="subtitle">{{ subtitle }}</h2>
			</div>
		</header>
		<article class="wrapper">
			<router-view></router-view>
		</article>
	</div>
</template>

<script>
import { title, subtitle, logo } from '@/config.js'

export default {
	name: 'AppWrapper',
	data() {
		return {
			logo,
			title,
			subtitle,
		}
	},
}
</script>

<style lang="scss">
*,
*:after,
*:before {
	box-sizing: border-box;
	--background: #ffffff;
	--light-background: #edf0f1;
	--primary-color: #4b95b4;
	--primary-dark: #2d597c;
	--text-color: #2a2d2e;
	--button-text-color: #ffffff;
}

body {
	background: var(--background);
	font-family: sans-serif;
	line-height: 1.8;
	font-size: 1rem;
	color: var(--text-color);
}

.wrapper {
	width: 100%;
	max-width: 36rem;
	padding: 2rem;
	margin: 0 auto;
}

.site-header {
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-areas: 'logo title title';
	grid-gap: 1rem;
	align-items: center;
}

.logo {
	grid-area: 'logo';
	img {
		max-height: 100px;
	}
}

.title {
	grid-area: 'title';
	display: inline-block;

	h1,
	h2 {
		line-height: 1;
		margin: 0 0 1rem;
	}

	h1 {
		color: var(--primary-color);
	}

	h2 {
		font-weight: normal;
		font-size: 1.2rem;
	}
}

article {
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	a {
		color: var(--primary-color);
	}
}

button {
	background: var(--primary-color);
	padding: .75rem;
	border-radius: 5px;
	font-weight: bold;
	color: var(--button-text-color);
	border: none;

	&:hover {
		box-shadow: inset 0 3px 0 var(--primary-dark);
	}

	&:active {
		background:var(--primary-dark);
	}
}
</style>
