import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * BASE PATH
 * - Root domain (public_html/, S3 bucket root): keep './' (relative, works almost anywhere)
 *   or set '/'.
 * - Subfolder (e.g. https://example.com/tutopia/): './' still works; for an absolute
 *   base set BASE_PATH=/tutopia/ when building:  BASE_PATH=/tutopia/ npm run build
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
})
