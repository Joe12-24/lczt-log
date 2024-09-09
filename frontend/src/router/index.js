import { createRouter, createWebHistory } from 'vue-router';
import QueryPage from '@/components/QueryPage.vue';
import Login from '@/components/Login.vue';

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false } // 登录页面不需要认证
    },
    {
      path: '/query',
      name: 'QueryPage',
      component: QueryPage,
      meta: { requiresAuth: true } // 查询页面需要认证
    }
  ]
});
//
// // 全局导航守卫
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('user'); // 简单的认证检查
//
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     // 如果目标路由需要认证且用户未认证，则重定向到登录页面
//     next({ name: 'Login' });
//   } else if (!to.meta.requiresAuth && isAuthenticated) {
//     // 如果目标路由不需要认证但用户已认证，则重定向到查询页面
//     next({ name: 'QueryPage' });
//   } else {
//     next();
//   }
// });

export default router;
