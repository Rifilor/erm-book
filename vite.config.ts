// import { fileURLToPath, URL } from 'node:url'
//
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })


// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import path from 'path';
//
// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   plugins: [vue()],
// });

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
});