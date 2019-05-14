import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const hallSeat = {
  state: {
    x: 8, y: 6
  },
  mutations: {
    changeX (state, x) {
      state.x = x
    },
    changeY (state, y) {
      state.y = y
    }
  },
  actions: { },
  getters: { }
}
export default new Vuex.Store({
  modules: {
    hallSeat
  }
})
