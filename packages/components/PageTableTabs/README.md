<!--
 * @Description: 
 * @Author: chenju
 * @Date: 2022-03-21 16:04:26
 * @LastEditors: chenju
 * @LastEditTime: 2022-03-21 16:13:20
-->
## 使用方式

> 示例请看:src\views\factorManagement copy\factorList\index.vue

### 需要tab的情况
```
<!-- tab 入参 -->
<!-- v-model:active：当前激活的tab 必填 -->
<!-- title：页面标题 必填 -->
<!-- isBack：是否显示返回按钮 非必填 默认不显示 -->
<PageTableTabs v-model:active="activeTab" title="列表样式">
  <!-- tab-pane入参 -->
  <!-- name：tab的名称，作用于PageTableTabs组件中的v-model:active -->
  <PageTableTabPane name="待审核">
    <!-- 与PageTable操作方式一致 -->
    <page-table-new @register="registerPage" v-model:searchForm="searchForm">
      <!-- 右侧操作按钮 和之前使用方式一致。可使用插槽，也可使用searchButtonOptions配置 -->
      <template #headerRightButton>
        <el-button>测试</el-button>
      </template>
      <el-table-column label="因子名称1">
        <template #default="scope">
          <span>{{ empty(scope.row.factorName) }}</span>
        </template>
      </el-table-column>
      ···
      </page-table-new>
  </PageTableTabPane>
  <PageTableTabPane name="已审核">
    <page-table-new @register="registerPage2" v-model:searchForm="searchForm2">
      <el-table-column label="因子名称">
        <template #default="scope">
          <span>{{ empty(scope.row.factorName) }}</span>
        </template>
      </el-table-column>
      ···
    </page-table-new>
  </PageTableTabPane>
</PageTableTabs>
```

### 不需要tab的情况
```
<!-- 与PageTable操作方式一致 -->
<page-table-new @register="registerPage" v-model:searchForm="searchForm">
  <!-- 右侧操作按钮 和之前使用方式一致。可使用插槽，也可使用searchButtonOptions配置 -->
  <template #headerRightButton>
    <el-button>测试</el-button>
  </template>
  <el-table-column label="因子名称1">
    <template #default="scope">
      <span>{{ empty(scope.row.factorName) }}</span>
    </template>
  </el-table-column>
  ···
  </page-table-new>
```