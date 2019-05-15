import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const hallSeat = {
  state: {
    x: 0, y: 0
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
