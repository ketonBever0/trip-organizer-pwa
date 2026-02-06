/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
    },
  },
  plugins: [analog(), tailwindcss()],
  ssr: {
    noExternal: ['@ionic/**', '@stencil/**', 'ionicons'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
    server: {
      deps: {
        inline: ['@ionic/angular'],
      },
    },
  },
}));
