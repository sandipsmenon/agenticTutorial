import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: { exclude: ['@mlc-ai/web-llm'] },
  build: { target: 'esnext', chunkSizeWarningLimit: 1600 },
})
