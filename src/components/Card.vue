<template>
  <Draggable>
    <!-- a card, on click show menu, with button create issue -->

    <v-menu
      :close-on-content-click="false"
      transition="scale-transition"
      origin="top right"
    >
      <template v-slot:activator="{ on }">
        <v-card elevation="2" flat tile color="#fffee8" class="card" v-on="on">
          <v-card-text>
            <v-icon>mdi-card-text-outline</v-icon>
            {{ card.name }}
          </v-card-text>
        </v-card>
      </template>

      <v-btn @click="createIssue">
        <v-icon>mdi-plus</v-icon>
        Create Issue
      </v-btn>
      <v-btn @click="remove" color="red">
        <v-icon>mdi-minus</v-icon>
        Remove
      </v-btn>

    </v-menu>
  </Draggable>
</template>

<script>
import { Draggable } from "@braks/revue-draggable";

export default {
  name: "Card",
  components: {
    Draggable,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    createIssue() {
      let userId = localStorage.getItem("userId");
      let sketchId = localStorage.getItem("sketchId");
      fetch('https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/issue?userId=' + userId + '&sketchId=' + sketchId, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              
          })
        }).then(response => response.json())
        .then(data => {
          console.log(data);
        }).error(function(err) {
          console.log(err);
        });
    },
    remove(){
        this.$emit('remove', this.card.id);
    }

  },
  mounted() {
    console.log(this.card);
  },
};
</script>

<style>
.card {
  width: 200px;
}
</style>