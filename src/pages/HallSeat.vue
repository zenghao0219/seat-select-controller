<template>
    <el-container>
      <el-aside>
        <controller-aside @markSeats="markSeats" @clearSeat="clearSeat" @confirm="confirm"/>
      </el-aside>
      <el-main>
        <coordinate-system ref="coordinateSystem"/>
      </el-main>
    </el-container>
</template>

<script>
import ControllerAside from './components/ControllerAside'
import CoordinateSystem from './components/CoordinateSystem'
export default {
  name: 'hallSeat',
  components: {
    ControllerAside,
    CoordinateSystem
  },
  props: {},
  data () {
    return {

    }
  },
  watch: {},
  computed: {},
  methods: {
    markSeats (e) {
      this.$refs.coordinateSystem.markSeats(e)
    },
    clearSeat () {
      this.$refs.coordinateSystem.clearSeat()
    },
    confirm () {
      this.$refs.coordinateSystem.confirm()
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.el-container
  color rgba(0,0,0,0.4)
  .el-main
    background-color: #E9EEF3;
    text-align: center;
    padding 0;
  .el-aside
    height 100vh;
    text-align: center;
</style>
