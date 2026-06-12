import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serve files in /asset (e.g. the CV PDF) at the site root.
  publicDir: 'asset',
})
