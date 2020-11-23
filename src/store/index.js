import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user
    },
    strict: debug,
    plugins: [
        new VuexPersist({
            key: 'hl-store',
            storage: window.localStorage
        }).plugin
    ]
})