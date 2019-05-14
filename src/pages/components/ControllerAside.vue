<template>
  <div class="pages">
    <el-row class="_slider" type="flex" align="middle" justify="space-between">
      <el-col :span="6" class="tag">Y坐标</el-col>
      <el-col :span="14" :offset="2">
        <el-slider v-model="y" :max="max" :marks="marks" @change="handleChangeY"></el-slider>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row class="_slider" type="flex" align="middle" justify="space-between">
      <el-col :span="6" class="tag">X坐标</el-col>
      <el-col :span="14" :offset="2">
        <el-slider v-model="x" :max="max" :marks="marks" @change="handleChangeX"></el-slider>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row class="choose_seat_type" type="flex" align="middle" justify="space-between">
      <el-col :span="6" class="tag">添加座位</el-col>
      <el-col :span="12" :offset="2">
        <el-radio v-model="chooseSeat" label="1" border>
          普通座位
        </el-radio>
      </el-col>
      <el-col :span="4"><img class="seat-demo" src="../../assets/images/0-0-1.png"/></el-col>
    </el-row>
    <el-row class="choose_seat_type" type="flex" align="middle" justify="space-between">
      <el-col :span="6"></el-col>
      <el-col :span="12" :offset="2">
        <el-radio v-model="chooseSeat" label="2" border>情侣座位</el-radio>
      </el-col>
      <el-col :span="4"><img class="seat-demo" src="../../assets/images/5-0-3.png"/></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ControllerAside',
  components: {},
  props: {},
  data () {
    return {
      max: 30,
      x: 0,
      y: 0,
      marks: {
        0: '0',
        10: '10',
        20: '20',
        30: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '30')
        }
      },
      chooseSeat: '1'
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(['changeX', 'changeY']),
    handleChangeX () {
      this.changeX(this.x)
    },
    handleChangeY () {
      this.changeY(this.y)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.tag
  text-align: left;

._slider
  box-sizing: border-box;
  padding: 30px 10px;

.choose_seat_type
  padding: 10px 10px;

.seat-demo
  width 30px;
  height 30px;
</style>
