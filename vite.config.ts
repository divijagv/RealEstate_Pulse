
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
  },
  // If deploying to a sub-path (e.g. github.io/repo-name/), set base to '/repo-name/'
  base: './'
});
