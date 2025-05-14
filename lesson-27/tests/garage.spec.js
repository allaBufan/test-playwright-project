import { test, expect } from '../fixtures/garagePage.fixture'; 

test('Check if user can access GaragePage', async ({ garagePage }) => {
  // Checks if page is loaded
  await garagePage.open(); 
  await garagePage.page.waitForLoadState('load'); 
  const isPageLoaded = await garagePage.isPageLoaded();
  console.log('Page loaded:', isPageLoaded);  // Logs if page is loaded
  
  // Checks if page contains url "/garage"
  const url = await garagePage.page.url(); // Recieves current url
  console.log('Current URL:', url); // Logs current url
  expect(url.includes('/garage')).toBeTruthy();  // Checks if url contains "/garage"
  

});
