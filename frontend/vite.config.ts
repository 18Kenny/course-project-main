import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    watch: {
      usePolling: true // needed for file changes in Docker
    },
    proxy: {
      // Frontend calls /api/*; during local dev Vite proxies it to backend.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Backend supports both /api/* and direct paths; we strip '/api' here.
        rewrite: (p) => p.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
