<!--
 * @Description: 基础表格
 * @Author: chenju
 * @Date: 2022-01-13 16:16:24
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 17:03:35
-->
<template>
  <el-table
    ref="baseTableRef"
    class="g-base-table"
    :class="topBorder ? 'g-base-table--t-b' : ''"
    :data="dataSource"
    v-loading="loading"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    v-bind="elTableOptionProps"
  >
    <el-table-column type="selection" width="60" v-if="selection" />
    <slot></slot>
    <template #empty>
      <div class="empty">
        <img class="img" src="./no-task.png" />
        <p class="g-font-14n3">列表暂无数据</p>
      </div>
    </template>
  </el-table>
  <div
    class="table-footer g-flex-between-center"
    v-if="(selection && !hideSelection) || pagination"
  >
    <div class="g-flex-start-center">
      <template v-if="selection && !hideSelection">
        <slot name="batchOperaBtns" :selection="multipleSelection"></slot>
        <span class="g-font-14n2 g-ml8">已勾选{{ multipleSelection.length }}条</span>
      </template>
    </div>
    <el-pagination
      class="g-pagination"
      size="normal"
      v-model:currentPage="currentPage"
      :page-sizes="paginationPageSizes"
      :page-size="pageSize"
      :layout="paginationLayout"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      v-if="pagination"
    >
    </el-pagination>
  </div>
  <div
    class="fixed-table-footer-bar g-flex-start-center"
    :class="collapsed ? 'fixed-table-footer-bar--collapsed' : ''"
    v-if="selection && multipleSelection?.length"
  >
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
      >本页全选</el-checkbox
    >
    <span class="g-font-14n2 g-mr8 g-ml16">已勾选{{ multipleSelection.length }}条</span>
    <slot name="batchOperaBtns" :selection="multipleSelection"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';

const baseConfig = {
  // 默认列表每页条数
  DEFAULT_PAGE_SIZE: 10,
  // 默认列表每页条数选项
  DEFAULT_PAGE_SIZES: [10, 20, 50, 100, 200],
  // 默认分页器选项配置
  DEFAULT_PAGE_LAYOUT: 'total, sizes, prev, pager, next, jumper'
};

