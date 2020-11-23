import axios from "axios";
import store from '../store'

const AXIOS = axios.create({
    baseURL: 'http://localhost:3000',
});

AXIOS.defaults.headers.common = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

AXIOS.interceptors.request.use(function (config) {
    config.headers.Authorization =  `Bearer ${store.getters["user/getToken"]}`
    return config;
});

export default {
    loginUser(user) {
        return AXIOS.post('/public/login/', {
            user
        })
    },
    registerUser(user) {
        return AXIOS.post('/public/register/', {
            user
        })
    },
    verifyJwt() {
        return AXIOS.get('/user/verify/')
    },
    getAllChatMessage(chat) {
        return AXIOS.get(`/chat/all/${chat}`)
    },
    sendChatMessage(message) {
        return AXIOS.post('/chat/send/', {
            message: message
        })
    },
    hideChatMessage(id) {
        return AXIOS.put('/chat/hide/', {
            id: id
        })
    }
}