import Vue from 'vue'
import Router from 'vue-router'
import HallSeat from '@/pages/edit/HallSeat'
import SeatList from '@/pages/list/SeatList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'seatList',
      component: SeatList
    },
    {
      path: '/hallSeat',
      name: 'hallSeat',
      component: HallSeat,
      beforeRouteLeave: (to, from, next) => {
        console.log('hello')
        next(false)
      }
    }
  ]
})
