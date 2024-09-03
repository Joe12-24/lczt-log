<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="date" label="客户代码" width="120" />
    <el-table-column prop="name" label="资金账号" width="120" />
    <el-table-column prop="address" label="一户通账号" width="120"/>
    <el-table-column prop="address" label="功能号" width="120"/>
    <el-table-column prop="address" label="流水号" width="120"/>
    <el-table-column prop="address" label="响应时间" width="120"/>
    <el-table-column prop="address" label="日期" width="120"/>
    <el-table-column prop="address" label="入参" width="120"/>
    <el-table-column prop="address" label="返回结果" width="120"/>
    <el-table-column prop="address" label="来源" width="120"/>
    <el-table-column prop="address" label="区分" width="120"/>
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  date: string
  name: string
  address: string
}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
