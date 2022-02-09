<template>
  <div id="mainBoard">
    <template v-for="(card, index) in cards">
      <Card :card="card" :index="index" :key="card.id" @remove="remove"/>
    </template>
  </div>
</template>

<script>
import Card from './Card.vue'
export default {
  name: 'Board',
  components: {
    Card
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
  },
  methods: {
    remove(card_id){
      this.$emit("remove", card_id);      
    }
  }
}
</script>

<style>
#mainBoard {
  border: 1px solid #000;
  height: 600px;
}
</style>