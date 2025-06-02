import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ protože build bude nasazen ve větvi samostatně na root doméně
  plugins: [react()],
});