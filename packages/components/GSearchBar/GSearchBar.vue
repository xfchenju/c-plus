<!--
 * @Description: 搜索栏
 * @Author: qingyang
 * @Date: 2022-03-21 14:03:51
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-02 18:34:13
-->

<template>
  <div
    class="search-wrap"
    :class="searchOptions && searchOptions.length ? '' : 'search-wrap-no-padding'"
  >
    <el-space wrap>
      <template v-for="(searchBoxItem, searchBoxIndex) in searchOptions" :key="searchBoxIndex">
        <template v-if="searchBoxItem.type === 'input'">
          <el-input
            class="header-input"
            v-model="componentSearchForm[searchBoxItem.field]"
            type="text"
            :placeholder="searchBoxItem.placeholder || `${searchBoxItem.name}`"
            @input="handleInputChange"
            :clearable="searchBoxItem.allowClear === false ? false : true"
            :style="searchBoxItem.style"
            :suffix-icon="h(GIcon, { type: 'g-sousuo' })"
          >
          </el-input>
        </template>
        <template v-else-if="searchBoxItem.type === 'radio'">
          <el-radio-group
            v-model="componentSearchForm[searchBoxItem.field]"
            @change="handleSelectChange"
          >
            <template v-for="(itm, i) in searchBoxItem.radioArr" :key="i">
              <el-radio-button
                v-if="itm.btnPermission"
                :label="itm.label"
                v-btnPermission="itm.btnPermission"
                >{{ itm.value }}</el-radio-button
              >
              <el-radio-button v-else :label="itm.label">{{ itm.value }}</el-radio-button>
            </template>
          </el-radio-group>
        </template>
        <template v-else-if="searchBoxItem.type === 'select'">
          <GSelect
            :ref="(el: any) => setSelectRef(searchBoxItem, el)"
            size="default"
            class="header-select"
            v-model="componentSearchForm[searchBoxItem.field]"
            :placeholder="searchBoxItem.placeholder || `${searchBoxItem.name}`"
            v-bind="handleBind(searchBoxItem)"
            @change="handleSelectChange"
            :clearable="searchBoxItem.allowClear === false ? false : true"
            :prop-options="getOptions(searchBoxItem)"
            @visible-change="handleVisibleChange($event, searchBoxItem)"
            :style="searchBoxItem.style"
          >
            <template #prefix v-if="Object.keys(handleBind(searchBoxItem)).includes('remote')">
              <g-icon class="header-select--remote-icon" type="g-sousuo"></g-icon>
            </template>
            <el-option
              v-for="(item, index) in getOptions(searchBoxItem)"
              :key="index"
              :value="searchBoxItem.valueField ? item[searchBoxItem.valueField] : item.value"
              :label="item.label"
            ></el-option>
          </GSelect>
        </template>
        <template v-else-if="searchBoxItem.type === 'cascader'">
          <el-cascader
            class="header-select"
            v-model="componentSearchForm[searchBoxItem.field]"
            :placeholder="searchBoxItem.placeholder || `${searchBoxItem.name}`"
            v-bind="handleBind(searchBoxItem)"
            :props="{
              emitPath: false
            }"
            @change="handleSelectChange"
            :clearable="searchBoxItem.allowClear === false ? false : true"
            :options="getOptions(searchBoxItem)"
            :style="searchBoxItem.style"
          >
          </el-cascader>
        </template>
        <template v-else-if="searchBoxItem.type === 'datePicker'">
          <el-date-picker
            size="default"
            :type="searchBoxItem.dateType"
            v-model="componentSearchForm[searchBoxItem.field]"
            @change="handleInputChange"
            range-separator="-"
            :start-placeholder="`${searchBoxItem?.startPlaceholder ?? '起始时间'}`"
            :end-placeholder="`${searchBoxItem?.endPlaceholder ?? '截止时间'}`"
            :placeholder="searchBoxItem.placeholder || `${searchBoxItem.name}`"
            :value-format="searchBoxItem.format || 'YYYY/MM/DD'"
            :default-time="searchBoxItem.dateType == 'datetimerange' ? defaultTime2 : defaultTime1"
            :style="searchBoxItem.style"
            :clearable="searchBoxItem.allowClear === false ? false : true"
            :unlink-panels="true"
          ></el-date-picker>
        </template>
        <template v-else-if="searchBoxItem.type === 'button'">
          <template v-if="searchBoxItem.name">
            <el-button
              :icon="
                searchBoxItem.buttonIcon && typeof searchBoxItem.buttonIcon !== 'string'
                  ? searchBoxItem.buttonIcon
                  : undefined
              "
              :type="searchBoxItem.buttonType || 'default'"
              @click="searchBoxItem.buttonMethod"
            >
              <g-icon
                class="g-mr4"
                :type="searchBoxItem.buttonIcon"
                v-if="searchBoxItem.buttonIcon && typeof searchBoxItem.buttonIcon === 'string'"
              ></g-icon>
              {{ searchBoxItem.name }}</el-button
            >
          </template>
          <template v-else>
            <el-button
              :icon="
                searchBoxItem.buttonIcon && typeof searchBoxItem.buttonIcon !== 'string'
                  ? searchBoxItem.buttonIcon
                  : undefined
              "
              :type="searchBoxItem.buttonType || 'default'"
              @click="searchBoxItem.buttonMethod"
              :style="searchBoxItem.style"
            >
              <g-icon
                :type="searchBoxItem.buttonIcon"
                v-if="searchBoxItem.buttonIcon && typeof searchBoxItem.buttonIcon === 'string'"
              ></g-icon
            ></el-button>
          </template>
        </template>
      </template>
    </el-space>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, PropType, h, nextTick } from 'vue';
