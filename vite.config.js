import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";'
      }
    }
  },

  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    },
  },
})
