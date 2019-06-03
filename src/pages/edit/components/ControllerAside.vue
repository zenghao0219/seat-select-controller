<template>
  <div class="pages" ref="contentScroll">
    <div class="scroll">
      <el-timeline>
        <el-timeline-item timestamp="第一步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <div slot="header">
                <span>编辑坐标系</span>
            </div>
            <el-form label-position="left" label-width="60px">
              <el-form-item label="Y坐标">
                <el-slider v-model="y" :max="max" :marks="marks" @change="handleChangeY"></el-slider>
              </el-form-item>
              <el-form-item label="X坐标">
                <el-slider v-model="x" :max="max" :marks="marks" @change="handleChangeX"></el-slider>
              </el-form-item>
            </el-form>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="第二步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <div slot="header">
                <span>
                选择座位区域(框选或点选)
                </span>
            </div>
             <el-row>
              <el-col :span="24">
                 <div class="seatButton" @click="markSeats('clear')">
                  <p class="seatText">撤销选中</p>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="第三步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <div slot="header">
                <span>选择座位类型</span>
            </div>
            <el-row>
              <el-col :span="11">
                <div class="seatButton" @click="markSeats('normal')">普通座位<img class="seat-demo" src="../../../assets/images/0-0-1.png"/></div>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="11">
                <div  class="seatButton" @click="markSeats('love')">情侣座位<img class="seat-demo" src="../../../assets/images/5-0-3.png"/></div>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col :span="11">
                <div class="seatButton" @click="markSeats('road')">
                  <p class="seatText">过道</p>
                </div>
              </el-col>
              <el-col :span="2">
                &nbsp;
              </el-col>
              <el-col :span="11">

              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="第四步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <div slot="header">
                  <span>填写要保存模版名称</span>
            </div>
            <el-row>
              <el-col :span="24">
                 <el-input
                    type="text"
                    placeholder="请输入模版名称"
                    v-model="templeteName"
                    clearable
                    maxlength="10"
                    show-word-limit
                    @change="handleChangeTempleteName"
                  >
                  </el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="第五步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <div slot="header">
                  <span>填写价格 单位:元</span>
            </div>
            <el-row>
              <el-col :span="24">
                 <el-input
                    type="number"
                    placeholder="请输入价格"
                    v-model="templetePrice"
                    prefix-icon="el-icon-money"
                    max="99999"
                    clearable
                    @change="handleChangeTempletePrice"
                  >
                  </el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="第六步" placement="top" size= 'large' color="#C6E2FF">
          <el-card>
            <el-row>
              <el-col :span="12">
                <el-popover
                  placement="top"
                  width="160"
                  v-model="visible">
                  <p>确认清空所有的座位吗？(已编辑的座位也会清除)</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="clearSeat()">确定</el-button>
                  </div>
                  <el-button slot="reference" size="small" round type="danger">重置座位</el-button>
                </el-popover>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="top"
                  width="160"
                  v-model="visible2">
                  <p>确认不再修改吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="confirm()">确定</el-button>
                  </div>
                  <el-button :loading="confirmButtonLoading" slot="reference" size="small" round type="primary">确认完成</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'ControllerAside',
  components: {},
  props: ['prop_x', 'prop_y', 'prop_templeteName', 'prop_templetePrice'],
  data () {
    return {
      max: 35,
      x: 0,
      y: 0,
      marks: {
        10: '10',
        20: '20',
        30: {
          style: {
            color: '#1989FA'
          },
          label: this.$createElement('strong', '30')
        }
      },
      visible: false,
      visible2: false,
      templeteName: null,
      templetePrice: null
    }
  },
  watch: {
    prop_x (value) {
      this.x = value
    },
    prop_y (value) {
      this.y = value
    },
    prop_templeteName (value) {
      this.templeteName = value
    },
    prop_templetePrice (value) {
      this.templetePrice = value
    }
  },
  computed: {
    ...mapState({
      confirmButtonLoading: state => state.hallSeat.confirmButtonLoading
    })
  },
  methods: {
    ...mapMutations([
      'changeX',
      'changeY',
      'changeTempleteName',
      'changeTempletePrice',
      'changeConfirmButtonLoading',
      'changeReset']),
    handleChangeX () {
      this.changeX(this.x)
      this.changeReset(true)
    },
    handleChangeY () {
      this.changeY(this.y)
      this.changeReset(true)
    },
    handleChangeTempleteName () {
      this.changeTempleteName(this.templeteName)
    },
    handleChangeTempletePrice () {
      this.changeTempletePrice(this.templetePrice)
    },
    markSeats (e) {
      this.$emit('markSeats', e)
    },
    clearSeat () {
      this.changeReset(true)
      this.visible = false
      this.$emit('clearSeat')
    },
    confirm () {
      this.visible2 = false
      this.changeConfirmButtonLoading(true)
      this.$emit('confirm')
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.contentScroll, {
          scrollbar: {
            fade: true,
            interactive: false
          },
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          },
          scroll: true,
          click: true }
        )
      } else {
        this.scroll.refresh()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
.pages
  box-sizing: border-box;
  padding: 30px 20px;
  overflow: hidden
  position relative
  height 100vh
  .scroll
    padding-top 15px
    .seat-demo
      width 20px
      height 20px
      vertical-align -65%
    .seatButton
      display flex
      align-items center
      justify-content space-between
      padding 6px 8px
      color #409EFF
      font-size 12px
      background #ecf5ff
      border 1px #b3d8ff solid
      border-radius 5px
      cursor pointer
      .seatText
        text-align:center
        width:100%
</style>
