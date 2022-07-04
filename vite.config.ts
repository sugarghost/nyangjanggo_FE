import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [reactRefresh(), WindiCSS()],
});
