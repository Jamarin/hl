<template>
  <div>
    <TheHeader v-if="$store.getters['user/isAuth']"/>
    <router-view class="container is-widescreen"></router-view>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
export default {
  name: "App.vue",
  components: {TheHeader}
}
</script>

<style scoped>

</style>