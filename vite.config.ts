import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {copyFileSync} from 'node:fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const preserveModalScript = () => ({
  name: 'preserve-modal-script',
  closeBundle() {
    copyFileSync(
      path.resolve(__dirname, 'modal.js'),
      path.resolve(__dirname, 'dist', 'modal.js'),
    );
  },
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), preserveModalScript()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          motos: path.resolve(__dirname, 'motos.html'),
          'denver-250': path.resolve(__dirname, 'denver-250.html'),
          'flash-250': path.resolve(__dirname, 'flash-250.html'),
          'iron-250': path.resolve(__dirname, 'iron-250.html'),
          'jet-125-ss': path.resolve(__dirname, 'jet-125-ss.html'),
          'jet-50-s-turbo': path.resolve(__dirname, 'jet-50-s-turbo.html'),
          'new-jef-150-efi': path.resolve(__dirname, 'new-jef-150-efi.html'),
          'new-jet-125': path.resolve(__dirname, 'new-jet-125.html'),
          'phoenix-50-s': path.resolve(__dirname, 'phoenix-50-s.html'),
          'rio-125': path.resolve(__dirname, 'rio-125.html'),
          'shi-175-carburada': path.resolve(__dirname, 'shi-175-carburada.html'),
          'shi-175-efi': path.resolve(__dirname, 'shi-175-efi.html'),
          'storm-efi-200': path.resolve(__dirname, 'storm-efi-200.html'),
          'urban-efi-150': path.resolve(__dirname, 'urban-efi-150.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
