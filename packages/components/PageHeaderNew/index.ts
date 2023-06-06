/*
 * @Description: 页面头部
 * @Author: chenju
 * @Date: 2022-01-14 14:18:24
 * @LastEditors: chenju
 * @LastEditTime: 2022-12-01 11:18:01
 */
import { App } from 'vue'
import GPageHeader from './src/PageHeader.vue';
import type { PageHeaderProps, SearchButtonOptionsType, SearchOptionsType } from '@/GPageTable';

GPageHeader.install = (App: App) => {
	App.component('GPageHeader', GPageHeader);
};

export { GPageHeader, PageHeaderProps, SearchButtonOptionsType, SearchOptionsType };
export default GPageHeader;