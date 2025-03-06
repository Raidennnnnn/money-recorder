import { VitePWA } from 'vite-plugin-pwa';
import path from "path"
import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression2'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/money-recorder/',
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'money-recorder',
        short_name: 'money-recorder',
        description: 'simple money recorder',
        theme_color: '#ffffff',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }), 
    compression({
      threshold: 500 * 1024,
    }), 
    tailwindcss(),
    visualizer({ open: true, gzipSize: true }) as PluginOption
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks: (id) => {
        //   if (id.includes('node_modules')) {
        //     const moduleName = id.toString().split('node_modules/')[1].split('/')[1].toString()
        //     if (moduleName.includes('recharts')) {
        //       return 'recharts'
        //     }
        //     if (moduleName.includes('react-dom') || moduleName.includes('react')) {
        //       return 'react'
        //     }
        //     return 'vendor'
        //   }
        // }
        manualChunks: {
          vendor: ['recharts', 'react', 'react-dom'],
        }
      }
    }
  }
})
