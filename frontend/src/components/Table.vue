<template>
  <el-table
    :data="data"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    border
    class="custom-table"
  >
    <el-table-column prop="date" label="客户代码" width="120" fixed="left" />
    <el-table-column prop="name" label="资金账号" width="120" fixed="left" />
    <el-table-column prop="address" label="一户通账号" width="120"/>
    <el-table-column prop="functionId" label="功能号" width="100"/>
    <el-table-column prop="serialNo" label="流水号" width="300"/>
    <el-table-column prop="callTime" label="响应时间" width="80"/>
    <el-table-column prop="time" label="日期" width="250"/>
    <el-table-column prop="parameter" label="入参" width="120">
      <template #default="{ row }">
        <el-button @click="showDetail('入参', row.parameter)">查询</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="result" label="返回结果" width="120">
      <template #default="{ row }">
        <el-button @click="showDetail('返回结果', row.result)">查询</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="source"
      label="来源"
      width="120"
    >
      <template #default="{ row }">
        {{ formatSource(row.source) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="区分"
      width="120"
    >
      <template #default="{ row }">
        {{ formatStatus(row.status) }}
      </template>
    </el-table-column>
  </el-table>

  <!-- 对话框 -->
  <el-dialog
    title="详细信息"
    :visible.sync="dialogVisible"
    width="50%"
    @close="dialogVisible = false"
  >
    <p><strong>{{ detailTitle }}:</strong> {{ detailContent }}</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';

interface LogEntry {
  date: string;
  name: string;
  address: string;
  functionId: string;
  serialNo: string;
  callTime: string;
  time: string;
  parameter: string;
  result: string;
  source: string;
  status: number;
}

const props = defineProps<{
  data: LogEntry[];
}>();

const sourceMap = {
  newMall: '凌志接口',
  newMallTsdk: '综合理财',
  xiaodai: '小贷'
};

const statusMap = {
  1: '正常',
  2: '异常'
};

const formatSource = (source: string) => {
  return sourceMap[source] || '未知';
};

const formatStatus = (status: number) => {
  return statusMap[status] || '未知';
};

const dialogVisible = ref(false);
const detailTitle = ref('');
const detailContent = ref('');

const showDetail = (title: string, content: string) => {
  detailTitle.value = title;
  detailContent.value = content;
  dialogVisible.value = true;
};

const tableRowClassName = ({ row }: { row: LogEntry }) => {
  if (row.status === 1) {
    return 'warning-row'; // Apply this class for status 1
  } else if (row.status === 2) {
    return 'success-row'; // Apply this class for status 2
  }
  return ''; // Default class for other statuses
};
</script>
<style scoped>
.el-table .warning-row {
  background-color: #ffcccc; /* Example color for warning status */
}

.el-table .success-row {
  background-color: #ccffcc; /* Example color for success status */
}

.custom-table {
  font-size: 12px; /* Smaller font size */
  --el-table-header-font-size: 12px; /* Smaller header font size */
  --el-table-cell-font-size: 12px; /* Smaller cell font size */
}

.el-table .el-table__body .el-table__cell {
  white-space: nowrap; /* Prevent cell content from wrapping */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Show ellipsis for overflow */
}
</style>
