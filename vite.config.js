import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const base =
  process.env.VITE_DEPLOY_TARGET === 'gh-pages' ? '/protfolio/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
