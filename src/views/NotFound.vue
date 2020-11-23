<template>
  <h2>Not found</h2>
</template>

<script>
export default {
  name: "NotFound",
  beforeRouteEnter(to, from, next) {
    if(!to.fullPath.includes('not-found')) {
      next('/not-found')
    } else {
      next()
    }
  }
}
</script>

<style scoped>

</style>