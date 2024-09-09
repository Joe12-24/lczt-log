import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'; // 引入路由配置
createApp(App).
    use(Elementplus).use(router).mount('#app')
