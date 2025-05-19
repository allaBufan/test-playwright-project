
import { test as base, expect } from '@playwright/test';
import GaragePage from '../poms/pages/GaragePage';
import ProfilePage from '../poms/pages/ProfilePage';

export const test = base.extend({
  // Redefines the browser context with connected storage state
  context: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'session-storage.json' }); 
    await use(context);
  },

  //Redefines page in the context
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },

  // Creates GaragePage with logged in page
  garagePage: async ({ page }, use) => {
    const garage = new GaragePage(page);
    await use(garage);
  },

  // Creates ProfilePage with logged in page
  profilePage: async ({ page }, use) => {
    const garage = new ProfilePage(page);
    await use(garage);
  }
});

export { expect } from '@playwright/test';
