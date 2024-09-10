import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({ enabledCollections: ['ep'] }),
      ],
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({ prefix: 'Icon' }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].js', // 设置入口文件的名称
        chunkFileNames: 'assets/[name].js', // 设置分块文件的名称
        assetFileNames: 'assets/[name].[ext]', // 设置资源文件的名称
        manualChunks: undefined, // 禁用手动拆分
      },
    },
    // 其他构建选项
    commonjsOptions: {
      include: /node_modules/, // 处理 CommonJS 模块
    },
  },
});
