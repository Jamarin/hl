import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.min.css'

import VueRouter from 'vue-router'
import {router} from '@/router'

import store from '@/store'

import Moment from 'moment'

Moment.locale('en')
Vue.prototype.$moment = Moment

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

/** BUEFY CONFIG **/

import {library} from '@fortawesome/fontawesome-svg-core';
// internal icons
import {faPlus, faArrowUp, faAngleRight, faAngleLeft, faTimesCircle, faSearch, faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(faPlus, faArrowUp, faAngleRight, faAngleLeft, faTimesCircle, faSearch, faMinus);
Vue.component('vue-fontawesome', FontAwesomeIcon);

/** BUEFY CONFIG **/

Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
})

import VueQuill from 'vue-quill'
Vue.use(VueQuill)

Vue.use(VueRouter)
window.event = new Vue
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')