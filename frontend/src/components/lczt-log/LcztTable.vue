<template>
  <el-table
    :data="data"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    class="custom-table"
    border
    header-align="center"
    scrollbar-always-on>
    <el-table-column prop="clientId" label="客户代码" width="140" fixed="left" />
    <el-table-column prop="businAccount" label="资金账号" width="140" />
    <el-table-column prop="cifAccount" label="一户通账号" width="140"/>
    <el-table-column prop="functionId" label="功能号" width="100"/>
    <el-table-column prop="serialId" label="流水号" width="180"/>
    <el-table-column prop="callTime" label="响应时间" width="80"/>

    <el-table-column prop="sendDate" label="日期" width="200"/>
    <el-table-column prop="serverIp" label="serverIp" width="120"/>
    <el-table-column prop="req" label="入参" width="90">
      <template #default="{ row }">
        <el-popover placement="left" width="300" trigger="click">
          <template #reference>
            <el-button>查看</el-button>
          </template>
          <div>{{ row.req }}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="response" label="返回结果" width="90">
      <template #default="{ row }">
        <el-popover placement="right" width="300" trigger="click">
          <template #reference>
            <el-button>查看</el-button>
          </template>
          <div>{{ row.response }}</div>
        </el-popover>
      </template>
    </el-table-column>
        <el-table-column prop="state" label="区分" width="60">
      <template #default="{ row }">
        {{ formatStatus(row.state) }}
      </template>
    </el-table-column>

     <el-table-column  prop="serverId" label="接口类型" width="90"/>
    <el-table-column v-if="operationSwitch" prop="clientIp" label="clientIp" width="120"/>
        <!-- 这里添加折叠控制 -->
    <el-table-column v-if="operationSwitch" prop="tradeId" label="tradeId" width="120"/>
    <el-table-column v-if="operationSwitch" prop="sessionId" label="sessionId" width="120"/>

     <el-table-column v-if="operationSwitch" prop="source" label="环境" width="120">
      <template #default="{ row }">
        {{ formatSource(row.source) }}
      </template>
    </el-table-column>


    <el-table-column
        fixed="right"
        label="操作"
        align="center"
        :width="operationSwitch ? '0' : '0'"
      >
        <template #header>
          <div class="switchBox">
<!--            <p v-if="operationSwitch">clientIp</p>-->
            <el-icon @click="switchChange" v-if="operationSwitch" size="20" color="#9bafbe">
              <Expand/></el-icon>
            <el-icon @click="switchChange" v-else-if="!operationSwitch" size="20" color="#9bafbe">
              <Fold/></el-icon>
          </div>
        </template>

      </el-table-column>
  </el-table>

  <!-- 对话框 -->
  <el-dialog
    title="详细信息"
    :visible.sync="dialogVisible"
    width="300px"
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

import {STATE_DICT,SOURCE_DICT} from "@/models/dictionary";
import {LcztLogEntry} from "@/models/interface";


const props = defineProps<{
  data: LcztLogEntry[];
}>();



const formatSource = (source: string): string => {
  return SOURCE_DICT.get(source) || source;
};

const formatStatus = (state: boolean): string => {
  return STATE_DICT.get(state) || '未知';
};

const dialogVisible = ref(false);
const detailTitle = ref('');
const detailContent = ref('');

const tableRowClassName = ({
  row,
}: {
  row: LcztLogEntry
}) => {
  if (row.state) {
    return ''
  } else if (row.state) {
    return 'warning-row'
  }
  return 'warning-row'
}
//操作开关
const operationSwitch = ref(false)
//
const switchChange = () => {
  operationSwitch.value = !operationSwitch.value
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
/deep/ .el-scrollbar__bar.is-horizontal{
  height: 10px;
}
.switchBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;

}
</style>
