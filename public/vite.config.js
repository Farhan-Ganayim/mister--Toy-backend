import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
   build: {
        outDir: '../mister--Toy-backend/public',
        emptyOutDir: true,
    },
})
