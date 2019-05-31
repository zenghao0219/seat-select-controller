<template>
  <div class="drag" :style="style">

  </div>
</template>

<script>
export default {
  name: 'DragDiv',
  props: {
    left: Number,
    top: Number,
    width: Number,
    height: Number
  },
  data () {
    return {
      style: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        position: 'absolute',
        border: '3px dashed #409EFF',
        zIndex: 1000,
        opacity: 0.6
      }
    }
  },
  watch: {
    left: function (newVal) {
      Object.assign(this.style, {
        left: newVal + 'px'
      })
    },
    top: function (newVal) {
      Object.assign(this.style, {
        top: newVal + 'px'
      })
    },
    width: function (newVal) {
      Object.assign(this.style, {
        width: newVal + 'px'
      })
    },
    height: function (newVal) {
      Object.assign(this.style, {
        height: newVal + 'px'
      })
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
