<template>

  <el-form
      ref="formRef"
      :size="'default'"
      :label-width="80"
      :inline="true"
      :model="numberValidateForm"
      class="demo-form-inline">
    <el-form-item label="sadfa" prop="age">
      <el-input v-model="numberValidateForm.age"  type="text"
        autocomplete="off" />
    </el-form-item>


    <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button></el-form-item>

  </el-form>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  age: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
