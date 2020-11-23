<template>
  <div>
    <div>
      <button v-on:click="saveDesign">Save Design</button>
      <button v-on:click="exportHtml">Export HTML</button>
    </div>
    <EmailEditor
        class="editor"
        ref="editor"
        locale="es-ES"
        min-height="900"
        @load="editorLoaded"/>
  </div>
</template>

<script>
import EmailEditor from "@/components/editor/EmailEditor";
import sample from "@/views/sample.json"

export default {
  name: "ClubEditor",
  components: {
    EmailEditor
  },
  data() {
    return {
      locTemplate: sample,
      tools: {
        html: {
          properties: {
            html: {
              value: '<strong>Hello, world! Test</strong>'
            }
          }
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    editorLoaded() {
      this.locTemplate.body.rows[0].columns[0].contents[0].values.html = this.template;
      this.$refs.editor.loadDesign(this.locTemplate);
    },
    saveDesign() {
      this.$refs.editor.saveDesign(design => {
            console.log('saveDesign', design);
            console.log(JSON.stringify(design));
          }
      )
    },
    exportHtml() {
      this.$refs.editor.exportHtml(data => {
            // this.locTemplate = data;
            // this.locTemplate.html = this.template;
            console.log('exportHtml', data);
            console.log(data.html);
          }
      )
    }
  }
}
</script>

<style scoped>
  .editor {
    height: 900px;
  }
</style>