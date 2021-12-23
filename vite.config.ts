import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, './'),
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
});
