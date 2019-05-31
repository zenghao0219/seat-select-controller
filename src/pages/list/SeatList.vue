<template>
  <el-container>
    <el-aside>
      <div class="scroll" ref="contentScroll">
        <el-menu default-active="/" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>模版管理</span>
            </template>
            <el-menu-item-group title="查看">
              <el-menu-item index="/">模版列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="编辑">
              <el-menu-item index="hallSeat">新增模版</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>模版列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="back">
        <el-button icon="el-icon-full-screen" circle @click="handleFullScreen"></el-button>
         <el-button
                size="small"
                type="danger"
                @click="handleMultipleDelete()">删除选中</el-button>
      </div>
      </el-header>

      <el-main>
        <el-table
        @selection-change="handleSelectionChange"
        :data="tableData" :stripe="true" height="100%">
          <el-table-column
            fixed
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            fixed
            label="创建日期"
            width="180">
             <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="模版名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p  style="margin-bottom:10px">姓名: {{ scope.row.name }}</p>
                <p>价格: ¥{{ scope.row.price }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="seatNum"
            label="价格"
            width="250">
            <template slot-scope="scope">
              <i class="el-icon-money"></i>
              <span style="margin-left: 10px">¥{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapState({
      fullscreen: state => state.config.fullscreen
    })
  },
  methods: {
    ...mapMutations([
      'makeFullscreen'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getTempleteList () {
      this.$post(this.interfaceURL + 'findTempleteList ').then((response) => {
        console.log(response)
        this.tableData = response.data
      }, err => {
        this.$notify.error({
          title: '警告',
          message: err.message,
          duration: 2000
        })
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push({ name: 'hallSeat',
        params: { templeteId: row.id }
      })
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$post(this.interfaceURL + 'deleteTemplete', { 'idList': [row.id] }).then((response) => {
        console.log(response)
        if (response.errCode === 0) {
          this.tableData.splice(index, 1)
        } else {
          this.$notify.error({
            title: '警告',
            message: '系统内部错误',
            duration: 2000
          })
        }
      }, err => {
        this.$notify.error({
          title: '警告',
          message: err.message,
          duration: 2000
        })
      })
    },
    handleMultipleDelete () {
      let idList = this.multipleSelection.map((el) => (el.id))
      if (idList.length > 0) {
        this.$post(this.interfaceURL + 'deleteTemplete', { 'idList': idList }).then((response) => {
          console.log(response)
          if (response.errCode === 0) {
            this.$router.go(0)
          } else {
            this.$notify.error({
              title: '警告',
              message: '系统内部错误',
              duration: 2000
            })
          }
        }, err => {
          this.$notify.error({
            title: '警告',
            message: err.message,
            duration: 2000
          })
        })
      } else {
        this.$notify({
          title: '警告',
          message: '请至少选择一个模版',
          type: 'warning',
          duration: 2000
        })
      }
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
  mounted () {
    var templeteName = this.$route.params.templeteName
    if (templeteName !== undefined) {
      this.$notify({
        title: '成功',
        message: '模版名称为: `' + templeteName + '` 已经保存',
        type: 'success',
        duration: 2000
      })
    }
    this.getTempleteList()
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
  .el-header
    height:20vh;
    background-color: #E9EEF3;
    display flex
    align-items center
    justify-content space-between
  .el-main
    height 80vh;
    background-color: #E9EEF3;
    text-align: center;
    padding 0;
    .name-wrapper
      display inline-block
  .scroll
    overflow: hidden
    position relative
    height 100vh
    border-right :solid 1px #e6e6e6
    .el-aside
      height 100vh
    .el-menu
      border none
</style>
