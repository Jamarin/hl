<template>
  <div
      :id="editorId"
      :style="{ minHeight: minHeight }"
      class="unlayer-editor"
  ></div>
</template>

<script>
import { loadScript } from './loadScript';
let lastEditorId = 0;

export default {
  name: 'EmailEditor',
  props: {
    options: Object,
    projectId: Number,
    tools: Object,
    appearance: Object,
    locale: String,
    minHeight: {
      type: String,
      default: '500px',
    },
  },
  computed: {
    editorId() {
      return `editor-${++lastEditorId}`;
    }
  },
  created() {
  },
  mounted() {
    loadScript(this.loadEditor.bind(this));
  },
  methods: {
    loadEditor() {
      const options = this.options || {};

      if (this.projectId) {
        options.projectId = this.projectId
      }

      if (this.tools) {
        options.tools = this.tools
      }

      if (this.appearance) {
        options.appearance = this.appearance
      }

      if (this.locale) {
        options.locale = this.locale
      }

      /* global unlayer */
      this.editor = unlayer.createEditor({
        ...options,
        id: this.editorId,
        displayMode: 'email',
        translations: {
          'ru-RU': {
            "labels.merge_tags": "Вставить теги"
          }
        },
        mergeTags: {
          first_name: {
            name: "First Name",
            value: "[%first_name%]"
          },
          last_name: {
            name: "Last Name",
            value: "<button>[%last_name%]</button>"
          },
          shipping_address: {
            name: "Shipping Address",
            mergeTags: {
              street_1: {
                name: "Street 1",
                value: "{{shipping_address.address_1}}"
              },
              street_2: {
                name: "Street 2",
                value: "{{shipping_address.address_2}}"
              },
              city: {
                name: "City",
                value: "{{shipping_address.city}}"
              },
              state: {
                name: "State",
                value: "{{shipping_address.state}}"
              },
              zip: {
                name: "Zip",
                value: "{{shipping_address.zip}}"
              }
            }
          }
        }
      });

      this.$emit('load');
    },
    loadDesign(design) {
      this.editor.loadDesign(design);
    },
    saveDesign(callback) {
      this.editor.saveDesign(callback);
    },
    exportHtml(callback) {
      this.editor.exportHtml(callback);
    }
  },
}
</script>

<style scoped>
.unlayer-editor {
  flex: 1;
  display: flex;
}
</style>