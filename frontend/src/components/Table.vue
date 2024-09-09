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
    <el-table-column prop="functionId" label="功能号" width="120"/>
    <el-table-column prop="serialNo" label="流水号" width="300"/>
    <el-table-column prop="callTime" label="响应时间" width="120"/>
    <el-table-column prop="time" label="日期" width="250"/>
    <el-table-column prop="parameter" label="入参" width="120">
      <template #default="{ row }">
        <el-button @click="showDetail('parameter', row.parameter)">查询</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="result" label="返回结果" width="120">
      <template #default="{ row }">
        <el-button @click="showDetail('result', row.result)">查询</el-button>
      </template>
    </el-table-column>
   <el-table-column
  prop="source"
  label="来源"
  width="120"
  :formatter="formatSource"
></el-table-column>

<el-table-column
  prop="status"
  label="区分"
  width="120"
  :formatter="formatStatus"
></el-table-column>


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
import { ref } from 'vue';
import { defineComponent } from 'vue';
// Define formatters
const formatSource = (row, column, cellValue, index) => {
  return sourceMap[cellValue] || cellValue;
};

const formatStatus = (row, column, cellValue, index) => {
  return statusMap[cellValue] || cellValue;
};

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

const props = defineProps<{
  data: LogEntry[];
}>();

const dialogVisible = ref(false);
const detailTitle = ref('');
const detailContent = ref('');

const showDetail = (title: string, content: string) => {
  detailTitle.value = title;
  detailContent.value = content;
  dialogVisible.value = true;
};

const tableRowClassName = ({ row, rowIndex }: { row: LogEntry, rowIndex: number }) => {
  if (rowIndex % 2 === 0) {
    return 'even-row';
  } else {
    return 'odd-row';
  }
};


</script>

<style scoped>
.custom-table {
  font-size: 12px; /* 更小的字体 */
  --el-table-header-font-size: 12px; /* 更小的表头字体 */
  --el-table-cell-font-size: 12px; /* 更小的单元格字体 */
}

.el-table {
  white-space: nowrap; /* 确保表格内容不换行 */
}

.el-table .el-table__body .el-table__cell {
  white-space: nowrap; /* 确保单元格内容不换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 溢出时显示省略号 */
}

.el-table__body-wrapper {
  overflow-x: auto; /* 添加水平滚动条 */
}

.el-table__header-wrapper {
  overflow: hidden; /* 确保表头不显示滚动条 */
}

.el-table .el-table__fixed {
  background: #fff; /* 固定列背景颜色 */
}

.even-row {
  --el-table-tr-bg-color: #f5f5f5;
}
.odd-row {
  --el-table-tr-bg-color: #ffffff;
}
</style>
