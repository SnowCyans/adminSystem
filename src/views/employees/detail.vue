<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录账户设置" name="first">
          <!-- {{ $route.params.i.d }}<br />
          {{ id }} -->
          <el-form
            ref="userInfoRef"
            :rules="userInfoRules"
            :model="userInfo"
            style="width: 400px; margin: 20px 0 0 150px"
          >
            <el-form-item prop="username" label="姓名：">
              <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save"> 更新</el-button>
              <el-button type="info">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">
          <userInfo :id="id"></userInfo>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <JobInfo></JobInfo>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import JobInfo from './components/JobInfo.vue'
import userInfo from './components/userInfo.vue'
import { saveEmployee } from '@/api/employee'
import { getUserDetailById } from '@/api/user'
export default {
  filters: {},
  components: { userInfo, JobInfo },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      activeName: 'first',
      userInfo: {
        username: '',
        password: ''
      },
      userInfoRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserDetailList()
  },
  methods: {
    async getUserDetailList () {
      const res = await getUserDetailById(this.id)
      console.log(res)
      res.password = null
      this.userInfo = res
    },
    // 更新
    save () {
      this.$refs.userInfoRef.validate(async valid => {
        if (!valid) return this.$message.error('表单数据校验失败')
        await saveEmployee(this.id, this.userInfo)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
