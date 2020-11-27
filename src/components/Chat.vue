<template>
  <div>
    <div class="chat-messageList">
      <div class="chat-message" v-for="(message, index) in messages" :key="message.id">
        <div v-show="canViewDeletedMessages(message.hidden)" :class="{
            'chat-message-pair': (index%2===0),
            'chat-message-odd': (index%2!==0),
            'chat-message-highlighted': (message.highlighted),
            'strike': message.hidden
          }">
          <div class="chat-message-author" :class="{
            'ravenclaw': message.author.house === 'ravenclaw',
            'gryffindor': message.author.house === 'gryffindor',
            'hufflepuff': message.author.house === 'hufflepuff',
            'slytherin': message.author.house === 'slytherin'
          }"><router-link :to="{name: 'profile', params: { username: message.author.username }}">{{ message.author.username }}</router-link>: </div>
          <div class="chat-message-text">{{ message.message }}</div>
          <div class="chat-message-admin" v-if="isAdmin">
            <span @click="toggleHideMessage(message.id, message.hidden)">eye</span>
             ||
            <span @click="toggleHighlightMessage(message.id, message.highlighted)">star</span>
          </div>
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
    this.socket.on(`UPDATE_${this.chatArea}`, (data) => {
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
    canViewDeletedMessages(hidden) {
      if(hidden &&  this.isAdmin) return true
      return !hidden;

    },
    sendMessage: async function () {
      if(this.chatMessage === '') {
        this.$buefy.notification.open({type: 'is-danger', message: 'Error: message cannot be empty'})
        return
      }
      try {
        let response = await api.sendChatMessage({
          message: this.chatMessage,
          user: this.getUserId,
          chat: this.chatArea
        })
        if(response.status === 200) {
          this.chatMessage = ''
        } else {
          this.$buefy.notification.open({type: 'is-danger', message: 'Error: message not sent'})
        }
      } catch(err) {
        console.error(err)
      }
    },
    toggleHideMessage: async function (id, currentStatus) {
      try {
        await api.toggleHideMessage(id, currentStatus)
      } catch(err) {
        console.error(err)
      }
    },
    toggleHighlightMessage: async function (id, currentStatus) {
      try {
        await api.toggleHighlightMessage(id, currentStatus)
      } catch(err) {
        console.error(err)
      }
    },
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

  .chat-message-highlighted {
    border: 2px solid orange;
  }

  .gryffindor a {
    color: red;
  }

  .ravenclaw a {
    color: blue;
  }

  .slytherin a {
    color: green;
  }

  .hufflepuff a {
    color: yellow;
  }

  .strike {
    text-decoration: line-through;
    opacity: 0.3
  }
</style>