import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    https: false, 
    proxy: {
      '/api': {
        target: 'https://www.superheroapi.com/api/',
        changeOrigin: true,
        secure: false,  // Cambia a `true` si la API usa HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),  // Esto reemplaza `/api` por nada
      },
    },
  },
});