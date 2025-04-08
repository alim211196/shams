import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Add .js and .jsx extensions for compatibility
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  esbuild: {
    // Treat .js files as JSX to support JSX syntax in .js files
    loader: "jsx",
    include: /src\/.*\.(js|jsx|ts|tsx)$/, // Ensure it applies to all relevant files
  },
  optimizeDeps: {
    // Ensure dependencies with JSX are pre-bundled correctly
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".jsx": "jsx",
      },
    },
  },
});
