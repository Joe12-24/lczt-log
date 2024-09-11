import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // 用于简化路径
    },
  },
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // 主入口 HTML 文件
      },
      output: {
        // 配置输出选项
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name].[hash][extname]'; // CSS 文件
          }
          return 'assets/[name].[hash][extname]'; // 其他资源
        },
      },
    },
    minify: 'terser', // 使用 terser 进行压缩
    terserOptions: {
      compress: {
        drop_console: true, // 去除 console
      },
    },
    sourcemap: false, // 是否生成 source map，生产环境通常设置为 false
  },
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 启动时自动打开浏览器
    proxy: {
      // 配置代理，根据需要调整
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // 全局 SCSS 变量
      },
    },
  },
});
