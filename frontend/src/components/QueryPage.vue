<template>
  <div class="query-page">
    <div class="form-container">
      <QueryForm @submit="handleSubmit" />
    </div>
    <div class="table-container">
      <DataTable :data="tableData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import QueryForm from '@/components/Form.vue'
import DataTable from '@/components/Table.vue'
import { ref } from 'vue'

const tableData = ref([
  { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
])

const handleSubmit = () => {
  console.log('Form submitted')
}
</script>

<style scoped>
.query-page {
  width: 90%;
  margin: auto;
  //display: flex;
  //flex-direction: column;
  //padding: 20px;
  //gap: 20px;
}

.form-container {
  margin-bottom: 20px;
}

.table-container {
  flex: 1;
  overflow-x: auto;
}

/* Optional: Ensure the table doesn't overflow */
.table-container .el-table {
  min-width: 600px;
}
</style>
