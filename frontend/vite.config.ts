// frontend/vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
export default defineConfig({
  plugins: [vue()
  ,
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
});
