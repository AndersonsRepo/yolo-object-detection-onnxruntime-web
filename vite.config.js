import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from "vite-plugin-static-copy"
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/onnxruntime-web/dist/*.wasm",
          dest: "assets",
        },
        {
          src: "node_modules/onnxruntime-web/dist/*.mjs",
          dest: "assets",
        },
        {
          src: "node_modules/onnxruntime-web/dist/*.js",
          dest: "assets",
        },
      ],
    }),
  ],
  assetsInclude: ["**/*.onnx"],
  base: "/yolo-object-detection-onnxruntime-web/",
  optimizeDeps: {
    exclude: ['onnxruntime-web']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
