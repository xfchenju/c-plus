/*
 * @Description: 
 * @Author: chenju
 * @Date: 2022-11-30 18:35:33
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:09:10
 */
import { App } from 'vue'
import GSelect from './GSelect.vue';

GSelect.install = (App: App) => {
	App.component('GSelect', GSelect);
};

export { GSelect };
export default GSelect;
