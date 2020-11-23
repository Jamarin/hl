import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.min.css'

import VueRouter from 'vue-router'
import { router } from '@/router'

import store from '@/store'

import Moment from 'moment'
Moment.locale('en')
Vue.prototype.$moment = Moment

Vue.use(Buefy)
Vue.use(VueRouter)
window.event = new Vue
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')