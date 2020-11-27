<template>
  <b-table
      :data="owls"
      ref="table"
      paginated
      per-page="5"
      detailed
      detail-key="id"
      :opened-detailed="defaultOpenedDetails"
      :show-detail-icon="showDetailIcon"
      @details-open="(row) => markAsReadIfNecessary(row)"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">

    <b-table-column field="id" label="ID" width="40" numeric v-slot="props" :visible="false">
      {{ props.row.id }}
    </b-table-column>

    <b-table-column field="title" label="Title" sortable v-slot="props">
      {{ props.row.title }} <b-tag v-if="!props.row.read && !sent" type="is-warning">New</b-tag>
    </b-table-column>

    <b-table-column field="sender" label="Sender" sortable v-slot="props">
      <template v-if="showDetailIcon">
        {{ props.row.sender }}
      </template>
      <template v-else>
        <a @click="props.toggleDetails(props.row)">
          {{ props.row.sender }}
        </a>
      </template>
    </b-table-column>

    <b-table-column field="receptor" label="Receptor" sortable v-slot="props">
      {{ props.row.receptor }}
    </b-table-column>

    <b-table-column field="createdAt" label="Date" sortable centered v-slot="props">
                <span class="tag is-success">
                    {{ new Date(props.row.createdAt).toLocaleDateString() }}
                </span>
    </b-table-column>
    <template slot="detail" slot-scope="props">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <div>
              <strong>{{ props.row.title }}</strong><br>
              <small>Owl sent by <strong><router-link :to="{name: 'profile', params: {'username': props.row.sender}}">@{{ props.row.sender }}</router-link></strong> - {{ $moment(props.row.createdAt).fromNow() }}</small>
              <hr>
              <span v-html="props.row.message"></span>
            </div>
          </div>
        </div>
      </article>
    </template>
  </b-table>
</template>

<script>
import api from '@/utils/api-backend'

export default {
  name: "OwlTable",
  props: ["owls", "sent"],
  data() {
    return {
      defaultOpenedDetails: [2],
      showDetailIcon: true
    }
  },
  methods: {
    markAsReadIfNecessary: async function(row) {
      if(!this.sent && !row.read) {
        await api.markOwlAsRead(row.id)
      }
    }
  }
}
</script>

<style scoped>

</style>