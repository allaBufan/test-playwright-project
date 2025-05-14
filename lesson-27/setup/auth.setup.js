import { test as setup } from '@playwright/test';
import  LandingPage  from '../poms/pages/LandingPage';


let landingPage;
let signInModal;

const authFile = 'session-storage.json';

setup('Login before settings tests',
  async({ page, baseURL }) => {
    landingPage = new LandingPage(page);

    await page.goto(baseURL);
    signInModal = await landingPage.clickSignInButton();
    await signInModal.executeLogin();
    
    await page.context().storageState({ path: authFile });
  });