/*
 * @Description: 暴露组件和类型
 * @Author: chenju
 * @Date: 2022-04-12 10:37:37
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:19:55
 */
import { App } from 'vue'
import { GPageTable, useGPageTable } from './src/PageTableNew';
import {
  PageTableProps,
  PageHeaderProps,
  SearchButtonOptionsType,
  SearchOptionsType
} from './src/types';

GPageTable.install = (App: App) => {
	App.component('GPageTable', GPageTable);
};

export type { PageHeaderProps, SearchButtonOptionsType, SearchOptionsType, PageTableProps };

export {
  GPageTable,
  GPageTable as PageTableNew,
  useGPageTable as usePageTable,
  // GPageHeader,
  // GPageTableTabs,
  // GPageTableTabPane
};

export default GPageTable;
