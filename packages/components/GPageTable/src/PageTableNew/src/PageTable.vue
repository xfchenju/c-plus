<!--
 * @Description: 页面表格
 * @Author: chenju
 * @Date: 2022-01-13 18:49:18
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-02 18:33:27
-->
<template>
  <div
    class="page-table-container"
    :class="getPageTableProps.border ? 'page-table-container--border' : ''"
    :style="pageStyle"
  >
    <GPageHeader
      ref="pageHeaderRef"
      v-bind="getHeaderProps"
      v-model:searchForm="localSearchForm"
      @change="handleSearch"
    >
      <template #headerRightButton>
        <slot name="headerRightButton"></slot>
      </template>
    </GPageHeader>
    <slot name="emptyTask" v-if="getPageTableProps.emptyTask">
      <g-no-task></g-no-task>
    </slot>
    <template v-else>
      <div class="table-header-tips" v-if="$slots.headerTips">
        <slot name="headerTips"></slot>
      </div>
      <base-table
        ref="tableRef"
        v-bind="getTableProps"
        v-if="getTableProps && Object.keys(getTableProps).length"
      >
        <template #default>
          <slot></slot>
        </template>
        <template #batchOperaBtns="{ selection }">
          <slot name="batchOperaBtns" :selection="selection"></slot>
        </template>
      </base-table>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, computed, unref } from 'vue';
import { BaseTable, BaseTableProps } from '@/BaseTable';
import { GPageHeader, PageHeaderProps } from '@/PageHeaderNew';
import type { PageTableProps, PageTableActionType } from '../../types';
import { pageProps } from './props';
import GNoTask from '@/GNoTask';
export default defineComponent({
  name: 'GPageTable',
  components: {
    BaseTable,
    GPageHeader,
    GNoTask
  },
  props: pageProps,
  emits: ['update:searchForm', 'register', 'sort-change'],
  setup(props, { emit }) {
    const pageHeaderRef = ref();
    const tableRef = ref();
    // 页面样式
    const pageStyle = computed(() => {
      const style = {};
      const borderRadius = getProps.value?.radius || 0;

      if (borderRadius) {
        let radius = '';
        if (typeof borderRadius === 'number') {
          radius = borderRadius + 'px';
        } else {
          if (borderRadius.indexOf('px') > -1) {
            radius = borderRadius;
          } else {
            radius = borderRadius + 'px';
          }
        }
        Object.assign(style, {
          borderRadius: radius,
          overflow: 'hidden'
        });
      }

      return style;
    });

    // all props
    const innerPropsRef = ref<Partial<PageTableProps>>();

    // all props
    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as PageTableProps;
    });

    // only page table props
    const getPageTableProps = computed<Pick<PageTableProps, 'border' | 'emptyTask'>>(() => {
      return {
        border: unref(getProps).border,
        emptyTask: unref(getProps).emptyTask
      };
    });

    // header props
    const getHeaderProps = computed<Omit<PageHeaderProps, 'searchForm'>>(() => {
      const params = {
        title: unref(getProps).title,
        isBack: unref(getProps).isBack,
        searchOptions: unref(getProps).searchOptions,
        searchButtonOptions: unref(getProps).searchButtonOptions,
        headerSelectOption: unref(getProps).headerSelectOption,
        headerSelectFiled: unref(getProps).headerSelectFiled,
        preventChangeEmitFlag: unref(getProps).preventChangeEmitFlag

        // 'v-model:searchForm': localSearchForm
      };
      // 如果为数据为空
      if (unref(getProps).emptyTask === true) {
        params.searchOptions = [];
        params.searchButtonOptions = [];
        params.headerSelectOption = [];
        params.headerSelectFiled = undefined;
      }
      return params;
    });

    // table props
    const getTableProps = computed<BaseTableProps>(() => {
      const params = unref(getProps).tableOptions as BaseTableProps;
      return params
    });

    // 当前组件的searchForm
    const localSearchForm = reactive(props.searchForm);

    // 监听localSearchForm的变化，用于修改父组件的searchForm
    watch(
      localSearchForm,
      localSearchForm => {
        console.log('searchForm数据改变', localSearchForm);
        emit('update:searchForm', localSearchForm);
      },
      {
        // 使用deep时，监听对象/数组的旧值与新值相同。
        deep: true
      }
    );

    // 搜索方法
    function handleSearch() {
      console.log('TablePage handleSearch', localSearchForm);
      refresh(true);
    }

    /**
     * @Description: 刷新表格
     * @param {*} isReset 是否重置页码
     * @return {*}
     */
    function refresh(isReset = false) {
      tableRef.value.refresh(isReset);
    }

    function setProps(props: Partial<PageTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      console.log('innerPropsRef', innerPropsRef.value);
    }

    // 重置selection选项
    function resetSelection() {
      tableRef.value.resetSelection();
    }

    // 获取selection选项
    function getSelection() {
      return tableRef.value.multipleSelection;
    }

    // 开关树的展开状态
    function toggleRowExpansion(...options: any) {
      console.log('toggleRowExpansion', options);
      tableRef.value?.toggleRowExpansion(...options);
    }

    // 用于刷新searchOption的配置信息
    function refreshSearchOptions(index?: number | number[]) {
      console.log('refreshSearchOptions', refreshSearchOptions);
      if (typeof index !== 'undefined') {
        pageHeaderRef.value?.refreshSearchOptions(index);
      } else {
        pageHeaderRef.value?.refreshSearchOptions();
      }
    }

    // 获取列表总数
    const getTotal = () => {
      return tableRef.value?.totalCount || 0;
    };

    const clearData = () => {
      tableRef.value.dataSource = [];
    };
    const pageTableAction: PageTableActionType = {
      refresh,
      setProps,
      resetSelection,
      getSelection,
      toggleRowExpansion,
      refreshSearchOptions,
      getTotal,
      clearData
    };

    emit('register', pageTableAction);

    return {
      pageHeaderRef,
      tableRef,
      pageStyle,
      localSearchForm,
      handleSearch,
      setProps,
      refresh,
      getTotal,
      clearData,
      getPageTableProps,
      getHeaderProps,
      getTableProps
    };
  }
});
</script>
<style lang="scss" scoped>
.page-table-container {
  background: #fff;
  height: 100%;
}
.page-table-container--border {
  border: 1px solid #e4e7ed;
  border-bottom: none;
}
.table-header-tips {
  padding: 0 24px;
  width: 100%;
  min-height: 32px;
}
</style>
