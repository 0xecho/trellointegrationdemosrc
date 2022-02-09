<template>
  <div>
    <v-card color="#fffee8" flat tile elevation="2">
      <v-card-title> Trello Issues </v-card-title>
      <hr />
      <v-list>
        <v-list-item v-for="(issue, index) in issues" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ issue.name }}
            </v-list-item-title>

            <v-btn color="primary" dark small @click="addToCanvas(issue.id)">
              <v-icon>mdi-plus</v-icon>
              Add to canvas
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Issues',
  data() {
    return {
      issues: [],
    };
  },
  methods: {
    fetchIssues() {
      let userId = localStorage.getItem('userId')
      let sketchId = localStorage.getItem('sketchId')
      fetch("https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/issues?userId=" + userId + "&sketchId=" + sketchId)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          try {
            if (data.status == "failed") {
              console.log("failed");
            } else {
              this.issues = data;
            }
          } catch (e) {
            this.issues = data;
          }
        })
    },
  },
  mounted() {
    this.fetchIssues();
  },
};
</script>

<style>
</style>