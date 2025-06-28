import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default defineConfig(({ mode }) => {
  // .env ファイルを読み込む
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), nodePolyfills()],
    define: {
      global: 'globalThis',
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_NSFW_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
