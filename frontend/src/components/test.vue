<script lang="ts" setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
])
//操作开关
const operationSwitch = ref(true)
//
const switchChange = () => {
  operationSwitch.value = !operationSwitch.value
}
</script>
<template>
  <div class="">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        :width="operationSwitch ? '200' : '80'"
      >
        <template #header>
          <div class="switchBox">
            <p v-if="operationSwitch">操作</p>
            <el-icon @click="switchChange" v-if="operationSwitch" size="20" color="#9bafbe">
              <Expand
            /></el-icon>
            <el-icon @click="switchChange" v-else-if="!operationSwitch" size="20" color="#9bafbe">
              <Fold
            /></el-icon>
          </div>
        </template>
        <template #default>
          <el-button link type="primary" size="small" v-if="operationSwitch"> 查看 </el-button>
          <el-button link type="primary" size="small" v-if="operationSwitch">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style  scoped>
.switchBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 90%;
  }
}
</style>

