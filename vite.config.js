import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// Multi-page: the landing (index.html) and the styleguide (styleguide.html) are both entries.
export default defineConfig({
  // host:true binds 0.0.0.0 so the port forwards out of a devcontainer/remote;
  // strictPort fails loudly instead of silently hopping to another port.
  server: { host: true, port: 5173, strictPort: true },
  preview: { host: true, port: 4173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        styleguide: resolve(root, 'styleguide.html'),
      },
    },
  },
})
