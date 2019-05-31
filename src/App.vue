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
    window.onresize = () => {
      return (() => {
        if (this.fullscreen) {
          this.makeFullscreen(false)
        }
      })()
    }
  }
}

</script>
<style>
  *{margin: 0;padding: 0}
</style>
