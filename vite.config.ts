import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  return {
    mode,
    root: join(__dirname, './'),
    plugins: [react()],
    base: './',
    build: {
      outDir: 'dist',
    },
    server: {
      port: parseInt(env.VITE_SERVER_PORT || '3000'),
      host: true,
    },
  };
});
