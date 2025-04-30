import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `[name][extname]`;
          }
          if (/mp3|wav/i.test(ext)) {
            return `[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      }
    }
  }
})

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
