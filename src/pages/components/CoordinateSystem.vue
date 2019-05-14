<template>
  <div class="pages" ref="pages" @mousedown.stop.prevent.left="start($event)" @mousemove.stop.prevent.left="drag($event)">
      <div class="seatArea" :style="{width:seatAreaWidth+'px',height:seatAreaHeight+ 'px'}">
        <template v-for="xItem in x">
          <template v-for="yItem in y">
            <div class="seatItem" :key="'x'+xItem+'y'+yItem" :style="{transform: 'translate3d(' + 50 * (xItem-1)  + 'px,'+50 * (yItem-1)+'px,0px)'}">
              {{xItem}},{{yItem}}
            </div>
          </template>
        </template>
      </div>
      <drag-div :left="left" :top="top"></drag-div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DragDiv from './DragDiv'
export default {
  name: 'CoordinateSystem',
  components: {
    DragDiv
  },
  props: {},
  data () {
    return {
      shifting: 10, // 偏移值
      left: 0,
      top: 0
    }
  },
  watch: {

  },
  computed: {
    ...mapState({
      x: state => state.hallSeat.x,
      y: state => state.hallSeat.y
    }),
    seatAreaWidth () {
      let seatItemWidth = 40
      return (seatItemWidth + this.shifting) * this.x - this.shifting
    },
    seatAreaHeight () {
      let seatItemHeight = 40
      return (seatItemHeight + this.shifting) * this.y - this.shifting
    }
  },
  methods: {
    start (e) {
      let that = this
      // // 阻止事件冒泡
      // if (e.stopPropagation) {
      //   e.stopPropagation()
      // } else {
      //   e.cancelBubble = true
      // }
      // if (e.preventDefault) {
      //   e.preventDefault()
      // } else {
      //   e.returnValue = false
      // }
      // 判断是否为鼠标左键被按下
      if (e.buttons !== 1 || e.which !== 1) return
      let x = e.clientX
      let y = e.clientY
      that.left = x
      that.top = y
      console.log(e, x, y)
    },
    drag (e) {

    }
  },
  created () {},
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
.pages
  width 100%
  height 100%
  .seatArea
    display flex
    flex-wrap: wrap;
    margin  0 auto;
    .seatItem
      position absolute;
      background #C6E2FF;
      color white;
      width 40px;
      line-height 40px;
      height 40px;
      border-radius:5px;
      user-select:none;
</style>
