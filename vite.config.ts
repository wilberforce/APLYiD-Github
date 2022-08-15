import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import svgLoader from 'vite-svg-loader'

/**
 * @type {import('vite').UserConfig}
 */

export default defineConfig({
  plugins: [ 
    vue()//,svgLoader()
  ],
  server: {
    open: '/', // auto open browser in dev mode
    host: true // and on dev ip
  }
})