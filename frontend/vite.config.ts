import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
    envDir: '../',
    server: {
      proxy: {
          '/api': {
              target: "http://localhost:8000/",
              changeOrigin: true,
          }
      }
    },
    resolve: {
      alias: {
          '@': path.resolve(import.meta.dirname, './src'),
      }
    }
})
