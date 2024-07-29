import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if deploying to a subdirectory
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
