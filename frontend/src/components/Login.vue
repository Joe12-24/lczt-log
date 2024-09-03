<template>

  <div class="bg-gradient-to-tr from-sky-200 to-sky-500 ">
    <section id="login" class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
      <div class="p-6 bg-sky-100 rounded">
        <div class="flex items-center justify-center text-4xl font-black text-sky-900 m-3">
          <img :src="faviconUrl" class="mr-3 w-10 h-10" alt="Favicon" />
          <h1 class="tracking-wide">后台日志查询</h1>
        </div>
        <form id="login_form" @submit.prevent="handleLogin" class="flex flex-col justify-center">
          <label class="text-sm font-medium">用户</label>
          <input v-model="username" class="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500" type="text" placeholder="admin" required>

          <label class="text-sm font-medium">密码</label>
          <input v-model="password" class="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500" type="password" placeholder="********" required>

          <button class="px-4 py-1.5 rounded-md shadow-lg bg-sky-600 font-medium text-gray-100 block hover:bg-sky-700 transition duration-300" type="submit">
            <span v-if="isChecking">Checking ...</span>
            <span v-else>登录</span>
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const isChecking = ref(false);
    const faviconUrl = require('@/assets/favicon.ico'); // 假设你把favicon.ico放在了assets目录下

    const handleLogin = async () => {
      isChecking.value = true;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (response.ok) {
          router.push({ name: 'Home' }); // 登录成功，跳转到主页
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      } finally {
        isChecking.value = false;
      }
    };

    return {
      username,
      password,
      isChecking,
      faviconUrl,
      handleLogin
    };
  }
});
</script>

<style scoped>
/* 保持原有的样式不变 */
</style>
