import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa para poder servir el sitio desde cualquier ruta (GitHub Pages, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
})
