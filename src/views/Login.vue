<template>
  <div>
    <label>
      Email
      <input type="text" v-model="user.email">
    </label>
    <label>
      Password
      <input type="password" v-model="user.password">
    </label>
    <button @click="execLogin">Login</button>
  </div>
</template>

<script>
import api from '@/utils/api-backend'
import Vuex from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      login: 'user/login'
    }),
    async execLogin() {
      try {
        let response = await api.loginUser(this.user)
        this.login(response.data)
        await this.$router.push({name: 'home'})
      } catch(err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>