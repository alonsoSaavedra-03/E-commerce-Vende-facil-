import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Detecta si la compilación se está realizando en los servidores de Vercel
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : '/E-commerce-Vende-facil-/',
})
