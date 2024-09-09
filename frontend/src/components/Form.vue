<template>

  <el-form
      ref="formRef"
      :size="'default'"
      :label-width="80"
      :inline="true"
      :model="formInline"
      class="demo-form-inline">
    <el-form-item label="客户代码" prop="clientId">
      <el-input v-model="formInline.clientId"  clearable />
    </el-form-item>

    <el-form-item label="资金账号" prop="businessAccount">
      <el-input v-model="formInline.businessAccount"  clearable />
    </el-form-item>

    <el-form-item label="一户通" prop="cifAccount">
      <el-input v-model="formInline.cifAccount"  clearable />
    </el-form-item>

    <el-form-item label="入参" prop="parameter">
      <el-input v-model="formInline.parameter"  clearable />
    </el-form-item>

    <el-form-item label="出参" prop="result">
      <el-input v-model="formInline.result"  clearable />
    </el-form-item>

    <el-form-item label="功能号" prop="functionId">
      <el-input v-model="formInline.functionId"  clearable />
    </el-form-item>

    <el-form-item label="时间超过" prop="callTime">
      <el-input v-model="formInline.callTime"  clearable />
    </el-form-item>

    <el-form-item label="流水号" prop="serialNo">
      <el-input v-model="formInline.serialNo"  clearable />
    </el-form-item>


    <el-form-item label="区分" prop="status">
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

    <el-form-item label="接口类型" prop="source">
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

    <el-form-item label="日期选择" prop="dateRange">
      <el-date-picker
        v-model="formInline.dateRange"
        type="datetimerange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="defaultTime2"
        style="width: 290px"
      />
    </el-form-item>

    <el-form-item>
       <el-button type="primary" @click="onSubmit">查询</el-button>
       <el-button  @click="resetForm(formRef)">重置</el-button>
    </el-form-item>

  </el-form>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const value1 = ref('')
const value2 = ref('')
const formRef = ref<FormInstance>()

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
  clientId: '',
  businessAccount: '',
  cifAccount: '',
  functionId: '',
  serialNo: '',
  callTime: '',
  startDate: '',
  endDate: '',
  parameter: '',
  result: '',
  dateRange: [] as [Date, Date],
})

const onSubmit = () => {
  console.log('submit!')
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 140px;
}

.demo-form-inline .el-select {
  --el-select-width: 140px;
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
