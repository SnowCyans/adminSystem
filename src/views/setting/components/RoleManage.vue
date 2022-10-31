<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="
        roleDialogVisible = true;
        isEdit = false;
        form = {};
      "
      >新增角色</el-button
    >
    <el-table :data="roleList" border="">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column label="角色名" width="350">
        <template slot-scope="scope" sortable>
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>

      <el-table-column label="描述" width="500">
        <template slot-scope="scope" sortable>
          <p>{{ scope.row.description }}</p>
        </template>
      </el-table-column>
      <el-table-column v-slot="scope" label="操作" width="400px">
        <el-button type="text" @click="showRightDialog(scope.row.id)"
          >分配权限</el-button
        >
        <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
        <el-button type="text" @click="del(scope.row.id)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="paramsObj.page"
        :page-size="paramsObj.pagesize"
        :page-sizes="[2, 3, 4, 5, 6]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>
    <el-dialog
      :close-on-click-modal="false"
      title="提示"
      :visible.sync="isShowDialog"
      width="30%"
    >
      <el-tree
        v-if="isShowDialog"
        ref="myTree"
        :data="permissions"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="selectedPermissions"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加和编辑 -->
    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="roleDialogVisible"
      width="30%"
      @close="reset"
    >
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tranferListToTree } from '@/utils'
import { getRoleList, delRole, addRole, editRole } from '@/api/setting'
import { getPermissions, getPermissionsById, assignPermission } from '@/api/permission'
export default {
  filters: {},
  components: {},
  data () {
    return {
      paramsObj: {
        page: 1,
        pagesize: 4
      },
      roleList: [],
      total: null,
      isShowDialog: false,
      permissions: [],
      // 被选中的节点的 key 所组成的数组
      selectedPermissions: [],
      id: null,
      // 编辑或添加对话框
      roleDialogVisible: false,
      // 校验规则
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      form: {
        name: '',
        description: ''
      },
      // 判断是编辑还是添加
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await getRoleList(this.paramsObj)
      console.log(res)
      this.roleList = res.rows
      this.total = res.total // 用于做分页
    },
    handleCurrentChange (page) {
      this.paramsObj.page = page
      this.getRoleList()
    },
    handleSizeChange (pagesize) {
      this.paramsObj.pagesize = pagesize
      this.getRoleList()
    },
    // 删除
    del (id) {
      this.$confirm('是否删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delRole(id)
        this.getRoleList()
        if (this.roleList.length === 1 && this.paramsObj.page > 1) {
          this.paramsObj.page--
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分配权限
    async showRightDialog (id) {
      this.id = id
      const res = await getPermissions()
      console.log(res)
      this.permissions = tranferListToTree(res, '0')
      console.log(this.permissions)
      const res1 = await getPermissionsById(id)
      console.log(res1)
      this.selectedPermissions = res1.permIds
      this.isShowDialog = true
    },
    // 确定分配权限
    async save () {
      await assignPermission(this.id, this.$refs.myTree.getCheckedKeys())
      this.$message.success('分配权限成功')
      this.isShowDialog = false
    },
    // 关闭添加dialog重置表单数据
    reset () {
      this.$refs.myForm.resetFields()
    },
    add () {
      this.$refs.myForm.validate(async bool => {
        if (!bool) return this.$message.error('表单数据非法')
        if (this.isEdit) {
          await editRole(this.form)
          this.$message.success('修改成功')
          this.roleDialogVisible = false
          this.getRoleList()
        } else {
          await addRole(this.form)
          this.roleDialogVisible = false
          this.getRoleList()
        }
      })
    },
    showDialog (row) {
      this.isEdit = true
      this.roleDialogVisible = true
      this.form = { ...row } // 浅拷贝
    }
  }
}
</script>

<style scoped lang='scss'>
.el-table {
  margin: 30px 0;
}
</style>
