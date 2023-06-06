<!--
 * @Description: 
 * @Author: chenju
 * @Date: 2022-01-14 14:18:37
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:13:09
-->
<template>
  <div
    class="header-top"
    v-if="!hasTabs"
    :class="searchOptions?.length ? 'header-top__bottom-border' : ''"
  >
    <div class="g-flex-start-center">
      <g-icon
        type="g-fanhui"
        class="g-cur-poi g-mr8"
        @click="handleGoBack"
        style="color: #000000"
        v-if="isBack"
      ></g-icon>
      <slot name="titleIcon"></slot>
      <span class="header-title">{{ title }}</span>
    </div>
    <div class="header-right g-flex">
      <slot name="headerRightButton">
        <template
          v-for="(searchButton, searchButtonIndex) in searchButtonOptions"
          :key="searchButtonIndex"
        >
          <template v-if="searchButton.name">
            <el-button
              :icon="
                searchButton.icon && typeof searchButton.icon !== 'string'
                  ? searchButton.icon
                  : undefined
              "
              :type="searchButton.type || 'default'"
              @click="searchButton.clickFn"
            >
              <g-icon
                class="g-mr4"
                :type="searchButton.icon"
                v-if="searchButton.icon && typeof searchButton.icon === 'string'"
              ></g-icon>
              {{ searchButton.name }}</el-button
            >
          </template>
          <template v-else>
            <el-button
              :icon="
                searchButton.icon && typeof searchButton.icon !== 'string'
                  ? searchButton.icon
                  : undefined
              "
              :type="searchButton.type || 'default'"
              style="width: 32px"
              @click="searchButton.clickFn"
            >
              <g-icon
                :type="searchButton.icon"
                v-if="searchButton.icon && typeof searchButton.icon === 'string'"
              ></g-icon
            ></el-button>
          </template>
        </template>
      </slot>
    </div>
  </div>
  <div class="header-top header-top--hastabs" v-else>
    <slot name="headerRightButton">
      <template
        v-for="(searchButton, searchButtonIndex) in searchButtonOptions"
        :key="searchButtonIndex"
      >
        <template v-if="searchButton.name">
          <el-button
            :icon="
              searchButton.icon && typeof searchButton.icon !== 'string'
                ? searchButton.icon
                : undefined
            "
            :type="searchButton.type || 'default'"
            @click="searchButton.clickFn"
          >
            <g-icon
              class="g-mr4"
              :type="searchButton.icon"
              v-if="searchButton.icon && typeof searchButton.icon === 'string'"
            ></g-icon>
            {{ searchButton.name }}</el-button
          >
        </template>
        <template v-else>
          <el-button
            :icon="
              searchButton.icon && typeof searchButton.icon !== 'string'
                ? searchButton.icon
                : undefined
            "
            :type="searchButton.type || 'default'"
            style="width: 32px"
            @click="searchButton.clickFn"
          >
            <g-icon
              :type="searchButton.icon"
              v-if="searchButton.icon && typeof searchButton.icon === 'string'"
            ></g-icon
          ></el-button>
        </template>
      </template>
    </slot>
  </div>
  <g-search-bar
    ref="searchBarRef"
    :searchForm="searchForm"
    :searchOptions="searchOptions"
    :preventChangeEmitFlag="preventChangeEmitFlag"
    @change="handleSearchChange"
  ></g-search-bar>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed, reactive, toRaw, PropType, inject } from 'vue';
