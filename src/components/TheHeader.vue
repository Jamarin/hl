<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{name: 'home'}">
        <h1 class="title">HL</h1>
      </router-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{name: 'home'}" class="navbar-item">
          Home
        </router-link>

        <router-link :to="{name: 'profile', params: {'username': getUsername}}" class="navbar-item">
          {{ getUsername }} profile
        </router-link>

        <router-link :to="{name: 'great-hall'}" class="navbar-item">
          Great Hall
        </router-link>

        <router-link :to="{name: 'owlery'}" class="navbar-item">
          Owlery
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable" v-if="getIsAuth">
          <a href="#" class="navbar-link">
            <span class="house">{{ getHouse }}</span>
          </a>

          <div class="navbar-dropdown">
            <router-link :to="{name: 'common-room', params: {'house': getHouse}}" class="navbar-item">
              Common Room
            </router-link>
            <a class="navbar-item">
              Club
            </a>
            <a class="navbar-item">
              Team
            </a>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable" v-if="isAdmin">
          <a href="#" class="navbar-link">
            <span>Staff</span>
          </a>

          <div class="navbar-dropdown">
            <router-link :to="{name: 'prefects-bathroom'}" class="navbar-item">
              Prefect's Bathroom
            </router-link>
            <router-link :to="{name: 'professors-room'}" class="navbar-item">
              Professors' Room
            </router-link>
            <router-link :to="{name: 'headmasters-office'}" class="navbar-item">
              Headmaster's Office
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!getIsAuth">
            <router-link :to="{name: 'register'}" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{name: 'login'}" class="button is-light">
              Log in
            </router-link>
          </div>
          <div class="buttons" v-else>
            <button @click="execLogout" class="button is-primary">
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Vuex from 'vuex'

export default {
  name: "TheHeader",
  computed: {
    ...Vuex.mapGetters({
      getUsername: 'user/getUsername',
      getIsAuth: 'user/isAuth',
      getRole: 'user/getRole',
      getHouse: 'user/getHouse'
    }),
    isAdmin: function () {
      return this.getRole === 'admin' || this.getRole === 'moderator'
    }
  },
  methods: {
    ...Vuex.mapActions({
      logout: 'user/logout'
    }),
    execLogout: function () {
      this.logout()
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
.house {
  text-transform: capitalize;
}
</style>