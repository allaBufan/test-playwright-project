import { test, expect } from '@playwright/test';

let page;

test.describe('Sign up flow with Basic Auth', () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });

    page = await context.newPage();
    await page.goto('https://qauto.forstudy.space/');
  });

  // test('Sign up button is visible', async () => {
  //   await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  // });

  test('Sign up - successful', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').fill('Jane');
    await page.locator('form input[name="lastName"]').fill('Doe');
    await page.locator('form input[name="email"]').fill('jd@aaaa.com');
    await page.locator('form input[name="password"]').fill('gZ4DQ{}416');
    await page.locator('form input[name="repeatPassword"]').fill('gZ4DQ{}416');
    
    await page.getByRole('button', { name: 'Register' }).click();
  });

  test('Sign up - failed: empty fields', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').click();
    await page.locator('form input[name="lastName"]').click();
    await page.locator('form input[name="email"]').click();
    await page.locator('form input[name="password"]').click();
    await page.locator('form input[name="repeatPassword"]').click();
      
    await page.keyboard.press('Tab'); // to switch focus to trigger validation

    // Errors verification
    await expect(page.locator('form input[name="name"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="name"] + .invalid-feedback')).toHaveText('Name required');

    await expect(page.locator('form input[name="lastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="lastName"] + .invalid-feedback')).toHaveText('Last name required');

    await expect(page.locator('form input[name="email"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="email"] + .invalid-feedback')).toHaveText('Email required');

    await expect(page.locator('form input[name="password"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="password"] + .invalid-feedback')).toHaveText('Password required');

    await expect(page.locator('form input[name="repeatPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="repeatPassword"] + .invalid-feedback')).toHaveText('Re-enter password required');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  test('Sign up - failed: wrong data', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').fill('Офту');
    await page.locator('form input[name="lastName"]').fill('Вщу');
    await page.locator('form input[name="email"]').fill('jdaaaa.com');
    await page.locator('form input[name="password"]').fill('12345678');
    await page.locator('form input[name="repeatPassword"]').fill('12345678');
      
    await page.keyboard.press('Tab'); // to switch focus to trigger validation

    // Errors verification
    await expect(page.locator('form input[name="name"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="name"] + .invalid-feedback')).toHaveText('Name is invalid');

    await expect(page.locator('form input[name="lastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="lastName"] + .invalid-feedback')).toHaveText('Last name is invalid');

    await expect(page.locator('form input[name="email"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="email"] + .invalid-feedback')).toHaveText('Email is incorrect');

    await expect(page.locator('form input[name="password"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="password"] + .invalid-feedback')).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    await expect(page.locator('form input[name="repeatPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="repeatPassword"] + .invalid-feedback' )).toContainText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    );

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  test('Sign up - failed: wrong length: too short', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').fill('J');
    await page.locator('form input[name="lastName"]').fill('D');
    await page.locator('form input[name="email"]').fill('jd@aaaa.com');
    await page.locator('form input[name="password"]').fill('gZ4DQ{}8');
    await page.locator('form input[name="repeatPassword"]').fill('gZ4DQ{}8');
      
    await page.keyboard.press('Tab'); // to switch focus to trigger validation

    // Errors verification
    await expect(page.locator('form input[name="name"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="name"] + .invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');

    await expect(page.locator('form input[name="lastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="lastName"] + .invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  test('Sign up - failed: wrong length: too long', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').fill('Janeqawsedrftgyhujiko');
    await page.locator('form input[name="lastName"]').fill('Doeqawsedrftgyhujikol');
    await page.locator('form input[name="email"]').fill('jd@aaaa.com');
    await page.locator('form input[name="password"]').fill('gZ4DQ{}8');
    await page.locator('form input[name="repeatPassword"]').fill('gZ4DQ{}8');
      
    await page.keyboard.press('Tab'); // to switch focus to trigger validation

    // Errors verification
    await expect(page.locator('form input[name="name"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="name"] + .invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');

    await expect(page.locator('form input[name="lastName"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="lastName"] + .invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  test('Sign up - failed: pass dont match', async () => {
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('.modal-content').waitFor({ state: 'visible' });
    await page.getByRole('heading', { name: 'Registration' }).waitFor();

    await page.locator('form input[name="name"]').fill('Jane');
    await page.locator('form input[name="lastName"]').fill('Doe');
    await page.locator('form input[name="email"]').fill('jd@aaaa.com');
    await page.locator('form input[name="password"]').fill('gZ4DQ{}417');
    await page.locator('form input[name="repeatPassword"]').fill('gZ4DQ{}418');

    await page.keyboard.press('Tab'); // to switch focus to trigger validation
    
    // Errors verification
    await expect(page.locator('form input[name="repeatPassword"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator('form input[name="repeatPassword"] + .invalid-feedback' )).toContainText('Passwords do not match');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });


});






// // test('has title', async ({ page }) => {
// //   await page.goto('https://playwright.dev/');

// //   // Expect a title "to contain" a substring.
// //   await expect(page).toHaveTitle(/Playwright/);
// // });

// // test('get started link', async ({ page }) => {
// //   await page.goto('https://playwright.dev/');

// //   // Click the get started link.
// //   await page.getByRole('link', { name: 'Get started' }).click();

// //   // Expects page to have a heading with the name of Installation.
// //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// // });
