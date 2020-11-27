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
    toggleHideMessage(id, currentStatus) {
        return AXIOS.put('/chat/toggle-hide/', {
            id: id,
            currentStatus: currentStatus
        })
    },
    toggleHighlightMessage(id, currentStatus) {
        return AXIOS.put('/chat/toggle-highlight/', {
            id: id,
            currentStatus: currentStatus
        })
    },
    getAllOwlsSent(id) {
        return AXIOS.get(`/owlery/all/sender/${id}`)
    },
    getAllOwlsReceived(id) {
        return AXIOS.get(`/owlery/all/receptor/${id}`)
    },
    getAllUsersForOwls(id) {
        return AXIOS.get(`/user/all/owlery/${id}`)
    },
    markOwlAsRead(id) {
        return AXIOS.put('/owlery/mark-read/', {
            id
        })
    },
    sendOwl(owl) {
        return AXIOS.post(`/owlery/send/`, {
            owl
        })
    },
    getUserDataByUsername(username) {
        return AXIOS.get(`/user/${username}`)
    },
    getUserPointsById(id) {
        return AXIOS.get(`/user/points/${id}`)
    },
    changePoints(changePointsData) {
        return AXIOS.post(`/user/points/add/`, {
            changePointsData: changePointsData
        })
    },
    getAllNewsShow() {
        return AXIOS.get('/news/show/all/')
    }
}