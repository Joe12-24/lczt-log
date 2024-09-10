// src/http.ts
import axios from 'axios';
// 创建 Axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:8080', // 根据实际情况修改
    timeout: 10000, // 设置请求超时时间
});
// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('authToken');
    // 如果 token 存在，添加到请求头
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // 处理响应错误
    console.error('请求失败:', error);
    return Promise.reject(error);
});
export default instance;
