import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  sever: {
    proxy: {
      "/api": "https://withread-api-vah1.onrender.com"
    }
  }
})
