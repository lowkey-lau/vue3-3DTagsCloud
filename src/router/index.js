import Vue from 'vue'
import Router from 'vue-router'
import Demo from '../components/demo.vue'

Vue.use(Router)

export default new Router({
	// history: mode,
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Demo',
			component: Demo
		},
	]
})