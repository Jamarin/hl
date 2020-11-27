<template>
  <div>
    <quill v-model="quillContent" output="html" :config="quillConfig"></quill>
    <div v-html="quillContent"></div>
    <h1 class="title">The Daily Prophet</h1>
    <div v-for="notice in news" :key="notice.id" class="notification" :class="{
      'featured': notice.featured
    }">
      <div class="data">{{ new Date(notice.createdAt).toLocaleDateString() }} | Author: {{
          notice.author.username
        }}
      </div>
      <h2 class="title">{{ notice.title }}</h2>
      <h3 class="subtitle">{{ notice.extract }}</h3>
      <div class="notice-text" v-html="notice.full_text"></div>
      <div class="buttons has-text-right">
        <b-button>Show more</b-button>
        <b-button>Coments</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api-backend'

export default {
  name: "Home",
  data() {
    return {
      news: [],
      quillContent: '',
      quillConfig: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']                                         // remove formatting button
          ]
        }
      }
    }
  },
  async created() {
    try {
      let response = await api.getAllNewsShow()
      this.news = response.data.filter(notice => notice.draft === false)
    } catch (err) {
      console.error(err)
    }


  }
}
</script>

<style scoped>
div.featured {
  border: 1px solid orange;
}

.notice-text >>> p:not(last-child) {
  margin-bottom: 0.75rem
}
</style>