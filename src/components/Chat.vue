<template>
  <div>
    <div class="chat-messageList">
      <div class="chat-message" v-for="(message, index) in messages" :key="message.id">
        <div :class="(index%2===0) ? 'chat-message-pair' : 'chat-message-odd'">
          <div class="chat-message-author" :class="(message.hidden) ? 'stroke' : ''"><router-link :to="{name: 'profile', params: { username: message.author }}">{{ message.author }}</router-link>: </div>
          <div class="chat-message-text">{{ message.message }}</div>
          <div class="chat-message-admin" v-if="isAdmin"><span @click="hideMessage(message.id)">eye</span></div>
        </div>
      </div>
      <hr>
      <label>
        Message
        <input type="text" v-model="chatMessage">
      </label>
      <button @click="sendMessage">Submit message</button>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import io from 'socket.io-client';
import api from '@/utils/api-backend'

export default {
  name: "Chat",
  props: ['chatArea'],
  computed: {
    ...Vuex.mapGetters({
      getUserId: "user/getId",
      getRole: "user/getRole"
    }),
    isAdmin() {
      return this.getRole === 'admin'
    }
  },
  data() {
    return {
      messages: [],
      chatMessage: '',
      socket: io('localhost:3000')
    }
  },
  mounted() {
    this.socket.on(`MESSAGE_${this.chatArea}`, (data) => {
      if(this.messages.length === 20) this.messages.pop()
      this.messages.unshift(data)
    })
    this.socket.on(`HIDDEN_${this.chatArea}`, (data) => {
      this.messages = data
    })
  },
  async created() {
    try {
      let response = await api.getAllChatMessage(this.chatArea)
      this.messages = response.data
    } catch(err) {
      console.error(err)
    }
  },
  methods: {
    sendMessage: async function () {
      try {
        let response = await api.sendChatMessage({
          message: this.chatMessage,
          user: this.getUserId,
          chat: this.chatArea
        })
        console.info(response)
        this.chatMessage = ''
      } catch(err) {
        console.error(err)
      }
    },
    hideMessage: async function (id) {
      console.log(`Hide message with id ${id}`)
      try {
        let response = await api.hideChatMessage(id)
        console.info(response)
      } catch(err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
  .chat-messageList {
    border: 1px solid black;
    margin: 1rem 0;
    padding: 1rem 0;
  }
  .chat-message {
    padding: 0 1rem;
  }

  .chat-message .chat-message-text {
    display: inline;
  }

  .chat-message .chat-message-author {
    font-weight: bold;
    display: inline;
  }

  .chat-message .chat-message-admin {
    display: inline;
    float: right;
  }

  .chat-message-odd {
    background-color: #C0C0C0;
  }
  .chat-message-pair {
    background-color: #F1F1F1;
  }

  .stroke {
    text-decoration: overline;
  }
</style>