import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";


export default defineConfig({
  base: "",
  plugins: [dts({ rollupTypes: true }), react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "syncflow-livekit-react-components",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
} satisfies UserConfig);
