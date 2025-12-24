import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'assets/01_Interface_CSOnline_Cena_01_Loop_4_2.mp4',
        'assets/02_Interface_CSOnline_Cena_02_2.mp4',
        'assets/03_Interface_CSOnline_Cena_03_CSTour_3.mp4',
        'assets/02a_Interface_CSOnline_Valoriza_3.mp4',
        'assets/04_Interface_CSOnline_Consumidor_2.mp4',
        'assets/04_Interface_CSOnline_Novidades_Final_v02_3.mp4',
      ],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 40 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif,mp4}'],
        runtimeCaching: [
          {
            urlPattern: /\.mp4$/,
            handler: 'CacheFirst',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
