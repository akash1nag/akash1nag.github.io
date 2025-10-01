// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 This line should NOT have a repository name, just a slash or be absent.
  base: '/',
})
