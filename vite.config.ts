import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [reactRefresh(), WindiCSS(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@apis', replacement: resolve(__dirname, 'src/apis') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@constants', replacement: resolve(__dirname, 'src/constants') },
      { find: '@containers', replacement: resolve(__dirname, 'src/containers') },
      { find: '@helpers', replacement: resolve(__dirname, 'src/helpers') },
      { find: '@hook', replacement: resolve(__dirname, 'src/hook') },
      { find: '@icon', replacement: resolve(__dirname, 'src/icon') },
      { find: '@images', replacement: resolve(__dirname, 'src/images') },
      { find: '@interfaces', replacement: resolve(__dirname, 'src/interfaces') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@recoil', replacement: resolve(__dirname, 'src/recoil') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@type', replacement: resolve(__dirname, 'src/type') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
    ],
  },
});
