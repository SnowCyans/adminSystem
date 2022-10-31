<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 权限管理 -->
      <PageTool>
        <template #right>
          <el-button type="primary" size="mini" @click="showDialog('0')"
            >添加权限</el-button
          >
        </template>
      </PageTool>
      <el-card style="margin-top: 20px">
        <el-table :data="list" row-key="id" border>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="标识" prop="code"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.type === 1"
                type="text"
                @click="showDialog(scope.row.id)"
                >添加</el-button
              >
              <span v-else style="width: 3em; display: inline-block"></span>
              <el-button type="text" @click="editDialog(scope.row)"
                >编辑</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-dialog :title="title" :visible.sync="dialogVisible" @close="reset">
        <el-form ref="permissionRef" :rules="rules" label-width="80px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="permissionForm.name"></el-input>
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="permissionForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="permissionForm.description"></el-input>
          </el-form-item>
          <el-form-item label="开启" prop="enVisible">
            <el-switch v-model="permissionForm.enVisible"></el-switch>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button size="mini" @click="dialogVisible = fasle">取消</el-button>
          <el-button type="primary" size="mini" @click="save">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissions, addPermission, editPermission } from '@/api/permission'
import { tranferListToTree } from '@/utils'
export default {
  filters: {},
  components: {},
  data () {
    return {
      list: [],
      dialogVisible: false,
      permissionForm: {
        enVisible: false,
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      id: null
    }
  },
  computed: {
    title () {
      return this.id ? '新增权限' : '编辑权限'
    }
  },
  watch: {},
  created () {
    this.getPermissionsList()
  },
  methods: {
    async getPermissionsList () {
      const res = await getPermissions()
      this.list = tranferListToTree(res, '0')
      console.log(res)
    },
    // 打开dialog
    showDialog (id) {
      this.id = id
      this.dialogVisible = true
    },
    // 关闭重置表单输入框内容
    reset () {
      this.$refs.permissionRef.resetFields()
      this.permissionForm = {
        enVisible: false,
        name: '',
        code: '',
        description: '',
        type: '',
        pid: ''
      }
    },
    async save () {
      if (this.id) {
        // 添加
        this.permissionForm.pid = this.id ? this.id : '0'
        this.permissionForm.type = this.id === '0' ? 1 : 2
        await addPermission(this.permissionForm)
      } else {
        // 编辑
        await editPermission(this.permissionForm)
      }
      this.dialogVisible = false
      this.getPermissionsList()
    },
    editDialog (row) {
      this.id = null
      console.log(row)
      this.dialogVisible = true
      this.permissionForm = { ...row }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
