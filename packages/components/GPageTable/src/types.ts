/*
 * @Description: 类型声明
 * @Author: chenju
 * @Date: 2022-04-12 10:44:09
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:23:48
 */
import type { BaseTableProps } from '@/BaseTable';

// PageHeader组件的props入参类型
export interface PageHeaderProps {
  // 是否有返回图标
  isBack?: boolean;
  // 页面标题
  title?: string;
  // 头部筛选字段
  headerSelectFiled?: string;
  // 头部筛选项值
  headerSelectOption?: any[];
  // 搜索的form
  searchForm?: any;
  // 搜索的配置
  searchOptions?: SearchOptionsType[];
  // 头部右侧按钮配置
  searchButtonOptions?: SearchButtonOptionsType[];
}

// PageTable组件的props入参类型
export interface PageTableProps {
  // 页面是否有边框
  border?: boolean;
  // 页面圆角
  radius?: string | number;
  // 是否有返回图标
  isBack?: boolean;
  // 页面标题
  title?: string;
  // 头部筛选字段
  headerSelectFiled?: string;
  // 头部删选项值
  headerSelectOption?: any[];
  // 搜索的form
  searchForm?: any;
  // 搜索的配置
  searchOptions?: SearchOptionsType[];
  // 头部右侧按钮配置
  searchButtonOptions?: SearchButtonOptionsType[];
  // 表格配置
  tableOptions?: BaseTableProps;
  // 空状态
  emptyTask?: boolean;
  // 多页面配置
  multiplePageOption?: MultiplePageOptionType;
  // 阻止change事件emit的标志(用于主动修改searchFrom的值而不触发刷新)
  preventChangeEmitFlag?: boolean;
}

export type MultiplePageOptionType = Omit<PageTableProps, 'multiplePageOption'>[];

// usePageTable对外暴露的方法
export interface PageTableActionType {
  refresh: (isReset?: boolean) => void;
  setProps: (props: Partial<PageTableProps>) => void;
  resetSelection: () => void;
  getSelection: () => any[];
  toggleRowExpansion: (row: any, expanded: boolean) => void;
  // index为需要刷新的searchOptions的数组序号
  refreshSearchOptions: (index?: number | number[]) => void;
  getTotal: () => number;
  clearData: () => void;
}

// 搜索的配置
export interface SearchOptionsType {
  // 搜索框名称
  name: string;
  // 搜索框字段
  field: string;
  // 搜索框类型
  type: 'input' | 'select' | 'datePicker' | 'cascader' | 'button' | 'radio';
  dateType?: string; //当type=datePicker 必填 类型参考el-date-picker 的type
  // 占位文字
  placeholder?: string;
  // 占位文字 start 用于dataPicker
  startPlaceholder?: string;
  // 占位文字 end 用于dataPicker
  endPlaceholder?: string;
  // type为select/radio时必填，option列表
  fixedOption?: string;
  // type为select/radio/cascader时, 具体的option列表
  options?: LabelValueOptions[] | any[];
  // type为select/radio时并且选项列表需要从接口获取的
  loadData?: Fn<Promise<any>>;
  // uuid 用于异步获取的选项列表
  uuid?: string;
  // select等选中的v-model的取值字段
  valueField?: string;
  // 是否可以清空
  allowClear?: boolean;
  // 选择框字段，当type为input&select时必填
  // NOTE 增加全部选项，当selectField对应的表单值为null时即为选择到全部
  selectField?: string;
  // 选择框名称，用户type为input&select时
  selectName?: string;
  format?: string; // 当type=datePicker 才生效
  // type为select时，远程获取option列表
  remoteMethod?: (query: string) => Promise<any[]>;
  // 按钮的方法
  buttonMethod?: Fn;
  // 按钮的图标
  buttonIcon?: any;
  // 按钮的类型
  buttonType?: '' | 'default' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'text';
  // type为select时，一些配置信息
  selectOption?: SelectOptionType;
  // 样式
  style?: string;
  // radio 数组
  radioArr?: any;
}

// type为select时，一些配置信息
interface SelectOptionType {
  // 是否自适应宽度
  autoWidth: boolean;
  // 自适应宽度时初始宽度
  defaultAutoWidth?: number;
  // 自适应宽度时最大宽度
  maxAutoWidth?: number;
}

// 头部右侧按钮配置
export interface SearchButtonOptionsType {
  icon?: any;
  type?: '' | 'default' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'text';
  clickFn?: Fn;
  name?: string;
}
