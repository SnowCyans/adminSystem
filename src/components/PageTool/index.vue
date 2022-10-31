<template>
  <div>
    <el-card>
      <el-row type="flex" justify="space-between">
        <el-col>
          <el-alert
            v-if="title.length > 0"
            type="info"
            show-icon
            :closable="false"
          >
            {{ title }}</el-alert
          >
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <slot name="right"></slot>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'VueAdminTemplateIndex',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.el-alert {
  display: inline;
  width: unset;
  ::v-deep .el-icon-info {
    font-size: 14px;
    text-align: center;
  }
}
.el-alert__content {
  padding: 0;
}
</style>
