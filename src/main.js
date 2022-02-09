import Vue from 'vue'
import App from './App.vue'
import TrelloCallback from './TrelloCallback.vue'
import { DraggablePlugin, DraggableDirective } from '@braks/revue-draggable'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.directive('draggable', DraggableDirective)
Vue.component('Draggable', DraggablePlugin)

new Vue({
  vuetify,
  computed: {
    ActiveView () {
      console.log(window.location.pathname);
      return window.location.pathname == '/trello-callback' ? TrelloCallback : App;
    }
  },
  render(h) {
    return h(this.ActiveView)
  }
}).$mount('#app')
