import { createApp, ref } from 'vue';
import App from './App.vue';
// import { CTopMenu } from '@c-plus/components'
import CPlus from '@c-plus/components'
import '@c-plus/theme-chalk/src/index.scss';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element.scss'
// import { navbarMenuConfiguration } from './config';
// import type { ConfigProviderProps } from '@c-plus/components';
// import { SubAppPathEnum } from '@c-plus/components';
import { get, post } from './utils/http';

// const CommonModuleConfig: any = {
//   CURRENT_PLATFORM: 'MAIN',
//   CURRENT_PLATFORM_PATH: SubAppPathEnum.MAIN
// }

// setTimeout(() => {
//   console.log('222')
//   CommonModuleConfig.CURRENT_PLATFORM = 'CMD'
// }, 3000)

const app = createApp(App);
app.use(ElementPlus)
app.use(CPlus)

// function get() {
//   console.log('get')
// }

// function post() {
//   console.log('post')
// }

// app.component('CTopMenu', CTopMenu)
app.mount('#app')