import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), externalCSSPlugin()]
})

function externalCSSPlugin() {
  return {
    name: 'external-css',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, ctx) {
        return [{
          tag: "link",
          attrs: {"rel": "stylesheet", "type":"text/css", "href": "./src/index.css"},
          injectTo: ctx.server ? "body-prepend" : "head",
        }]
      }
    }
  }
}