import { debounce } from 'lodash';
// import { useRouter } from 'vue-router';
// import { store } from '@/store';
// import { AppMutationTypes } from '@/store/modules/app/mutation-types';
import GSearchBar from '@/GSearchBar';
import type { SearchOptionsType, SearchButtonOptionsType } from '@/GPageTable';
export default defineComponent({
  name: 'GPageHeader',
  components: {
    GSearchBar
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    // 是否有返回图标
    isBack: {
      type: Boolean,
      default: false
    },
    // 页面标题
    title: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 头部筛选字段
    headerSelectFiled: {
      type: String,
      default: ''
    },
    // 头部筛选项值
    headerSelectOption: {
      type: Array as PropType<any[]>,
      default: () => {
        return [];
      }
    },
    // 搜索的form
    searchForm: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      }
    },
    // 搜索的配置
    searchOptions: {
      type: Array as PropType<SearchOptionsType[]>,
      default: () => {
        return [];
      }
    },
    // 头部右侧按钮配置
    searchButtonOptions: {
      type: Array as PropType<SearchButtonOptionsType[]>,
      default: () => {
        return [];
      }
    },
    // 阻止change事件emit的标志(用于主动修改searchFrom的值而不触发刷新)
    preventChangeEmitFlag: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'update:searchForm', 'update:headerSelectValue', 'update:active'],
  setup(props, { emit }) {
    const searchBarRef = ref();
    const activeComputed = computed({
      get: () => {
        return props.active;
      },
      set: val => {
        emit('update:active', val);
      }
    });
    // const router = useRouter();
    const componentSearchForm = reactive(props.searchForm);
    // 记录初始值
    const defaultSearchForm = reactive(JSON.parse(JSON.stringify(toRaw(props.searchForm))));
    console.log('开始测试', componentSearchForm, defaultSearchForm);

    watch(
      componentSearchForm,
      componentSearchForm => {
        console.log('searchForm数据改变', componentSearchForm);
        emit('update:searchForm', componentSearchForm);
      },
      {
        // 使用deep时，监听对象/数组的旧值与新值相同。
        deep: true
      }
    );

    // 左侧筛选label
    const headerSelectName = computed<string>(() => {
      if (props.headerSelectFiled) {
        return (
          props.headerSelectOption.find(n => n.value === props.searchForm[props.headerSelectFiled])
            ?.label || '-'
        );
      } else {
        return '';
      }
    });

    watch(
      () => headerSelectName.value,
      val => {
        // store.commit(AppMutationTypes.SET_TEMP_TASK_NAME, val);
      }
    );

    // 左侧筛选改变
    const handleHeaderSelectCommand = (e: any) => {
      emit('update:headerSelectValue', e);
      componentSearchForm[props.headerSelectFiled] = e;
      handleSearchChange();
    };
    // select change
    const handleSelectChange = (value: any, option: any) => {
      console.log('handleSelectChange', value, option);
      handleSearchChange();
    };
    // 处理搜索改变事件
    const handleSearchChange = () => {
      console.log('header触发改变事件', componentSearchForm);
      emit('change');
    };
    // 处理输入框改变事件
    const handleInputChange = debounce(() => {
      handleSearchChange();
    }, 600);

    const handleGoBack = () => {
      console.log('handleGoBack')
      // router.go(-1);
    };

    const hasTabs = ref(false);
    const tabsRoot = inject('pageTabRootContext', false);
    if (tabsRoot) {
      hasTabs.value = true;
    }

    // 用于刷新searchOption的配置信息
    function refreshSearchOptions(index?: number | number[]) {
      console.log('refreshSearchOptions', refreshSearchOptions);
      if (typeof index !== 'undefined') {
        searchBarRef.value?.refreshSearchOptions(index);
      } else {
        searchBarRef.value?.refreshSearchOptions();
      }
    }
    return {
      componentSearchForm,
      headerSelectName,
      handleHeaderSelectCommand,
      handleInputChange,
      handleSelectChange,
      handleSearchChange,
      handleGoBack,
      activeComputed,
      searchBarRef,
      refreshSearchOptions,
      hasTabs
    };
  }
});
</script>
<style lang="scss" scoped>
.table-header {
  padding: 0 16px 0 24px;
  width: 100%;
  height: 56px;
  .table-header__left,
  .table-header__right {
    height: 100%;
  }
  .header-input {
    width: 220px;
  }

  .header-select {
    width: 106px;
  }
  :deep(.el-button + .el-button) {
    margin-left: 8px;
  }
}
.header-top {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: #fff;
  padding: 0 24px;
  &.header-top__bottom-border {
    border-bottom: 1px solid #e4e7ed;
  }
  &.header-top--hastabs {
    margin-top: -56px;
    width: 50%;
    float: right;
    justify-content: flex-end;
  }
  .header-title {
    font-size: 16px;
    font-weight: bold;
    color: #212529;
    line-height: 12px;
  }
}
.header-filter {
  width: 100%;
  padding: 12px 20px;
  background: #f6f9fa;
  box-shadow: 0px 2px 4px 0px #f5f9fa, 0px 2px 4px -4px #eceff0;
}
.line {
  width: 1px;
  height: 32px;
  background: #ebeef5;
  border-radius: 4px 4px 0px 0px;
  margin-left: 24px;
}
.tab {
  position: relative;
  min-width: 80px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #212529;
  height: 56px;
  cursor: pointer;
}
.tab::after {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-bottom: 2px solid #03ac82;
  transform: scale(0.0001);
  opacity: 0;
  transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
    opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
  content: '';
}
.is-active::after {
  opacity: 1;
  transform: scale(1);
  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
    opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
