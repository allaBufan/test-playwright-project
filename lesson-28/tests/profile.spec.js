import { test, expect } from '../fixtures/garagePage.fixture'; 

test('Check if user can access ProfilePage and mock API response', async ({ profilePage, page }) => {
  // Interesects and mocks response
  await page.route('https://qauto.forstudy.space/api/users/profile', async (route, request) => {
    console.log('Intercepted API request:', request.url()); 
    console.log('Request method:', request.method()); 
    console.log('Request headers:', request.headers()); 

    // Mocks response
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'ok',
        data: {
          userId: 163923,
          photoFilename: 'user-1745860467227.jpg',
          name: 'lalala',
          lastName: 'blablabla',
        },
      }),
    });

    console.log('Mocked response sent'); // Logs when mocked response is sent
  });

  // Opens profile page
  await profilePage.open(); 
  await page.goto('https://qauto.forstudy.space/panel/profile');

  // Expects while element after mocking is displayed
  const profileName = page.locator('.profile_name.display-4');

  // Expects when element receieves "aaa bbb"
  await expect(profileName).toHaveText('lalala blablabla', { timeout: 10000 });

  // Verifies if data is mocked
  const textContent = await profileName.textContent();
  console.log('Current text content:', textContent);
});



