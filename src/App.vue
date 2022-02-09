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

      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        transition="scale-transition"
        origin="top right"
        :value="selectBoardVisible"
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
            Select Board
          </span>
        </v-btn>
        </template>

        <SelectBoard @close-dialog="closeDialog" @selected-board="fetchIssues">
        </SelectBoard>
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
        <br>
        <div style="margin-right: 30px">

        <v-row
          cols="12"
          justify="end"
        >
        
          <v-col 
            cols="7"
            style="color: #000"
            >
            <Board :cards="cards" @remove="removeCard"/>
          </v-col>

          <v-col 
            cols="3"
            style="color: #000"
            >
            <div>

              <Issues @add-to-canvas="addToCanvas" :key="this.issueKey"/>
            </div>
          </v-col>
        </v-row>
        </div>
    </v-main>
  </v-app>
</template>

<script>
import SelectBoard from './components/SelectBoard';
import LinkToTrello from './components/LinkToTrello';
import Issues from './components/Issues';
import Board from './components/Board.vue';

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
      selectBoardVisible: false,
      cards: [],
      issueKey: 0
    }
  },

  components: {
    SelectBoard,
    LinkToTrello,
    Issues,
    Board,
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
    },
    closeDialog(){
      console.log('close dialog');
      this.selectBoardVisible = false;
    },
    addToCanvas(card){
      this.cards.push(card);
    },
    removeCard(card_id){
      this.cards = this.cards.filter(card => card.id != card_id);
    },
    fetchIssues(){
      this.issueKey+=1;
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
  }
};
</script>
