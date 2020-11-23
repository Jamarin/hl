<template>
  <div>
    <h2>{{ house }} common room</h2>
    <Chat :chat-area="house"/>
  </div>
</template>

<script>
import Chat from "@/components/Chat";
export default {
  components: {Chat},
  props: ['house'],
  name: "CommonRoom",
  beforeRouteEnter(to, from, next) {
    if(['gryffindor', 'slytherin' ,'ravenclaw', 'hufflepuff'].includes(to.params.house)) {
      next()
    } else {
      next('/not-found')
    }
  }
}
</script>

<style scoped>

</style>