<template>
  <div>
    <h2>{{ getHouse }} common room</h2>
    <Chat :chat-area="getHouse"/>
  </div>
</template>

<script>
import Chat from "@/components/Chat";
import Vuex from 'vuex'

export default {
  components: {Chat},
  computed: {
    ...Vuex.mapGetters({
      getHouse: 'user/getHouse'
    })
  },
  created() {
    if (!['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'].includes(this.getHouse)) {
      this.$router.push({name: 'not-found'})
    }
  },
  name: "CommonRoom",
}
</script>

<style scoped>

</style>