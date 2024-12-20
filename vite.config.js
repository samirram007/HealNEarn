import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import mkcert from 'vite-plugin-mkcert';
// https://vite.dev/config/
export default defineConfig({
  // base: '/frontend/',
  plugins: [

    react(),
    mkcert(),
    compression({
      algorithm: 'gzip', // Specify the compression algorithm
      ext: '.gz', // File extension for compressed files
      threshold: 1024, // Minimum size in bytes for files to be compressed
    }),
    visualizer({
      filename: './stats.html', // Output file for the visualizer report
      open: true, // Automatically open the visualizer report in the browser
    })],
  consistentExport: true,
  server: {
    https: true, // Enable HTTPS
    hmr: {
      overlay: true, // Disable the HMR overlay
    },
    open: false

  },
  build: {
    outDir: 'dist', // Ensure correct output directory

  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
