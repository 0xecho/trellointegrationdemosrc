import Vue from 'vue'
import App from './App.vue'
import { DraggablePlugin, DraggableDirective } from '@braks/revue-draggable'

Vue.config.productionTip = false

Vue.directive('draggable', DraggableDirective)
Vue.component('Draggable', DraggablePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
