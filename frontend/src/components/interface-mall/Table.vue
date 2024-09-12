<template>
  <el-table
    :data="data"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    class="custom-table"
  >
    <el-table-column prop="clientId" label="客户代码" width="100" fixed="left" />
    <el-table-column prop="businessAccount" label="资金账号" width="180" />
    <el-table-column prop="cifAccount" label="一户通账号" width="180"/>
    <el-table-column prop="functionId" label="功能号" width="100"/>
    <el-table-column prop="serialNo" label="流水号" width="300"/>
    <el-table-column prop="callTime" label="响应时间" width="80"/>
    <el-table-column prop="time" label="日期" width="250"/>
    <el-table-column prop="parameter" label="入参" width="120">
      <template #default="{ row }">
        <el-popover placement="right" width="300" trigger="click">
          <template #reference>
            <el-button>查看</el-button>
          </template>
          <div>{{ row.parameter }}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="result" label="返回结果" width="120">
      <template #default="{ row }">
        <el-popover placement="right" width="300" trigger="click">
          <template #reference>
            <el-button>查看</el-button>
          </template>
          <div>{{ row.result }}</div>
        </el-popover>
      </template>
    </el-table-column>
        <el-table-column prop="status" label="区分" width="120">
      <template #default="{ row }">
        {{ formatStatus(row.status) }}
      </template>
    </el-table-column>
    <el-table-column prop="source" label="来源" width="120">
      <template #default="{ row }">
        {{ formatSource(row.source) }}
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
import { ref } from 'vue';

import {STATUS_DICT,SOURCE_DICT} from "@/models/dictionary";
import {LogEntry} from "@/models/interface";


const props = defineProps<{
  data: LogEntry[];
}>();



const formatSource = (source: string): string => {
  return SOURCE_DICT.get(source) || '未知';
};

const formatStatus = (status: number): string => {
  return STATUS_DICT.get(status) || '未知';
};

const dialogVisible = ref(false);
const detailTitle = ref('');
const detailContent = ref('');

const tableRowClassName = ({
  row,
}: {
  row: LogEntry
}) => {
  if (row.status === 1) {
    return ''
  } else if (row.status === 2) {
    return 'warning-row'
  }
  return 'warning-row'
}
</script>

<style scoped >
/deep/ .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
/deep/ .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9) ;
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
