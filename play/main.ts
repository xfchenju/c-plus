import { createApp } from 'vue';
import App from './App.vue';
import CIcon from '@c-plus/components/icon'
import '@c-plus/theme-chalk/src/index.scss';

const app = createApp(App);
app.use(CIcon)
app.mount('#app')