/*
 * @Description: 
 * @Author: chenju
 * @Date: 2022-11-30 18:35:33
 * @LastEditors: chenju
 * @LastEditTime: 2022-11-30 18:36:50
 */
import { App } from 'vue'
import GNoTask from './GNoTask.vue';

GNoTask.install = (App: App) => {
	App.component('GNoTask', GNoTask);
};

export { GNoTask };
export default GNoTask;
