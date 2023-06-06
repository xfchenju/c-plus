/*
 * @Description:
 * @Author: chenju
 * @Date: 2022-01-17 10:56:24
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:24:17
 */
import { PropType } from 'vue';
import type { BaseTableProps } from '@/BaseTable';
import type { SearchButtonOptionsType, SearchOptionsType } from '../../types';
import { MultiplePageOptionType } from '../../types';

export const pageProps = {
  // 页面是否有边框
  border: {
    type: Boolean,
    default: false
  },
  // 页面圆角
  radius: {
    type: [String, Number],
    default: 0
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
  // 头部筛选字段
  headerSelectFiled: {
    type: String,
    default: ''
  },
  // 头部删选项值
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
  // 表格配置
  tableOptions: {
    type: Object as PropType<BaseTableProps>
  },
  // 空状态
  emptyTask: {
    type: Boolean,
    default: false
  },
  // 多页面配置
  multiplePageOption: {
    type: Array as PropType<MultiplePageOptionType>,
    default: () => {
      return [];
    }
  },
  // 阻止change事件emit的标志(用于主动修改searchFrom的值而不触发刷新)
  preventChangeEmitFlag: {
    type: Boolean,
    default: false
  }
};
