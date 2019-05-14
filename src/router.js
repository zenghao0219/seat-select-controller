import Vue from 'vue'
import Router from 'vue-router'
import HallSeat from '@/pages/HallSeat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hallSeat',
      component: HallSeat
    }
  ]
})
