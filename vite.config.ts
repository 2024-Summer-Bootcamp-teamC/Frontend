import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Vite가 사용하는 포트
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
      '/ws': {
        target: 'http://backend:8000',
        ws: true,
      },
    },
    hmr: {
      protocol: 'ws', // HTTPS와는 별도로 ws 프로토콜 사용
      host: 'weinjeon.com',
    },
  },
});