<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" style="min-height: 620px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="second">用户管理</el-tab-pane>
        </el-tabs>

        <!-- 用了一个行列布局 -->
        <TreeItem
          :node="titleObj"
          @delDepartment="getDepartmentsList"
        ></TreeItem>
        <el-tree :data="data" default-expand-all>
          <template v-slot="scope">
            <TreeItem
              :node="scope.node"
              @delDepartment="getDepartmentsList"
            ></TreeItem>
          </template>
        </el-tree>
      </el-card>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { getDepartmentsList } from '@/api/departments'
import TreeItem from './components/TreeItem.vue'
export default {
  filters: {},
  components: { TreeItem },
  data () {
    return {
      activeName: 'second',
      data: [],
      titleObj: {},
      loading: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentsList()
  },
  methods: {
    async getDepartmentsList () {
      const res = await getDepartmentsList()
      console.log(res)
      function fn (list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = fn(list, item.id)
          }
        })
        return list1
      }
      this.data = fn(res.depts, '')
      this.titleObj = res.depts[0]
      this.loading = false
    }
  }
}
// depts
</script>

<style scoped lang='scss'>
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 18px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
