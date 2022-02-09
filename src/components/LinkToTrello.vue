<template>
  <div>
    <!-- Vcard with text saying 'authorize trello' and a button to trello auth page -->
    <v-card>
      <v-card-title>
        <span class="headline">Authorize Trello</span>
      </v-card-title>
      <v-card-text>
        <p>
          <span class="grey--text">
            You need to authorize Trello to access your boards.
          </span>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          dark
          :href="trelloAuthUrl"
        >
          Authorize Trello
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LinkToTrello',
  data () {
    return {
      trelloAPIKey: 'd61396d6f8b46b6f2e883932d79835eb',
      trelloAppName: 'Trello Fl0 Integration',
      trelloReturnUrl: window.location.href,
    }
  },
  computed: {
    trelloAuthUrl () {
      return `https://trello.com/1/authorize?key=${this.trelloAPIKey}&name=${this.trelloAppName}&expiration=never&response_type=token&scope=read,write&return_url=${this.trelloReturnUrl}`
    },
  },
}
</script>

<style>

</style>