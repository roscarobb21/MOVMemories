import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/MOVMemories/",
  build: {
    outDir: 'public', // Default build output folder
  },
})
