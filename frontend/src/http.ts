// src/http.ts
import axios from 'axios';
import router from './router'; // 确保引入了正确的 router 实例
import { nextTick } from 'vue';
// 创建 Axios 实例
const instance = axios.create({
  baseURL: 'http://10.168.103.6:8001/lczt-log-back/', // 根据实际情况修改
  // baseURL: 'http://127.0.0.1:8080/lczt-log-back/', // 根据实际情况修改
  timeout: 10000, // 设置请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('authToken');

    // 如果 token 存在，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 处理响应错误
    console.error('请求失败:', error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken'); // 清除本地 token

      // 使用 nextTick 确保页面跳转
      nextTick(() => {
        router.push({ name: 'Login' });
      });
    }
    return Promise.reject(error);
  }
);
export default instance;
