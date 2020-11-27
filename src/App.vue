<template>
  <div>
    <TheHeader/>
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