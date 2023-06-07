import { createApp } from 'vue';
import App from './App.vue';
// import { CTopMenu } from '@c-plus/components'
import CPlus from '@c-plus/components'
import '@c-plus/theme-chalk/src/index.scss';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/element.scss'
import { navbarMenuConfiguration } from './config';


const app = createApp(App);
app.use(ElementPlus)
app.use(CPlus, { 
  navbarConfig: navbarMenuConfiguration
})

// app.component('CTopMenu', CTopMenu)
app.mount('#app')