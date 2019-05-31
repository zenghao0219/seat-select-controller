<template>
    <el-container>
      <div class="back">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <el-button icon="el-icon-full-screen" circle @click="handleFullScreen"></el-button>
      </div>
      <el-aside>
        <controller-aside @markSeats="markSeats" @clearSeat="clearSeat" @confirm="confirm"/>
      </el-aside>
      <el-main>
        <coordinate-system ref="coordinateSystem"
        :prop_x="x"
        :prop_y="y"
        :prop_templeteName="templeteName"
        :prop_templetePrice="templetePrice"/>
      </el-main>
    </el-container>
</template>

<script>
import ControllerAside from './components/ControllerAside'
import CoordinateSystem from './components/CoordinateSystem'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'HallSeat',
  components: {
    ControllerAside,
    CoordinateSystem
  },
  props: {},
  data () {
    return {
      seatList: []
    }
  },
  watch: {},
  computed: {
    ...mapState({
      fullscreen: state => state.config.fullscreen,
      x: state => state.hallSeat.x,
      y: state => state.hallSeat.y,
      templeteName: state => state.hallSeat.templeteName,
      templetePrice: state => state.hallSeat.templetePrice
    }),
    // 取最大横坐标
    xMax: function () {
      let i = 0
      for (let index in this.seatList) {
        if (this.seatList[index].x > i) {
          i = this.seatList[index].x
        }
      }
      return i
    },
    // 取最大纵坐标
    yMax: function () {
      let i = 0
      for (let index in this.seatList) {
        if (this.seatList[index].y > i) {
          i = this.seatList[index].y
        }
      }
      return i
    }
  },
  methods: {
    ...mapMutations([
      'makeFullscreen'
    ]),
    ...mapMutations([
      'changeX',
      'changeY',
      'changeTempleteName',
      'changeTempletePrice']),
    ...mapActions([
      'clearHallSeat'
    ]),
    getSeatList (templeteId) {
      this.$get(this.interfaceURL + 'findSeatListByTempleteId', { 'id': templeteId }).then((response) => {
        console.log(response)
        this.seatList = response.data.seats
        this.changeTempleteName(response.data.templeteName)
        this.changeTempletePrice(response.data.templetePrice)
        this.changeX(this.xMax)
        this.changeY(this.yMax)
      }, err => {
        this.$notify.error({
          title: '警告',
          message: err.message,
          duration: 2000
        })
      })
    },
    markSeats (e) {
      this.$refs.coordinateSystem.markSeats(e)
    },
    clearSeat () {
      this.$refs.coordinateSystem.clearSeat()
    },
    confirm () {
      this.$refs.coordinateSystem.confirm()
    },
    back () {
      this.$router.replace({ name: 'seatList' })
    },
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
        this.$message({
          showClose: true,
          message: '已退出全屏模式',
          type: 'success'
        })
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
        this.$message({
          showClose: true,
          message: '已进入全屏幕模式,如需退出请按ESC按键或再次点击',
          type: 'success'
        })
      }
      this.makeFullscreen(!this.fullscreen)
    }
  },
  created () {},
  mounted () {
    var templeteId = this.$route.params.templeteId
    if (templeteId !== undefined) {
      this.getSeatList(templeteId)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.clearHallSeat().then(() => {
      next()
    })
  }
}
</script>
<style lang="stylus" scoped>
.el-container
  color rgba(0,0,0,0.4)
  .back
    position absolute
    left 320px
    top 20px
  .el-main
    background-color: #E9EEF3;
    text-align: center;
    padding 0;
  .el-aside
    height 100vh;
    text-align: center;
</style>
