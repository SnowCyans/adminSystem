<template>
  <span @click="handleClick">
    <svg-icon
      icon-class="fullscreen"
      style="color: #fff; fot-size: 18px; margin-right: 15px"
    ></svg-icon>
  </span>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    // 全屏和退出全屏
    async handleClick () {
      if (document.fullscreenElement) { // 判断是否再全屏中
        await document.exitFullscreen() // 退出全屏
      } else {
        await document.documentElement.requestFullscreen() // 进入全屏
      }
    }
  }
}
</script>

<style scoped>
</style>