import type { SearchOptionsType } from '@/GPageTable';
import * as selectOptions from '@/constants/enum';
import { buildUUID } from '@c-plus/utils';
import { debounce } from 'lodash';
import GSelect from '../GSelect';
import GIcon from '../GIcon';

export default defineComponent({
  name: 'GSearchBar',
  components: {
    GSelect
  },
  props: {
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
    // 阻止change事件emit的标志(用于主动修改searchFrom的值而不触发刷新)
    preventChangeEmitFlag: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const componentSearchForm = reactive(props.searchForm);
    // select change
    const handleSelectChange = (value: any, option: any) => {
      console.log('handleSelectChange', value, option);
      if (props.preventChangeEmitFlag === true) return;
      handleSearchChange();
    };
    // 处理搜索改变事件
    const handleSearchChange = () => {
      emit('change', componentSearchForm);
    };
    // 处理输入框改变事件
    const handleInputChange = debounce(() => {
      handleSearchChange();
    }, 600);

    // 绑定参数
    function handleBind(searchBoxItem: SearchOptionsType) {
      const bindObj = {};
      if (searchBoxItem.remoteMethod) {
        Object.assign(bindObj, {
          remote: true,
          filterable: true,
          'remote-method': (query: string) => handleRemoteMethod(query, searchBoxItem),
          class: 'header-select--remote'
        });
      }

      // 是否自适应宽度
      if (searchBoxItem?.selectOption?.autoWidth) {
        Object.assign(bindObj, {
          autoWidth: searchBoxItem.selectOption.autoWidth
        });
        if (searchBoxItem?.selectOption?.defaultAutoWidth) {
          Object.assign(bindObj, {
            defaultAutoWidth: searchBoxItem.selectOption.defaultAutoWidth
          });
        }

        if (searchBoxItem?.selectOption?.maxAutoWidth) {
          Object.assign(bindObj, {
            maxAutoWidth: searchBoxItem.selectOption.maxAutoWidth
          });
        }
      }

      console.log('handleBind', bindObj, searchBoxItem);

      return bindObj;
    }

    // 远程获取选项数据
    function handleRemoteMethod(query: string, searchBoxItem: SearchOptionsType) {
      if (!searchBoxItem.remoteMethod) return;
      const result = searchBoxItem.remoteMethod(query);
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result.then((res: any) => {
          console.log('handleRemoteMethod res', res);
          asyncOptions.value[searchBoxItem.uuid as string] = res;
        });
      }
    }

    // 用于搜索select在筛选项出现时重新执行全量搜素，用于再次打开时能选择全部数据
    function handleVisibleChange(val: any, searchBoxItem: SearchOptionsType) {
      console.log('val', val, 'searchBoxItem', searchBoxItem);
      if (!searchBoxItem.remoteMethod) return;
      if (val) {
        handleRemoteMethod('', searchBoxItem);
      } else {
        nextTick(() => {
          // 选中后失焦
          if (searchBoxItem.uuid && searchBoxItem.uuid in SELECT_REF) {
            SELECT_REF[searchBoxItem.uuid]?.blur();
          }
        });
      }
    }

    // 异步获取的选项列表
    const asyncOptions = ref<any>({});

    // 获取选项列表
    const getOptions = (searchBoxItem: SearchOptionsType) => {
      console.log('getOptions', searchBoxItem);
      if (searchBoxItem?.options?.length) {
        return searchBoxItem.options;
      } else if (searchBoxItem.loadData && searchBoxItem.uuid) {
        // 需要异步获取的
        return asyncOptions.value[searchBoxItem.uuid];
      } else if (searchBoxItem.fixedOption) {
        return (selectOptions as any)[searchBoxItem.fixedOption] || [];
      } else if (searchBoxItem.remoteMethod && searchBoxItem.uuid) {
        // 需要异步获取的
        return asyncOptions.value[searchBoxItem.uuid];
      }
      return [];
    };

    // 处理异步选项获取
    const preformAsyncOptions = (searchOptions: SearchOptionsType[]) => {
      for (let i in searchOptions) {
        if (searchOptions[i].loadData) {
          searchOptions[i].uuid = buildUUID();
          asyncOptions.value[searchOptions[i].uuid as string] = [];
          const result = (searchOptions[i] as any).loadData();
          if (
            (typeof result === 'object' || typeof result === 'function') &&
            typeof result.then === 'function'
          ) {
            result.then((res: any) => {
              console.log('loadData res', res);
              asyncOptions.value[searchOptions[i].uuid as string] = res;
            });
          }
        } else if (searchOptions[i].remoteMethod) {
          searchOptions[i].uuid = buildUUID();
          asyncOptions.value[searchOptions[i].uuid as string] = [];
          const result = (searchOptions[i] as any).remoteMethod('');
          if (
            (typeof result === 'object' || typeof result === 'function') &&
            typeof result.then === 'function'
          ) {
            result.then((res: any) => {
              console.log('loadData res', res);
              asyncOptions.value[searchOptions[i].uuid as string] = res;
            });
          }
        }
      }
    };

    // 处理异步选项获取
    preformAsyncOptions(props.searchOptions);
    const defaultTime2 = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]; // '12:00:00', '08:00:00'
    const defaultTime1 = [new Date(2000, 1, 1, 0, 0, 0)]; // '12:00:00', '08:00:00'
    // 用于刷新searchOption的配置信息
    // index为需要刷新的searchOptions的数组序号
    function refreshSearchOptions(index?: number | number[]) {
      console.log('refreshSearchOptions', refreshSearchOptions);
      if (typeof index === 'undefined') {
        preformAsyncOptions(props.searchOptions);
      } else {
        let needRefreshIndexArr = [];
        if (typeof index === 'number') {
          needRefreshIndexArr = [props.searchOptions[index]];
        } else {
          for (let i = 0; i < index.length; i++) {
            needRefreshIndexArr.push(props.searchOptions[index[i]]);
          }
        }
        if (needRefreshIndexArr && needRefreshIndexArr.length) {
          preformAsyncOptions(needRefreshIndexArr);
        }
      }
    }

    // 用于失焦select的
    const SELECT_REF: any = {};
    function setSelectRef(row: SearchOptionsType, el: HTMLElement) {
      if (!el || !row?.uuid) return;
      SELECT_REF[row.uuid] = el;
    }
    return {
      componentSearchForm,
      handleInputChange,
      handleSelectChange,
      getOptions,
      handleBind,
      handleVisibleChange,
      handleRemoteMethod,
      defaultTime2,
      defaultTime1,
      GIcon,
      h,
      refreshSearchOptions,
      preformAsyncOptions,
      setSelectRef
    };
  }
});
</script>
<style lang="scss" scoped>
.search-wrap {
  padding: 12px 24px;
  width: 100%;
  display: flex;
  background: #f6f9fa;
  box-shadow: 0px 2px 4px 0px #f5f9fa, 0px 2px 4px -4px #eceff0;
  border-bottom: 1px solid #e4e7ed;
  &.search-wrap-no-padding {
    padding: 0;
    box-shadow: none;
  }
  .header-input {
    width: 240px;
  }

  .header-select {
    width: 106px;
  }

  // 远程搜索的select需要增加搜索图标
  .header-select--remote {
    width: 240px;
    .header-select--remote-icon {
      // color: #5f6677;
    }
    :deep(.el-input__inner) {
      padding-left: 11px !important;
    }
    :deep(.el-input__prefix) {
      right: 12px;
      left: auto;
    }
    :deep(.el-input__suffix) {
      background: #fff;
      top: 4%;
      height: 90%;
    }
  }
  :deep(.el-button + .el-button) {
    margin-left: 8px;
  }
}
</style>
