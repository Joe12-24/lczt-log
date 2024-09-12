<template>

  <div class="page-container">
    <div class="nav-container">
      <!-- Navigation menu code, if needed -->
    </div>
    <div class="query-page">
      <div class="form-container">
        <el-form
          ref="formRef"
          :size="'default'"
          :label-width="80"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="客户代码" prop="clientId">
            <el-input v-model="formInline.clientId" clearable />
          </el-form-item>

          <el-form-item label="资金账号" prop="businessAccount">
            <el-input v-model="formInline.businessAccount" clearable />
          </el-form-item>

          <el-form-item label="一户通" prop="cifAccount">
            <el-input v-model="formInline.cifAccount" clearable />
          </el-form-item>

          <el-form-item label="入参" prop="req">
            <el-input v-model="formInline.req" clearable />
          </el-form-item>

          <el-form-item label="出参" prop="response">
            <el-input v-model="formInline.response" clearable />
          </el-form-item>

          <el-form-item label="功能号" prop="functionId">
            <el-input v-model="formInline.functionId" clearable />
          </el-form-item>

          <el-form-item label="时间超过" prop="callTime">
            <el-input v-model="formInline.callTime" clearable />
          </el-form-item>

          <el-form-item label="流水号" prop="serialNo">
            <el-input v-model="formInline.serialNo" clearable />
          </el-form-item>

          <el-form-item label="区分" prop="state">
            <el-select v-model="formInline.state" placeholder="" clearable>
              <el-option label="全部" value="" />
              <el-option label="正常" value=true />
              <el-option label="异常" value=false />
            </el-select>
          </el-form-item>

          <el-form-item label="接口类型" prop="source">
            <el-select v-model="formInline.source" placeholder="" clearable>
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
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="defaultTime2"
              style="width: 290px"
            />
          </el-form-item>

          <el-form-item>
            <el-button
                type="primary"
                :loading="loading"
                :loading-icon="Eleme"
                :plain="true"
                @click="fetchLogs">

              查询</el-button>
            <el-button @click="resetForm(formRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-container">
        <DataTable :data="logEntries" />
      </div>

      <div class="pagination-container">
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="pagination.totalCount"
          :page-size="pagination.pageSize"
          :current-page="pagination.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { reactive, ref } from 'vue'
import type { FormInstance} from 'element-plus'
import { ElMessage } from 'element-plus';
import http from '@/http'; // 确保路径正确
import DataTable from '../lczt-log/LcztTable.vue'
import {Eleme} from "@element-plus/icons-vue";
import { ElLoading } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

// Form reference and data
const formRef = ref<FormInstance>()
const defaultTime2: [Date, Date] = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 0, 0, 0),
]
const formInline = reactive({
  clientId: '',
  businessAccount: '',
  cifAccount: '',
  functionId: '',
  serialNo: '',
  callTime: '',
  req: '',
  response: '',
  state: '',
  source: '',
  dateRange: [] as Date[],
  pageNum: 1,      // Default page number
  pageSize: 10,    // Default page size
})

// Pagination state
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  totalCount: 0
})
// Data and error state
const logEntries = ref([])
const errorMessage = ref<string | null>(null)
// 控制加载状态
const loading = ref<boolean>(false);
// Fetch logs from backend
const fetchLogs = async () => {
    loading.value = true;  // 开始加载
  try {
    const queryParams = {
      ...formInline,
      startTime: formInline.dateRange[0] ? new Date(formInline.dateRange[0]).toISOString() : null,
      endTime: formInline.dateRange[1] ? new Date(formInline.dateRange[1]).toISOString() : null,
      pageNum: pagination.currentPage,
      pageSize: pagination.pageSize,
    }

    // const response = await axios.post('http://localhost:8080/logs', queryParams, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //   }
    // })
    const response = await http.post('/queryLogs', queryParams);


    const { code, message, data,duration } = response.data

    if (code === 200 && data) {
      logEntries.value = data.todos
      pagination.currentPage = data.currentPage
      pagination.totalCount = data.totalCount
      errorMessage.value = null
      ElMessage({
        message: '查询成功, 耗时:'+duration,
        type: 'success',
      })
    } else {
      errorMessage.value = message || '请求日志数据失败'
    }
  } catch (error) {
    console.error('请求日志数据失败:', error)
    errorMessage.value = '请求日志数据失败，请稍后重试'
  }finally {
    loading.value = false;  // 结束加载
  }
}
// 图标
const loadingIcon = ref(ElLoading);
// Reset form fields
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// Handle page size change
const handleSizeChange = (newSize: number) => {
  pagination.pageSize = newSize
  fetchLogs()
}

// Handle current page change
const handleCurrentChange = (newPage: number) => {
  pagination.currentPage = newPage
  fetchLogs()
}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 200px;
}
.demo-form-inline {
  text-align: left;
}
.page-container {
  display: flex;
}
.nav-container {
  /* width: 150px; */
}
.query-page {
  width: 1400px;
  margin: auto;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.form-container {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: left;
}

.table-container {
  flex: 1;
  overflow-x: auto;
}

/* Optional: Ensure the table doesn't overflow */
.table-container .el-table {
  min-width: 1000px;
}
</style>
