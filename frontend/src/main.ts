import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'; // 引入路由配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // import Chinese locale


createApp(App).
    use(Elementplus, { locale: zhCn  }).use(router).mount('#app')
