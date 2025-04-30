import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/saumya_project/', // Update this to match your repository name
  server: {
    port: 3000,
    host: true // This enables network access
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
