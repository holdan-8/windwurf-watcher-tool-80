import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/wald.jpg",
          dest: "assets",
        },
        {
          src: "src/assets/pine-tree.png",
          dest: "assets",
        },
      ],
    }),
  ],
  base: "/windwurf-watcher-tool-80/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
