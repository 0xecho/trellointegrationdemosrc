<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Trello Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo-500x281.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <!-- a navbar dropdown a bit to the left from the edge -->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        transition="scale-transition"
        origin="top right"
      >
        <template v-slot:activator="{ on }">
        <v-btn
          slot="activator"
          color="primary"
          dark
          text
          v-on="on"
        >
          <span class="white--text">
            <v-icon>mdi-account</v-icon>
            Select Organization
          </span>
        </v-btn>
        </template>

        <SelectOrganization>
        </SelectOrganization>
      </v-menu>

      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        transition="scale-transition"
        origin="top right"
      >
        <template v-slot:activator="{ on }">
        <v-btn
          slot="activator"
          color="primary"
          dark
          text
          v-on="on"
        >
          <span class="white--text">
            <v-icon>mdi-account</v-icon>
            Link to Trello
          </span>
        </v-btn>
        </template>

        <LinkToTrello>
        </LinkToTrello>
      </v-menu>

      
      <template v-if="user.id">
        Linked to: &nbsp;
        <span class="white--text">
          {{ user.name }}
        </span>
      </template>
        
    </v-app-bar>

    <v-main>
      <Card/>
    </v-main>
  </v-app>
</template>

<script>
import Card from './components/Card';
import SelectOrganization from './components/SelectOrganization';
import LinkToTrello from './components/LinkToTrello';

export default {
  name: 'App',

  data() {
    return {
      trelloToken: "d61396d6f8b46b6f2e883932d79835eb",
      user: {
        id: "",
        name: "",
        avatar: "",
      },
      sketchId: "",
      userId: "",
    }
  },

  components: {
    Card,
    SelectOrganization,
    LinkToTrello,
  },

  methods: {
    getLinkedUser(){
      let trelloToken = localStorage.getItem('trelloToken');
      fetch(`https://api.trello.com/1/members/me?key=${this.trelloToken}&token=${trelloToken}`)
      .then(response => response.json())
      .then(data => {
        this.user.id = data.id;
        this.user.name = data.fullName;
        this.user.avatar = data.avatarUrl;
      })
    }
  },

  mounted() {
    let sketchId = localStorage.getItem('sketchId');
    if(!sketchId){
      sketchId = Math.random().toString(36)
      localStorage.setItem('sketchId', sketchId);
    }
    let userId = localStorage.getItem('userId');
    if(!userId){
      userId = Math.random().toString(36)
      localStorage.setItem('userId', userId);
    }
    this.sketchId = sketchId;
    this.userId = userId;
    this.getLinkedUser();
  }
};
</script>
