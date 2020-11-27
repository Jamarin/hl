<template>
  <div>
    <div class="has-text-right">
      <b-button type="is-primary" class="mb-3" @click="isCreateOwlModalActive = true">
        <b-icon
            pack="fas"
            icon="plus"
            size="is-small">
        </b-icon>
        <span>Send new owl</span></b-button>
    </div>
    <b-tabs type="is-boxed">
      <b-tab-item>
        <template #header>
          <span> Inbox <b-tag rounded> {{ notReadOwls }} </b-tag> </span>
        </template>
        <OwlTable :owls="receivedOwls" :sent="false" :key="receivedKey"/>
      </b-tab-item>
      <b-tab-item>
        <template #header>
          <span> Sent </span>
        </template>
        <OwlTable :owls="sentOwls" :sent="true"/>
      </b-tab-item>
    </b-tabs>
    <b-modal v-model="isCreateOwlModalActive" :width="600">
      <div class="notification">
        <b-field label="Subject"
                 label-position="on-border">
          <b-input placeholder="Some subject" v-model="createOwl.subject" maxlength="80"></b-input>
        </b-field>

        <b-field label="Recipient" label-position="on-border">
          <b-autocomplete
              v-model="typingSelected"
              :data="allUsers"
              placeholder="Harry Potter"
              icon="search"
              field="username"
              clearable
              @select="option => this.createOwl.selectedUser = option">
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Message"
                 label-position="on-border">
          <b-input maxlength="200" type="textarea" v-model="createOwl.message"></b-input>
        </b-field>
        <b-button expanded type="is-primary" @click="sendOwl"><strong>Send owl</strong></b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vuex from 'vuex'
import io from 'socket.io-client';
import api from '@/utils/api-backend'
import OwlTable from "@/components/OwlTable";

export default {
  name: "Owlery",
  components: {OwlTable},
  computed: {
    ...Vuex.mapGetters({
      getUserId: "user/getId",
      getRole: "user/getRole",
      getUsername: "user/getUsername"
    }),
    filteredUserList: function () {
      return this.allUsers.filter(option => {
        return option.toString().toLowerCase().indexOf(this.typingSelected.toLowerCase()) >= 0
      })
    },
    //FIXME: This computed is not updated after read an owl
    notReadOwls: function() {
      return this.receivedOwls.filter(owl => {
        return owl.read === false
      }).length
    }
  },
  data() {
    return {
      receivedKey: 0,
      receivedOwls: [],
      sentOwls: [],
      isCreateOwlModalActive: false,
      allUsers: [],
      typingSelected: '',
      createOwl: {
        selectedUser: null,
        senderUser: {
          id: this.getUserId,
        },
        subject: '',
        message: ''
      },
      socket: io('localhost:3000')
    }
  },
  mounted() {
    this.socket.on(`OWL_SENT_${this.getUsername}`, (data) => {
      this.sentOwls.unshift(data)
    })
    this.socket.on(`OWL_RECEIVED_${this.getUsername}`, (data) => {
      this.receivedOwls.unshift(data)
      this.receivedKey++;
    })
    this.socket.on(`OWL_UPDATED_${this.getUsername}`, async (data) => {
      this.receivedOwls.forEach((owl, index) => {
        console.log("Owl id: " + owl.id)
        console.log("Data id: " + data.id)
        if(owl.id === data.id) {
          this.receivedOwls[index] = data
          //FIXME: Detail closes just after update child component
          this.receivedKey++;
        }
      })
    })
  },
  methods: {
    sendOwl: async function () {
      this.createOwl.senderUser.id = this.getUserId
      let response = await api.sendOwl(this.createOwl)
      if(response.status === 200) {
        this.isCreateOwlModalActive = false
        this.createOwl.message = ''
        this.createOwl.subject = ''
        this.createOwl.selectedUser = null
      }
    }
  },
  async created() {
    try {
      let response = await api.getAllOwlsReceived(this.getUserId)
      this.receivedOwls = response.data
    } catch(err) {
      console.error(err)
    }
    try {
      let response = await api.getAllOwlsSent(this.getUserId)
      this.sentOwls = response.data
    } catch(err) {
      console.error(err)
    }

    try {
      let response = await api.getAllUsersForOwls(this.getUserId)
      this.allUsers = response.data
    } catch(err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
  .owl {
    border: 1px solid black;
    margin: 0.5rem 0
  }
</style>