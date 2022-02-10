<template>
    <div>

        <Draggable>
            <!-- a card, on click show menu, with button create issue -->
            <v-card elevation="2" flat tile color="#fffee8" class="card" @contextmenu="showMenu" :ripple="false">
                <v-card-text>
                <v-icon>mdi-card-text-outline</v-icon>
                {{ card.name }}
                </v-card-text>
                <v-menu
                    transition="scale-transition"
                    v-model="isMenuVisible"
                    :position-x="positionX"
                    :position-y="positionY"
                    absolute
                    >
                    <v-list>
                        <v-list-item @click.stop="selectList" v-if="!card.isOnTrello">
                            <v-list-item-title>
                                <v-icon>mdi-plus</v-icon>
                                Create Issue on Trello
                            </v-list-item-title>
                        </v-list-item>
                        <!-- view on trello -->
                        <v-list-item @click="viewOnTrello" v-if="card.isOnTrello">
                            <v-list-item-title>
                                <v-icon>mdi-eye</v-icon>
                                View on Trello
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="remove">
                            <v-list-item-title>
                                <v-icon>mdi-minus</v-icon>
                                Remove
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>

                </v-menu>
            </v-card>

        </Draggable>

      <v-dialog
        v-model="isDialogVisible"
        max-width="500px"
        >
        <v-form
          v-model="addToTrelloFormValid"
          >
        <v-card>
          <v-card-title>
            <span class="headline">Create Issue on Trello</span>
          </v-card-title>

          <v-card-text>
            <v-select
              v-model="selectedList"
              :items="lists"
              item-text="name"
              item-value="id"
              label="List"
              :rules="selectedListRules"
              required
              >
            </v-select>
          </v-card-text>
          
          <v-card-text>
            <v-text-field
              label="Issue Name"
              v-model="card.name"
              :rules="newCardNameRules"
              required
            >
            </v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="blue darken-1"
              text
              @click="isDialogVisible = false"
            >
              Cancel
            </v-btn>

            <v-btn
              color="blue darken-1"
              text
              :disabled="!addToTrelloFormValid"
              @click="createCard"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>

    
    </div>
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
  data(){
    return {
      isMenuVisible: false,
      isDialogVisible: false,
      positionX: 0,
      positionY: 0,
      lists: [],
      addToTrelloFormValid: false,
      selectedList: null,
      selectedListRules: [
        v => !!v || "List is required",
      ],
      newCardNameRules: [
        v => !!v || "Card Name is required",
      ],
    }
  },
  methods: {
    createCard() {
      let userId = localStorage.getItem("userId");
      let sketchId = localStorage.getItem("sketchId");
      fetch('https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/issue?userId=' + userId + '&sketchId=' + sketchId, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              listId: this.selectedList,
              name : this.card.name,
          })
        }).then(response => response.json())
        .then(data => {
          console.log(data);
        }).catch(function(err) {
          console.log(err);
        });
    },
    remove(){
        this.$emit('remove', this.card.id);
    },
    showMenu(e) {
        e.preventDefault();
        this.isMenuVisible = false
        this.positionX = e.pageX
        this.positionY = e.pageY
        this.$nextTick(()=>{
            this.isMenuVisible = true
        })
    },
    viewOnTrello(){
        window.open(this.card.url, '_blank');
    },
    fetchLists(){
      let userId = localStorage.getItem('userId')
      let sketchId = localStorage.getItem('sketchId')
      fetch("https://portal.fl0.com/api/invision /DEV/Trello Integration/flows/lists?userId=" + userId + "&sketchId=" + sketchId)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          try {
            if (data.status == "failed") {
              console.log("failed");
            } else {
              this.lists = data;
            }
          } catch (e) {
            this.lists = data;
          }
        })
    },
    selectList(){
      this.isDialogVisible = true;
    }
  },
  mounted() {
    console.log(this.card);
    this.fetchLists();
  },
};
</script>

<style>
.card {
  width: 200px;
}
</style>