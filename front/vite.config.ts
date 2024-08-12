import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "routes": `${path.resolve(__dirname, "./src/routes/")}`,
      "pages": `${path.resolve(__dirname, "./src/pages/public")}`,
      "components": `${path.resolve(__dirname, "./src/pages/components")}`,
    },
  },
  build: {
    outDir: 'dist', 
  },
})
