import { expect } from '@playwright/test';

// function to login to site
export async function navigateWithAuth(page) {
    await page.goto('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
  }
  

  