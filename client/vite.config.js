import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8008",

        // target: 'https://connection-management-system.onrender.com',
        // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
