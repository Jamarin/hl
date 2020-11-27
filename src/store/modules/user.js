const state = () => ({
    username: '',
    email: '',
    id: '',
    house: '',
    role: '',
    isAuth: false,
    token: ''
})

const getters = {
    isAuth: (state) => {
        return state.isAuth
    },
    getId: (state) => {
        return state.id
    },
    getToken: (state) => {
        return state.token
    },
    getUsername: (state) => {
        return state.username
    },
    getRole: (state) => {
        return state.role
    },
    getHouse: (state) => {
        return state.house
    },
    getUser: (state) => {
        return {
            username: state.username,
            email: state.email,
            house: state.house,
            id: state.id,
            role: state.role,
            token: state.token
        }
    }
}

const actions = {
    login({commit}, user) {
        commit('setUserData', user)
    },
    logout({commit}) {
        commit('setUserData', null)
    }
}

const mutations = {
    setUserData(state, userData) {
        if (userData !== null) {
            state.username = userData.username
            state.email = userData.email
            state.id = userData.id
            state.isAuth = true
            state.token = userData.token
            state.house = userData.house
            state.role = userData.role
        } else {
            state.username = ''
            state.email = ''
            state.id = ''
            state.isAuth = false
            state.token = ''
            state.house = ''
            state.role = ''
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}