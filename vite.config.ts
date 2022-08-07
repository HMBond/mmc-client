import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { env } from 'process';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  dotenv.config({ path: `${__dirname}/.env.${mode}` });
  return {
    mode: env.NODE_ENV,
    root: join(__dirname, './'),
    plugins: [react(), htmlPlugin(loadEnv(mode, '.'))],
    base: './',
    build: {
      outDir: 'dist',
    },
    server: {
      port: parseInt(env.SERVER_PORT || '3000'),
    },
  };
});

/**
 * Replace env variables in index.html
 * @see https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
 * @see https://vitejs.dev/guide/api-plugin.html#transformindexhtml
 */
function htmlPlugin(env: ReturnType<typeof loadEnv>) {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      enforce: 'pre' as const,
      transform: (html: string): string =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  };
}
