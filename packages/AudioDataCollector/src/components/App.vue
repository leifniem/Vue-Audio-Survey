<template>
	<div id="app">
		<header class="wrapper site-header">
			<div class="logo">
				<img :src="logo" alt="" />
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
import { title, subtitle } from '@/config.js'
import logo from '@/img/logo.svg'

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
	--primary-color: #4e6f7d;
	--text-color: #3f4344;
	--button-text-color: #ffffff;
}

body {
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
}
</style>