export default defineComponent({
  name: 'BaseTable',
  props: {
    // 行数据的 Key
    rowKey: {
      type: String,
      default: 'id'
    },
    // 是否有上边框
    topBorder: {
      type: Boolean,
      default: false
    },
    // 数据加载方法，必须为Promise，返回值必须包含 record/total
    loadData: {
      type: Function,
      default: undefined,
      required: true
    },
    // 分页器配置
    pagination: {
      type: [Object, Boolean] as PropType<any>,
      default: () => {
        return true;
      }
    },
    // 是否立即执行接口
    immediate: {
      type: Boolean,
      default: true
    },
    // 是否需要复选框
    selection: {
      type: Boolean,
      default: false
    },
    hideSelection: {
      type: Boolean,
      default: false
    },
    // el-table option
    elTableOption: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    const baseTableRef = ref();
    const dataSource = ref<any[]>([]);
    const currentPage = ref(1);
    const pageSize = ref(props.pagination?.pageSize || baseConfig.DEFAULT_PAGE_SIZE);
    const paginationPageSizes = ref(props.pagination?.pageSizes || baseConfig.DEFAULT_PAGE_SIZES);
    const paginationLayout = ref(props.pagination?.layout || baseConfig.DEFAULT_PAGE_LAYOUT);
    const totalCount = ref(0);
    const loading = ref(false);

    const elTableOptionProps = computed(() => {
      return {
        ...props.elTableOption
      };
    });

    // 菜单是否折叠 用于footer的宽度计算
    const collapsed = computed(() => {
      // return store.state.app.collapsed;
      return false;
    });

    // 表格加载方法
    const getTableData = () => {
      // 加载数据
      if (props.loadData) {
        loading.value = true;
        const params = {
          current: currentPage.value,
          size: pageSize.value
        };
        const result = props.loadData(params);
        if (
          (typeof result === 'object' || typeof result === 'function') &&
          typeof result.then === 'function'
        ) {
          result
            .then((res: any) => {
              console.log('loadData res', res);
              dataSource.value = res.records || [];
              totalCount.value = res.total || 0;
              loading.value = false;
            })
            .catch((error: any) => {
              console.log('error', error);
              loading.value = false;
            });
        } else {
          loading.value = false;
        }
      }
    };

    // 每页条数改变
    const handleSizeChange = (size: number) => {
      console.log('handleSizeChange', size);
      currentPage.value = 1;
      pageSize.value = size;
      refresh();
    };

    // 当前页码改变
    const handleCurrentChange = (page: number) => {
      console.log('handleCurrentChange', page);
      currentPage.value = page;
      refresh();
    };

    const checkAll = ref(false);
    const isIndeterminate = ref(false);
    // 选择框选项
    const multipleSelection = ref<any[]>([]);
    // 多选框
    function handleSelectionChange(val: any[]) {
      console.log('handleSelectionChange', val);
      multipleSelection.value = val;
      if (
        multipleSelection.value?.length &&
        dataSource.value?.length &&
        dataSource.value.length === multipleSelection.value.length
      ) {
        // 全选
        checkAll.value = true;
        isIndeterminate.value = false;
      } else if (
        multipleSelection.value?.length &&
        dataSource.value?.length &&
        dataSource.value.length !== multipleSelection.value.length
      ) {
        // 半选
        checkAll.value = false;
        isIndeterminate.value = true;
      } else {
        // 未选
        checkAll.value = false;
        isIndeterminate.value = false;
      }
    }
    // 全选
    function handleCheckAllChange(val: any) {
      console.log('handleCheckAllChange', val);
      if (val) {
        baseTableRef.value?.toggleAllSelection();
      } else {
        baseTableRef.value?.clearSelection();
      }
    }

    /**
     * @Description: 刷新表格
     * @param {*} isReset 是否重置页码
     * @return {*}
     */
    function refresh(isReset = false) {
      isReset && (currentPage.value = 1);
      getTableData();
    }

    // 重置选择项
    function resetSelection() {
      multipleSelection.value = [];
    }

    // 开关树的展开状态
    function toggleRowExpansion(...options: any) {
      console.log('toggleRowExpansion', options);
      baseTableRef.value?.toggleRowExpansion(...options);
    }

    props.immediate && getTableData();

    return {
      baseTableRef,
      loading,
      collapsed,
      currentPage,
      totalCount,
      pageSize,
      paginationPageSizes,
      paginationLayout,
      elTableOptionProps,

      dataSource,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      multipleSelection,

      checkAll,
      isIndeterminate,
      handleCheckAllChange,

      // 需要暴露给其他页面
      refresh,
      resetSelection,
      toggleRowExpansion
    };
  }
});
</script>

<style lang="scss" scoped>
.table-footer {
  padding: 0 24px 8px;
  height: 72px;
}
:deep(.el-table__empty-text) {
  line-height: 0;
}
.empty {
  padding-bottom: 20px;
  img {
    width: 140px;
    height: 98px;
  }
}
.fixed-table-footer-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 220px;
  z-index: 3;
  padding: 0 24px;
  width: calc(100% - 220px);
  height: 56px;
  background: #fff;
  border-top: 1px solid #e6e9eb;
  transition: left 0.3s;
  &.fixed-table-footer-bar--collapsed {
    left: 64px;
    width: calc(100% - 64px);
  }
}
</style>

<style lang="scss">
/* 表格 */
.g-base-table.el-table {
  .el-table__header-wrapper {
      // padding-top: 8px;
  }

  &.g-base-table--t-b {
      border-top: 1px solid #ebeef5;
  }

  th.el-table__cell {
      padding: 4px 0;

      &>.cell {
          font-size: 12px;
          color: #212529;
          font-weight: 500;
      }
  }

  .el-table__header tr:first-child .el-table__cell,
  .el-table__body td.el-table__cell {
      &:first-child {
          &>.cell {
              padding-left: 24px;
          }
      }

      &:last-child {
          &>.cell {
              padding-right: 24px;
          }
      }
  }
}
</style>
