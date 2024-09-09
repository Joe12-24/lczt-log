<template>
  <div class="page-container">
    <div class="nav-container">
<!--      -->
<!--        <el-menu-->

<!--          active-text-color="#ffd04b"-->
<!--          background-color="#545c64"-->
<!--          class="el-menu-vertical-demo"-->
<!--          default-active="2"-->
<!--          text-color="#fff"-->
<!--          @open="handleOpen"-->
<!--          @close="handleClose"-->
<!--        >-->
<!--          <el-sub-menu index="1" >-->
<!--            <template #title>-->
<!--              <el-icon><location /></el-icon>-->
<!--              <span>Navigator One</span>-->
<!--            </template>-->
<!--            <el-menu-item-group title="Group One">-->
<!--              <el-menu-item index="1-1">item one</el-menu-item>-->
<!--              <el-menu-item index="1-2">item two</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-menu-item-group title="Group Two">-->
<!--              <el-menu-item index="1-3">item three</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-sub-menu index="1-4">-->
<!--              <template #title>item four</template>-->
<!--              <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--            </el-sub-menu>-->
<!--          </el-sub-menu>-->
<!--          <el-menu-item index="2">-->
<!--            <el-icon><icon-menu /></el-icon>-->
<!--            <span>Navigator Two</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="3" disabled>-->
<!--            <el-icon><document /></el-icon>-->
<!--            <span>Navigator Three</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="4">-->
<!--            <el-icon><setting /></el-icon>-->
<!--            <span>Navigator Four</span>-->
<!--          </el-menu-item>-->
<!--        </el-menu>-->

    </div>
    <div class="query-page">
<!--      <div class="form-container">-->
<!--        <QueryForm @submit="handleSubmit" />-->
<!--      </div>-->
      <div>
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
               <el-button type="primary" @click="fetchLogs">查询</el-button>
               <el-button  @click="resetForm(formRef)">重置</el-button>
            </el-form-item>

          </el-form>
      </div>
      <div class="table-container">
        <DataTable :data="logEntries" />
      </div>
      <div class="pagination-container">
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import http from '@/http'; // 确保路径正确
import QueryForm from '@/components/Form.vue'
import DataTable from '@/components/Table.vue'

import {defineComponent, onMounted, reactive, ref} from "vue";
import axios from "axios";
import type {FormInstance} from "element-plus";
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



const tableData = ref([
  { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
])

const handleSubmit = () => {
  console.log('Form submitted')
}


// 定义数据结构
interface LogEntry {
  businessAccount: string;
  serialNo: string;
  clientId: string;
  functionId: string;
  status: number;
  cifAccount: string;
  parameter: string;
  result: string;
  source: string;
  callTime: string;
  time: string;
}

interface PaginatedResponse {
  todos: LogEntry[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

// 响应式数据
const logEntries = ref<LogEntry[]>([]);
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalCount: 0
});

const errorMessage = ref<string | null>(null); // 用于显示错误信息
// 获取日志数据的方法
const fetchLogs = async () => {
  try {
    // 请求体参数
    const queryParams = {
      page: pagination.value.currentPage,
      size: pagination.value.pageSize
    };

    // 使用 POST 请求
    const response = await axios.post<ApiResponse<PaginatedResponse>>(
      'http://localhost:8080/logs',
      queryParams,
      {
        headers: {
          'Content-Type': 'application/json',
          // 如果有 token，确保在这里添加它
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      }
    );

    // 处理成功响应
    const { code, message, data } = response.data;

    if (code === 200 && data) {
      logEntries.value = data.todos;
      pagination.value.currentPage = data.currentPage;
      pagination.value.totalPages = data.totalPages;
      pagination.value.totalCount = data.totalCount;

      // 清空错误信息
      errorMessage.value = null;
    } else {
      // 处理业务错误
      errorMessage.value = message || '请求日志数据失败';
    }
  } catch (error) {
    // 处理请求错误
    console.error('请求日志数据失败:', error);
    errorMessage.value = '请求日志数据失败，请稍后重试';
  }
};

// // 在组件挂载时发起请求
// onMounted(() => {
//   fetchLogs();
// });

// 处理页面大小变化
const handleSizeChange = (newSize: number) => {
  pagination.value.pageSize = newSize;
  fetchLogs();
};

// 处理页码变化
const handleCurrentChange = (newPage: number) => {
  pagination.value.currentPage = newPage;
  fetchLogs();
};

</script>

<style scoped>
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
.page-container{
  display: flex;
  //background-color: #0ea5e9;
}
.nav-container{
  //width: 150px;
}
.query-page {
  width: calc(100% - 150px);
  margin: auto;
  //display: flex;
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
  justify-content: left
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
