import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // DŮLEŽITÉ pro custom doménu
  plugins: [react()],
});