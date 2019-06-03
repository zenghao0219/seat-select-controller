<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {

  },
  computed: {
    ...mapState({
      fullscreen: state => state.config.fullscreen
    })
  },
  methods: {
    ...mapMutations([
      'makeFullscreen'
    ])
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        console.log(document.fullscreenElement === null)
        if (document.fullscreenElement === null) {
          that.makeFullscreen(false)
        }
      })()
    }
  }
}

</script>
<style>
  *{margin: 0;padding: 0}
</style>
