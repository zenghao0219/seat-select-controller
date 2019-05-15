<template>
<div class="pages"
  @mousedown.stop.prevent.left="start($event)"
  @mousemove.stop.prevent.left="drag($event)"
  @mouseup.stop.prevent.left="end($event)"
  @mouseleave.stop.prevent.left="end($event)">
  <div class="seatSelectArea" ref="seatSelectArea">
      <div class="seatArea" :style="{width:seatAreaWidth+'px',height:seatAreaHeight+ 'px'}">
        <template v-for="xItem in x">
          <template v-for="yItem in y">
            <div ref="seatItem" :x="xItem" :y="yItem" class="seatItem" :key="'x'+xItem+'y'+yItem"
            :style="{width:seatItemWidth+'px',height:seatItemWidth+'px',transform: 'translate3d(' + translateValue * (xItem-1)  + 'px,'+ translateValue * (yItem-1)+'px,0px)'}">

            </div>
          </template>
        </template>
      </div>
  </div>
  <drag-div :left="left" :top="top" :width="width" :height="height" v-show="showDrag"></drag-div>
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
      seatItemWidth: 40,
      shifting: 10, // 偏移值
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      showDrag: false,
      seatList: [],
      timer: null
    }
  },
  watch: {
    x () {
      this.refreshDom()
    },
    y () {
      this.refreshDom()
    }
  },
  computed: {
    ...mapState({
      x: state => state.hallSeat.x,
      y: state => state.hallSeat.y
    }),
    seatAreaWidth () {
      return (this.seatItemWidth + this.shifting) * this.x - this.shifting
    },
    seatAreaHeight () {
      return (this.seatItemWidth + this.shifting) * this.y - this.shifting
    },
    translateValue () {
      return this.seatItemWidth + this.shifting
    }
  },
  methods: {
    refreshDom () {
      let that = this
      let seatScale = 1
      let seatScaleX = 1
      let seatScaleY = 1
      let seatSelectAreaWidth = this.$refs.seatSelectArea.offsetWidth
      let seatSelectAreaHeight = this.$refs.seatSelectArea.offsetHeight
      let seatAreaWidth = 50 * this.x - this.shifting
      let seatAreaHeight = 50 * this.y - this.shifting
      if (seatAreaWidth > seatSelectAreaWidth) {
        seatScaleX = seatSelectAreaWidth / seatAreaWidth
      }
      if (seatAreaHeight > seatSelectAreaHeight) {
        seatScaleY = seatSelectAreaHeight / seatAreaHeight
      }
      if (seatScaleX < 1 || seatScaleY < 1) {
        seatScale = seatScaleX < seatScaleY ? seatScaleX : seatScaleY
      }
      this.seatItemWidth = 40 * seatScale
      this.shifting = 10 * seatScale
      this.$nextTick(() => {
        if ('seatItem' in that.$refs) {
          this.seatList = []
          for (const item of that.$refs.seatItem) {
            let clientRect = item.getBoundingClientRect()
            var data = {
              x: item.attributes.x.value,
              y: item.attributes.y.value,
              top: clientRect.top,
              bottom: clientRect.bottom,
              left: clientRect.left,
              right: clientRect.right
            }
            this.seatList.push(data)
          }
        }
      })
    },
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
      // if (e.buttons !== 1 || e.which !== 1) return
      // console.log(e.clientX, e.clientY)
      let x = e.clientX
      let y = e.clientY
      that.left = x
      that.top = y
      that.startX = x
      that.startY = y
      that.showDrag = true
    },
    drag (e) {
      let that = this
      if (that.showDrag) {
        let x = e.clientX
        let y = e.clientY
        that.left = Math.min(x, that.startX)
        that.top = Math.min(y, that.startY)
        that.width = Math.abs(x - that.startX)
        that.height = Math.abs(y - that.startY)
      }
    },
    end () {
      let that = this
      let seatList = that.seatList
      for (const iterator of seatList) {
        if (
          iterator.right > that.left &&
          iterator.left < that.left + that.width
        ) {

        }
      }
      that.left = 0
      that.top = 0
      that.width = 0
      that.height = 0
      that.startX = 0
      that.startY = 0
      that.showDrag = false
    }
  },
  created () {},
  mounted () {
  },
  updated () {

  }
}
</script>
<style lang="stylus" scoped>
.pages
  width 100%
  height 100vh;
  padding 50px;
  box-sizing border-box;
  .seatSelectArea
    width 100%
    height 100%;
    position relative;
  .seatArea
    display flex
    flex-wrap: wrap;
    margin 0 auto;
    .seatItem
      position absolute;
      background #C6E2FF;
      color white;
      line-height 40px;
      border-radius:5px;
      user-select:none;
</style>
