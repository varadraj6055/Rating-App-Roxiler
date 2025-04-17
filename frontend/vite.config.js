import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add alias to properly resolve bootstrap and jQuery
      '@': '/src',
      bootstrap: '/node_modules/bootstrap',
    },
  },
  include: ['jwt-decode']
});

