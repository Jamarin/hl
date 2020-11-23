<template>
  <div>
    <button @click="execLogout">Logout</button>
    <div>Hello {{ getUsername }}! Welcome to Hogwarts =)</div>
    <div><router-link :to="{name: 'home'}">Go home</router-link></div>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "TheHeader",
  computed: {
    ...Vuex.mapGetters({
      getUsername: 'user/getUsername'
    })
  },
  methods: {
    ...Vuex.mapActions({
      logout: 'user/logout'
    }),
    execLogout: function() {
      this.logout()
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>

</style>