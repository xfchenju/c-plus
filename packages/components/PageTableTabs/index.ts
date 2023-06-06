/*
 * @Description: 
 * @Author: chenju
 * @Date: 2022-11-30 18:35:33
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:14:25
 */
import { App } from 'vue'
import PageTableTabs from './PageTableTabs.vue';

PageTableTabs.install = (App: App) => {
	App.component('PageTableTabs', PageTableTabs);
};

export { PageTableTabs };
export default PageTableTabs;
