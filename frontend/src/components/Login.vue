<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-container">
        <el-icon><i class="el-icon-document"></i></el-icon>
           <img src="../assets/img.png" class="mr-3 w-10 h-10" alt="Favicon">

        <h1>后台日志查询</h1>
      </div>
      <el-form :model="formInline" class="login-form" label-position="top">
        <el-form-item label="账号">
          <el-input
            v-model="formInline.username"
            placeholder="请输入账号"
            prefix-icon="Avatar"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formInline.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
          />

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import http from '@/http'; // 确保路径正确
import axios from 'axios';
import { useRouter } from 'vue-router'; // 导入 useRouter
const formInline = ref({
  username: '',
  password: ''
});

const errorMessage = ref('');
const router = useRouter(); // 使用 useRouter 获取 router 实例
const login = async () => {
  if (formInline.value.username && formInline.value.password) {
    try {
      const response = await http.post(
        '/login',
        new URLSearchParams({
          username: formInline.value.username,
          password: formInline.value.password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const { code, message, data } = response.data;

      if (code === 200 && data) {
        localStorage.setItem('authToken', data); // 存储 token
        await router.push('/query'); // 使用 router 进行页面跳转
      } else {
        errorMessage.value = message || 'Login failed'; // 显示错误信息
      }
    } catch (error) {
      console.error('Login error:', error);
      errorMessage.value = 'An error occurred while logging in'; // 处理请求错误
    }
  } else {
    errorMessage.value = 'Username and Password cannot be empty'; // 显示表单验证错误
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background-color: #f5f5f5;
   background-color: rgba(224, 242, 254, 1);
}

.login-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title-container {

  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;
}

.title-container el-icon {
  margin-right: 8px;
  color: #409eff;
}

.title-container h1 {
  margin: 0;
  font-size: 45px;
  font-weight: 600;
  color: #333;
}

.login-form .el-form-item {
  margin-bottom: 16px;
}

.el-form-item label {
  font-size: 14px;
  color: #333;
}

.el-form-item .el-input {
  width: 100%;
}

.el-form-item .el-button {
  width: 100%;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>
