import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'motion-lib': ['motion/react'],
            'lucide-icons': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
      cssCodeSplit: true,
      sourcemap: false,
      reportCompressedSize: false,
    },
  };
});
