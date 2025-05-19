import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',  
  fullyParallel: true, 
  retries: 0, 
  workers: 2, 
  reporter: 'list', 

  use: {
    
    baseURL: 'https://qauto.forstudy.space',
    testIdAttribute: 'data-testid', 
    actionTimeout: 4000, 
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    ignoreHTTPSErrors: true, 
    video: 'always', 
    trace: 'on-first-retry', 

    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/, testDir: './setup' },
     {
      name: 'Google Chrome Setup',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', storageState: 'session-storage.json' },
      dependencies: ['setup']
    }
  ],
});