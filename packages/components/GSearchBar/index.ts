/*
 * @Description: 
 * @Author: chenju
 * @Date: 2022-11-30 18:35:33
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:09:58
 */
import { App } from 'vue'
import GSearchBar from './GSearchBar.vue';

GSearchBar.install = (App: App) => {
	App.component('GSearchBar', GSearchBar);
};

export { GSearchBar };
export default GSearchBar;
