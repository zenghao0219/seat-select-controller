<template>
<div class="pages"
  @mousedown.stop.prevent.left="start($event)"
  @mousemove.stop.prevent.left="drag($event)"
  @mouseup.stop.prevent.left="end($event)"
  @mouseleave.stop.prevent.left="end($event)">
  <div class="seatSelectArea" ref="seatSelectArea">
      <div class="seatArea" :style="{width:seatAreaWidth+'px',height:seatAreaHeight+ 'px'}">
        <template v-for="seatItem in seatList">
          <div ref="seatItem" :x="seatItem.x" :y="seatItem.y" class="seatItem" :key="'x'+seatItem.x+'y'+seatItem.y"
          :style="{width:seatItemWidth+'px',height:seatItemWidth+'px',
          transform: 'translate3d(' + seatItem.translateX  + 'px,'+ seatItem.translateY + 'px,0px)',
          background:seatItem.background}">

          </div>
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
      selectSeatList: [],
      unSelectBack: '#C6E2FF',
      selectBack: '#409EFF'
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
      let seatSelectAreaWidth = that.$refs.seatSelectArea.offsetWidth
      let seatSelectAreaHeight = that.$refs.seatSelectArea.offsetHeight
      let seatAreaWidth = 50 * that.x - that.shifting
      let seatAreaHeight = 50 * that.y - that.shifting
      if (seatAreaWidth > seatSelectAreaWidth) {
        seatScaleX = seatSelectAreaWidth / seatAreaWidth
      }
      if (seatAreaHeight > seatSelectAreaHeight) {
        seatScaleY = seatSelectAreaHeight / seatAreaHeight
      }
      if (seatScaleX < 1 || seatScaleY < 1) {
        seatScale = seatScaleX < seatScaleY ? seatScaleX : seatScaleY
      }
      that.seatItemWidth = 40 * seatScale
      that.shifting = 10 * seatScale
      that.seatList = []
      for (let x = 1; x <= that.x; x++) {
        for (let y = 1; y <= that.y; y++) {
          var data = {
            x: x,
            y: y,
            translateX: that.translateValue * (x - 1),
            translateY: that.translateValue * (y - 1),
            background: this.unSelectBack
          }
          that.seatList.push(data)
        }
      }
      this.$nextTick(() => {
        if ('seatItem' in that.$refs) {
          for (const item of that.$refs.seatItem) {
            let clientRect = item.getBoundingClientRect()
            let index = that.seatList.findIndex((el) => (el.x === parseInt(item.attributes.x.value) && el.y === parseInt(item.attributes.y.value)))
            let newObject = Object.assign({}, that.seatList[index], {
              top: clientRect.top,
              bottom: clientRect.bottom,
              left: clientRect.left,
              right: clientRect.right
            })
            this.$set(that.seatList, index, newObject)
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
      if (this.showDrag) {
        // 首先求出 `元素左上角` 与 `选框左上角` 在X方向较大值与Y方向较大值的交点，记为M点
        // 然后求出 `元素右下角` 与` 选框右下角` 在X方向较小值与Y方向较小值的交点，记为N点。
        // 如果M点的X坐标和Y坐标值均比N点相应的X坐标和Y坐标值小，亦即M和N可以分别构成一个矩形的左上角点和右上角点，则两矩形相交；其余情况则不相交。
        let that = this
        let seatList = that.seatList
        let dragX0 = that.left
        let dragY0 = that.top
        let dragX1 = that.left + that.width
        let dragY1 = that.top + that.height
        that.selectSeatList = []
        for (const index in seatList) {
          let mX = Math.max(dragX0, seatList[index].left)
          let mY = Math.max(dragY0, seatList[index].top)
          let nX = Math.min(dragX1, seatList[index].right)
          let nY = Math.min(dragY1, seatList[index].bottom)
          if (mX < nX && mY < nY) {
            this.$set(that.seatList[index], 'background', that.selectBack)
            let temp = { ...seatList[index] }
            that.selectSeatList.push(temp)
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
      color white;
      line-height 40px;
      border-radius:5px;
      user-select:none;
</style>
