import VueRouter from 'vue-router'

import Home from "@/views/Home";
import GreatHall from "@/views/GreatHall";
import CommonRoom from "@/views/CommonRoom";
import Login from "@/views/Login";
import NotFound from "@/views/NotFound";
import Club from "@/views/Club";
import ClubEditor from "@/views/ClubEditor";
import Register from "@/views/Register";

import store from '@/store'
import api from '@/utils/api-backend'
import Profile from "@/views/Profile";

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', name: 'home', component: Home, meta: {requiresAuth: true}},
        {path: '/profile/:username', name: 'profile', component: Profile, meta: {requiresAuth: true}, props: true},
        {path: '/great-hall', name: 'great-hall', component: GreatHall, meta: {requiresAuth: true}},
        {path: '/common-room/:house', name: 'common-room', component: CommonRoom, meta: {requiresAuth: true}, props: true},
        {path: '/club/', name: 'club', component: Club, meta: {requiresAuth: true}, props: true},
        {path: '/club-editor/', name: 'club-editor', component: ClubEditor, meta: {requiresAuth: true}, props: true},
        {path: '/login', name: 'login', component: Login, meta: {requiresAuth: false}},
        {path: '/register', name: 'register', component: Register, meta: {requiresAuth: false}},
        {path: '*', name: 'not-found', component: NotFound}
    ]
})

router.beforeEach(async (to, from, next) => {
    if(store.getters["user/isAuth"]) {
        try {
            const verifyJwt = await api.verifyJwt()
            if(verifyJwt.status === 200) {
                next()
            } else {
                await store.dispatch('user/logout')
                next({name:'login'})
            }
        } catch(err) {
            console.error(err)
            await store.dispatch('user/logout')
            next({to:'login'})
        }
    }
    next()
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["user/isAuth"]) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        if (store.getters["user/isAuth"]) {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    }
    next()
})

export {router}