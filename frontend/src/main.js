import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Elementplus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index'; // 引入路由配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // import Chinese locale
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(Elementplus, { locale: zhCn }).use(router).mount('#app');
