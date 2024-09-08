import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Elementplus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).
    use(Elementplus).mount('#app')
