import { defineConfig } from '@playwright/test';

export default defineConfig({
    projects: [
      {
        name: 'Chromium with slowMo',
        use: {
          browserName: 'chromium',
          headless: false,
          launchOptions: {
            slowMo: 500,
          },
        },
      },
    ],
  });
  