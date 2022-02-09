import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedBoard: "",
    selectedOrganization: "",
  },
  mutations: {
    setSelectedBoard(state, board) {
      state.selectedBoard = board
    },
    setSelectedOrganization(state, organization) {
      state.selectedOrganization = organization
    },
    setOrganizations(state, organizations) {
      state.organizations = organizations
    },
    setBoards(state, boards) {
      state.boards = boards
    }
  },
  actions: {
    selectBoard({ commit }, { board, organization }) {
      commit('setSelectedBoard', board)
      commit('setSelectedOrganization', organization)
    },
  },
  modules: {
  }
})
