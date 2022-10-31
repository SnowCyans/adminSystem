<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTool title="共一条记录">
        <template #right>
          <el-button type="danger" size="mini" @click="exportExcel"
            >普通excel导出</el-button
          >
          <el-button type="info" size="mini" @click="exportExcel1"
            >复杂表头excel导出</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="$router.push('import?type=user')"
            >excel导入</el-button
          >
          <el-button type="primary" size="mini" @click="addEmployeeShow = true"
            >新增员工</el-button
          >
        </template>
      </PageTool>

      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop="username"
          ></el-table-column>
          <el-table-column label="头像" prop="staffPhoto">
            <template v-slot="scope">
              <img
                v-imgerror
                :src="scope.row.staffPhoto"
                style="width: 40px"
                @click="showQrDialog(scope.row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile"></el-table-column>
          <el-table-column label="工号" prop="workNumber"></el-table-column>
          <!-- <el-table-column
            label="聘用形式(formatter)"
            prop="formOfEmployment"
            :formatter="formatterEmployee"
          ></el-table-column> -->
          <!-- <el-table-column label="聘用形式(作用域插槽)" prop="formOfEmployment">
            <template v-slot="scope">
              {{ scope.row.formOfEmployment | formatFormType }}
            </template>
          </el-table-column> -->
          <el-table-column label="部门" prop="departmentName"></el-table-column>
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="scope">
              {{ scope.row.timeOfEntry | dateformat }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="enableState">
            <template v-slot="scope">
              <el-switch :value="scope.row.enableState" disabled> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="$router.push('/employees/detail/' + scope.row.id)"
                >查看</el-button
              >
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button
                type="text"
                @click="showRoleDialog(scope.$index, scope.row)"
                >角色</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 角色 -->
      <el-dialog title="提示" :visible.sync="roleVisible" width="30%">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item in roleList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleVisible = false">取 消</el-button>
          <el-button type="primary" @click="assingRoles">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 新增 -->
      <el-dialog
        title="新增员工"
        :visible.sync="addEmployeeShow"
        width="30%"
        @close="handleClose"
      >
        <el-form
          ref="employeeRef"
          :model="employeeForm"
          :rules="employeeFormRules"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="username">
            <el-input v-model="employeeForm.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="employeeForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              v-model="employeeForm.timeOfEntry"
              align="right"
              type="date"
              placeholder="入职时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <!-- <el-input v-model="employeeForm.formOfEmployment"></el-input> -->
            <el-select v-model="employeeForm.formOfEmployment">
              <el-option
                v-for="item in hireType"
                :key="item.id"
                placeholder="请选择"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" prop="workNumber">
            <el-input v-model="employeeForm.workNumber"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="departmentName">
            <el-input
              v-model="employeeForm.departmentName"
              @focus="showDepartement"
            ></el-input>
            <el-tree
              v-if="deparmentList.length > 0"
              :data="deparmentList"
              default-expand-all
              :props="{ label: 'name' }"
              @node-click="handleClick"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="转正时间" prop="correctionTime">
            <el-date-picker
              v-model="employeeForm.correctionTime"
              align="right"
              type="date"
              placeholder="转正时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addEmployeeShow = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 图片二维码dialog -->
      <el-dialog title="图片二维码" :visible.sync="dialogVisible">
        <el-row type="flex" justify="center">
          <canvas ref="canvas"></canvas>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { getDepartmentsList } from '@/api/departments'
import { validMobile } from '@/utils/validate'
import { getUserDetailById } from '@/api/user'
import { getRoleList } from '@/api/setting'
import employees from '@/constant/employees.js'
import { getEmployee, assignRoles } from '@/api/employee'
export default {
  filters: {
    formatFormType (id) {
      return employees.hireType.find(item => item.id === id).value
    }
  },
  components: {},
  data () {
    const validMobileFn = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不对'))
    }
    return {
      paramsObj: {
        page: 1,
        size: 5
      },
      employeesList: [],
      total: null,
      // 角色dialog
      roleVisible: false,
      checkList: [],
      roleList: [],
      id: null,
      // 新增员工dialog
      addEmployeeShow: false,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 校验规则
      employeeFormRules: {
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: validMobileFn, trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },
      hireType: employees.hireType,
      deparmentList: [],
      qrcodevisible: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList () {
      const res = await getEmployee(this.paramsObj)
      console.log(res)
      this.employeesList = res.rows
      this.total = res.total
    },
    formatterEmployee (row, column, cellValue, index) {
      const obj = employees.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async exportExcel () {
      const { rows } = await getEmployee({ page: 1, size: 9999 })
      console.log(rows)
      var data = []
      rows.forEach(item => {
        data.push(Object.values(item))
      })
      const headers = {
        'id': '编号',
        'username': '姓名',
        'mobile': '手机',
        'timeOfEntry': '入职日期',
        'formOfEmployment': '聘用形式',
        'correctionTime': '转正日期',
        'workNumber': '工号',
        'departmentName': '部门'
      }
      var tHeader = Object.keys(rows[0]).map(item => (headers[item]))
      console.log(Object.keys(rows[0]))
      console.log(rows)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '员工表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    exportExcel1 () {
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const tHeader = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const data = [
        ['张三', '13000000', '2019-1-1', '正式', '2019-1-2', '110', 'java部门'],
        ['李四', '13000000', '2019-1-1', '正式', '2019-1-2', '111', 'java部门']
      ]

      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          multiHeader, // 第一行表头 复杂表头
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          merges // 设置合并规则
        })
      })
    },
    // 角色
    async showRoleDialog (index, row) {
      this.id = row.id
      const { rows } = await getRoleList({ page: 1, size: 9999 })
      console.log(rows)
      this.roleList = rows
      const { roleIds } = await getUserDetailById(row.id)
      this.checkList = roleIds
      this.roleVisible = true
    },
    async assingRoles () {
      await assignRoles({ id: this.id, roleIds: this.checkList })
      this.roleVisible = false
      this.$message.success('分配成功')
    },
    // 关闭新增dialog后重置表单数据
    handleClose () {
      this.$refs.employeeRef.resetFields()
      this.deparmentList = []
    },
    // Tree
    async showDepartement () {
      const res = await getDepartmentsList()
      console.log(res)
      function tranferListToTree (list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = tranferListToTree(list, item.id)
          }
        })
        return list1
      }
      this.deparmentList = tranferListToTree(res.depts, '')
    },
    handleClick (obj) {
      this.employeeForm.departmentName = obj.name
      this.deparmentList = []
    },
    showQrDialog (src) {
      this.qrcodevisible = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, src, function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
