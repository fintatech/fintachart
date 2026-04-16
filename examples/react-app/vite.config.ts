import { defineConfig, createLogger } from 'vite';
import react from '@vitejs/plugin-react';

const logger = createLogger();
const originalWarn = logger.warn;
logger.warn = (msg, options) => {
  if (msg.includes('Failed to load source map') && msg.includes('@fintatech/fintachart')) return;
  originalWarn(msg, options);
};

export default defineConfig({
  customLogger: logger,
  plugins: [react()],
  server: {
    fs: {
      allow: ['.', 'node_modules/@fintatech/fintachart'],
    },
  },
  optimizeDeps: {
    exclude: ['@fintatech/fintachart'],
  },
});
