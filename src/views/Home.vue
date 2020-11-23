<template>
  <div>
    <div>The home</div>
    <ul>
      <li>Gryffindor common room:
        <router-link :to="{ name: 'common-room', params: { house: 'gryffindor' }}">access</router-link>
      </li>
      <li>Slytherin common room:
        <router-link :to="{ name: 'common-room', params: { house: 'slytherin' }}">access</router-link>
      </li>
      <li>Ravenclaw common room:
        <router-link :to="{ name: 'common-room', params: { house: 'ravenclaw' }}">access</router-link>
      </li>
      <li>Hufflepuff common room:
        <router-link :to="{ name: 'common-room', params: { house: 'hufflepuff' }}">access</router-link>
      </li>
      <li>Great hall:
        <router-link :to="{ name: 'great-hall'}">access</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>