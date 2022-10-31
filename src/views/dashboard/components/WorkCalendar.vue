<template>
  <div>
    工作日历
    <el-row type="flex" justify="end" :gutter="10">
      <el-col :span="6">
        <el-select v-model="year" size="mini" @change="handleChange">
          <el-option
            v-for="(item, i) in 11"
            :key="i"
            :value="year - 6 + item"
            >{{ year - 6 + item }}</el-option
          >
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-select v-model="month" size="mini" @change="handleChange">
          <el-option v-for="(item, i) in 12" :key="i" :value="item">{{
            item
          }}</el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-calendar ref="calendar" v-model="value">
        <template #dateCell="scope">
          {{ scope.date.getDate() }}
          <div
            v-if="scope.date.getDay() === 0 || scope.date.getDay() === 6"
            class="rest"
          >
            休
          </div>
        </template>
      </el-calendar>
    </el-row>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      value: new Date()
    }
  },
  computed: {},
  watch: {
    // value: {
    //   handler (newVal) {
    //     this.month = new Date(newVal).getMonth() + 1
    //     this.year = new Date(newVal).getFullYear()
    //   },
    //   deep: true
    // }
  },
  created () { },
  mounted () {
    var that = this

    this.$refs.calendar.$el.addEventListener('click', function () {
      console.log(that.$refs.calendar.$el)
      that.month = new Date(that.$refs.calendar.realSelectedDay).getMonth() + 1
      that.year = new Date(that.$refs.calendar.realSelectedDay).getFullYear()
    })
  },
  methods: {
    handleChange () {
      const str = this.year + '-' + this.month
      console.log(str)
      this.value = new Date(str)
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar__body {
  padding: 0;
}
::v-deep .el-calendar-table td {
  text-align: center;
  border: none;
}
::v-deep .el-calendar-table tr td:first-child {
  border: none;
}
::v-deep .el-calendar-table tr:first-child td {
  border: none;
}
.rest {
  border-radius: 50%;
  background-color: orange;
  color: #fff;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  display: inline-block;
}
</style>
