<template>
  <div>
    <h2>{{ owl.title }}</h2>
    <p>{{ owl.message }}</p>
    <p v-if="!sent">Message from {{ owl.sender }}</p>
  </div>
</template>

<script>
export default {
  name: "Owl",
  props: ["owl", "sent"],
  created() {
    console.log(this.owl)
  }
}
</script>

<style scoped>

</style>