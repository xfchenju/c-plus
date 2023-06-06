/*
 * @Description: 基础表格
 * @Author: chenju
 * @Date: 2022-01-13 16:16:11
 * @LastEditors: chenju
 * @LastEditTime: 2022-11-30 18:28:34
 */

import { App } from 'vue'
import BaseTable from './src/BaseTable.vue';
import type { BaseTableProps } from './src/types';

BaseTable.install = (App: App) => {
	App.component('BaseTable', BaseTable);
};

export { BaseTable, BaseTableProps };
export default BaseTable;
