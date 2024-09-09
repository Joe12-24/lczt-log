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
      <div class="form-container">
        <QueryForm @submit="handleSubmit" />
      </div>

      <div class="table-container">
        <DataTable :data="tableData" />
      </div>
      <div class="pagination-container">
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QueryForm from '@/components/Form.vue'
import DataTable from '@/components/Table.vue'


import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

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

// 获取日志数据的方法
const fetchLogs = () => {
  axios
    .get("/api/logs/entries", {
      params: {
        page: pagination.value.currentPage,
        size: pagination.value.pageSize
      }
    })
    .then((response) => {
      const data: PaginatedResponse = response.data;
      logEntries.value = data.todos;
      pagination.value.currentPage = data.currentPage;
      pagination.value.totalPages = data.totalPages;
      pagination.value.totalCount = data.totalCount;
    })
    .catch((error) => {
      console.error("请求日志数据失败:", error);
    });
};

// 在组件挂载时发起请求
onMounted(() => {
  fetchLogs();
});

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
