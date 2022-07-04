import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [reactRefresh(), WindiCSS()],
});
