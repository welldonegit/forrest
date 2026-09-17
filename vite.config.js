import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

// Multi-page: the landing (index.html) and the styleguide (styleguide.html) are both entries.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        styleguide: resolve(root, 'styleguide.html'),
      },
    },
  },
})
