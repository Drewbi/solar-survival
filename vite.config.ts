import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "solar-survival",
  plugins: [react({
    babel: {
      plugins: [
        'babel-plugin-styled-components',
      ]
    }
  })]
})
