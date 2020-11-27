<template>
  <div>
    <b-tabs type="is-boxed">
      <b-tab-item>
        <template #header>
          <span> Personal </span>
        </template>
        <strong>Username: </strong> {{ userData.username }}<br>
        <strong>Name: </strong> {{ userData.name }}<br>
        <strong>Points: </strong> {{ totalPoints }}<br>
        <strong>House: </strong> {{ userData.house }}<br>
        <strong>Patronus: </strong> {{ userData.patronus }}<br>
        <strong>Description: </strong> {{ userData.description }}
      </b-tab-item>
      <b-tab-item>
        <template #header>
          <span> Points </span>
        </template>
        <b-button v-if="canChangePoints" @click="isChangePointsModalActive=true">Change points</b-button>

        <b-table
            :data="userPoints"
            :row-class="classBasedOnPoints"
            paginated
            striped
            per-page="10"
            sort-icon="arrow-up"
            sort-icon-size="is-small"
            default-sort="createdAt"
            default-sort-direction="desc"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">

          <b-table-column field="id" label="ID" width="40" sortable numeric v-slot="props" :visible=false>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="createdAt" label="Date" sortable v-slot="props">
            {{ new Date(props.row.createdAt).toLocaleString() }}
          </b-table-column>

          <b-table-column field="event" label="Event" v-slot="props">
            {{ props.row.event }}
          </b-table-column>

          <b-table-column field="points" label="Points" v-slot="props">
            {{ props.row.value }}
          </b-table-column>

          <b-table-column field="balance" label="Balance" v-slot="props">
            {{ props.row.balance }}
          </b-table-column>
        </b-table>
      </b-tab-item>
      <b-tab-item>
        <template #header>
          <span> Filch's files </span>
        </template>
        Filch's files data
      </b-tab-item>
    </b-tabs>
    <b-modal v-model="isChangePointsModalActive" :width="600">
      <div class="notification">
        <b-field label="Event"
                 label-position="on-border">
          <b-input placeholder="Why change points..." v-model="changePointsData.event" maxlength="255"></b-input>
        </b-field>

        <b-field label="Value"
                 label-position="on-border">
          <b-numberinput placeholder="5" v-model="changePointsData.value"></b-numberinput>
        </b-field>
        <b-button expanded type="is-primary" @click="changePoints"><strong>Change points</strong></b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from '@/utils/api-backend'
import Vuex from 'vuex'

export default {
  name: "Profile",
  props: ['username'],
  data() {
    return {
      userData: {},
      userPoints: [],
      isChangePointsModalActive: false,
      changePointsData: {
        event: '',
        value: null,
        user: '',
        staff: ''
      }
    }
  },
  computed: {
    ...Vuex.mapGetters({
      "getRole": "user/getRole",
      "getUserId": "user/getId"
    }),
    totalPoints: function() {
      if(this.userPoints.length > 0)
        return this.userPoints.map(point => point.value).reduce((prev, next) => prev + next)
      else
        return 0
    },
    canChangePoints: function () {
      return this.getRole === 'admin' || this.getRole === 'moderator';
    }
  },
  methods: {
    classBasedOnPoints: function (row) {
      return row.value > 0 ? 'green' : 'red';
    },
    changePoints: async function() {
      this.changePointsData.user = this.userData.id
      this.changePointsData.staff = this.getUserId
      try {
        await api.changePoints(this.changePointsData)
      } catch(err) {
        console.error(err)
      } finally {
        this.changePointsData.event = ''
        this.changePointsData.value = 0
        this.changePointsData.user = ''
        this.changePointsData.staff = ''
        this.isChangePointsModalActive = false
      }
    },
    addBalanceToPoints: function () {
      let balance = 0
      this.userPoints.forEach(point => {
        balance += point.value
        return point.balance = balance
      })
    }
  },
  async created() {
    try {
      let response = await api.getUserDataByUsername(this.username)
      if(response.status === 200) {
        this.userData = response.data
      }
    } catch(err) {
      console.error(err)
    }

    try {
      let response = await api.getUserPointsById(this.userData.id)
      this.userPoints = response.data
      this.addBalanceToPoints()
    } catch(err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
</style>