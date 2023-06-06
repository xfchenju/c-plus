/*
 * @Description: 
 * @Author: chenju
 * @Date: 2022-11-30 18:35:33
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:14:05
 */
import { App } from 'vue'
import PageTableTabPane from './PageTableTabPane.vue';

PageTableTabPane.install = (App: App) => {
	App.component('PageTableTabPane', PageTableTabPane);
};

export { PageTableTabPane };
export default PageTableTabPane;
