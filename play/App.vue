<template>
    <div>
      <!-- <CConfigProvider> -->
        <CIcon class="c-icon-zaixiankefu" color="red" :size="20">222</CIcon>
        <!-- <GNoTask></GNoTask> -->
        <!-- <BaseTable :loadData="loadData">
          <el-table-column label="测试" prop="id"></el-table-column>
        </BaseTable> -->
        <CTopMenu></CTopMenu>
      <!-- </CConfigProvider> -->
    </div>
</template>
<script lang="ts" setup>

function loadData() {
  return new Promise((resolve) => {
    resolve({
      records: [{
        id: 1
      }],
      total: 10
    })
  })
}
</script>
