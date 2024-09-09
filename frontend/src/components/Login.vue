<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title-container">
        <el-icon><i class="el-icon-document"></i></el-icon>
        <h1>后台日志查询</h1>
      </div>
      <el-form :model="formInline" class="login-form" label-position="top">
        <el-form-item label="账号">
          <el-input
            v-model="formInline.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formInline.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
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
      const response = await axios.post('http://127.0.0.1:8080/login', new URLSearchParams({
        username: formInline.value.username,
        password: formInline.value.password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Directly handle the response data as the token
      const token = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        // Redirect or perform other actions
        await router.push('/query');
      } else {
        errorMessage.value = 'Invalid credentials';
      }
    } catch (error) {
      console.error('Login error:', error);
      errorMessage.value = 'An error occurred while logging in';
    }
  } else {
    errorMessage.value = 'Username and Password cannot be empty';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
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
  font-size: 24px;
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
