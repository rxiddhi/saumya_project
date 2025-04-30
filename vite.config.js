import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/saumya_project/',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
