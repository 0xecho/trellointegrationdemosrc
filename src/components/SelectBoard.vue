<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Select Board</span>
      </v-card-title>
      <v-card-text>
        <v-select
          :items="organizations"
          label="Organization"
          v-model="selectedOrganization"
          item-text="name"
          item-value="id"
          @change="fetchBoards"
        ></v-select>
      </v-card-text>
      <v-card-text>
        <v-select
          :items="boards"
          label="Board"
          v-model="selectedBoard"
          item-text="name"
          item-value="id"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          dark
          @click="select"
        >
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // get selectedOrganization and selectedBoard from store 
      selectedOrganization: null,
      selectedBoard: null,
      organizations: [],
      boards: [],
      buttonText: 'Select',
    };
  },
  methods: {
    fetchBoards() {
      let userId = localStorage.getItem('userId')
      let sketchId = localStorage.getItem('sketchId')
      fetch("https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/boards?userId=" + userId + "&sketchId=" + sketchId + "&organizationId=" + this.selectedOrganization)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          try {
            if (data.status == "failed") {
              console.log("failed");
            } else {
              this.boards = data;
            }
          } catch (e) {
            this.boards = data;
          }
        })
    },
    fetchOrganizations() {
      let userId = localStorage.getItem('userId')
      let sketchId = localStorage.getItem('sketchId')
      fetch("https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/organizations?userId=" + userId + "&sketchId=" + sketchId)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          try {
            if (data.status == "failed") {
              console.log("failed");
            } else {
              this.organizations = data
            }
          } catch (e) {
            this.organizations = data
          }
        })
    },
    select() {
      let userId = localStorage.getItem('userId')
      let sketchId = localStorage.getItem('sketchId')
      this.buttonText = 'Loading...'
      fetch("https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/boards/select?userId=" + userId + "&sketchId=" + sketchId, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              boardId: this.selectedBoard,
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          localStorage.setItem('boardId', this.selectedBoard);
          localStorage.setItem('organizationId', this.selectedOrganization);
          this.buttonText = 'Selected'
      }).catch(err => {
          console.log(err);
          this.buttonText = 'Error'
      })
    },
  },
  mounted() {
    this.fetchOrganizations();
  },
}
</script>

<style>

</style>