<template>
  <div>
    <h2>Register</h2>
    <label>
      Username
      <input type="text" v-model="user.username">
    </label>
    <label>
      Email
      <input type="email" v-model="user.email">
    </label>
    <label>
      House
      <input type="text" v-model="user.house">
    </label>
    <label>
      Password
      <input type="password" v-model="user.password">
    </label>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import api from "@/utils/api-backend";

export default {
name: "Register",
  data() {
    return {
      user: {
        username: '',
        email: '',
        house: '',
        password: ''
      }
    }
  },
  methods: {
    register: async function () {
      let response = await api.registerUser(this.user)
      console.log(response)
      console.log(this.user)
    },
  }
}
</script>

<style scoped>

</style>