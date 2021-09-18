import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/meta'
import './assets/js/popup'

Vue.config.productionTip = false
new Vue({
	render: h => h(App),
	router,
	metaInfo() {
		return {
			title: '网易免费企业邮箱',
		}
	},
	mounted() {
		document.dispatchEvent(new Event('render-event'))
	},
}).$mount('#app')
