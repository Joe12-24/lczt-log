<template>

  <el-form :size="'default'" :label-width="80" :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="客户代码">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="资金账号">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="一户通">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="入参">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="出参">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="功能号">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="时间超过">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>

    <el-form-item label="流水号">
      <el-input v-model="formInline.user"  clearable />
    </el-form-item>


    <el-form-item label="区分">
      <el-select
        v-model="formInline.status"
        placeholder=""
        clearable
      >
        <el-option label="全部" value="" />
        <el-option label="正常" value="1" />
        <el-option label="异常" value="2" />
      </el-select>
    </el-form-item>

    <el-form-item label="接口类型">
      <el-select
        v-model="formInline.source"
        placeholder=""
        clearable
      >
        <el-option label="全部" value="" />
        <el-option label="凌志接口" value="newMall" />
        <el-option label="综合理财" value="newMallTsdk" />
        <el-option label="小贷" value="xiaodai" />
      </el-select>
    </el-form-item>

    <el-form-item label="日期选择" >

      <el-date-picker
      v-model="value2"
      type="datetimerange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-time="defaultTime2"
      style="width: 332px"
      />
    </el-form-item>

    <el-form-item>
       <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="onSubmit">重置</el-button>
    </el-form-item>

  </el-form>


</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const value1 = ref('')
const value2 = ref('')

const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0) // '12:00:00'
const defaultTime2: [Date, Date] = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
] // '12:00:00', '08:00:00'
const formInline = reactive({
  user: '',
  region: '',
  date: '',
  source: '',
  status: '',
  custId: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 150px;
}

.demo-form-inline .el-select {
  --el-select-width: 150px;
}
.demo-form-inline{
  text-align: left;
}
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
