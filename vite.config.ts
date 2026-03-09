import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx() }, react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/, }), tailwindcss()],
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    // Especificamos que el formato de salida sea ES Modules
    modulePreload: true,
    rollupOptions: {
      input: {
        app: 'src/main.tsx', // Archivo principal
      },
      output: {
        format: 'es', // Obligatorio para separar archivos (Code Splitting)
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
        entryFileNames: 'scripts/[name].js',
        chunkFileNames: 'scripts/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
