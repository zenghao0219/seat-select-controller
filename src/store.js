import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const hallSeat = {
  state: {
    x: 0, y: 0, templeteName: null, templetePrice: null, confirmButtonLoading: false, reset: false
  },
  mutations: {
    changeX (state, x) {
      state.x = x
    },
    changeY (state, y) {
      state.y = y
    },
    changeTempleteName (state, templeteName) {
      state.templeteName = templeteName
    },
    changeTempletePrice (state, templetePrice) {
      state.templetePrice = templetePrice
    },
    changeConfirmButtonLoading (state, confirmButtonLoading) {
      state.confirmButtonLoading = confirmButtonLoading
    },
    changeReset (state, reset) {
      state.reset = reset
    }
  },
  actions: {
    clearHallSeat ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('changeX', 0)
          commit('changeY', 0)
          commit('changeTempleteName', null)
          commit('changeTempletePrice', null)
          commit('changeConfirmButtonLoading', false)
          commit('changeReset', false)
          resolve()
        }, 16)
      })
    }
  },
  getters: { }
}
const config = {
  state: {
    fullscreen: false
  },
  mutations: {
    makeFullscreen (state, fullscreen) {
      state.fullscreen = fullscreen
    }
  }
}
export default new Vuex.Store({
  modules: {
    hallSeat,
    config
  }
})
