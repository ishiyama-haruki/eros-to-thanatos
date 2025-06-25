import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import nodePolyfills from 'rollup-plugin-polyfill-node'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),nodePolyfills(),],
  define: {
    global: 'globalThis', // ← これも必要なことがあります
  },
})
