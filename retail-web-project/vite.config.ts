import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
// ganti '/retail-web-project/' dengan nama repository github Anda
export default defineConfig({
  base: '/retail-web-project/',
  plugins: [react(),tailwindcss(),],
})
