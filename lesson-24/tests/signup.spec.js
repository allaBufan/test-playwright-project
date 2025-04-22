import { test, expect } from '@playwright/test';
import SignupPage from '../poms/SignupPage';

test.describe('Sign up flow with Basic Auth', () => {
  let page;
  let signupPage;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });

    page = await context.newPage();
    signupPage = new SignupPage(page);
    await page.goto('https://qauto.forstudy.space/');
  });

  test('Sign up - successfull', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('Jane', 'Doe', 'jd@aaaa.com', 'gZ4DQ{}416', 'gZ4DQ{}416');
    await signupPage.clickRegister();
  });

  test('Sign up - failed: empty fields', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('', '', '', '', '');
    await page.keyboard.press('Tab'); // to switch the focus to trigger validation

    const expectedErrors = {
      name: 'Name required',
      lastName: 'Last name required',
      email: 'Email required',
      password: 'Password required',
      repeatPassword: 'Re-enter password required'
    };
    
    await signupPage.verifyErrorMessages(expectedErrors);
    await signupPage.isRegisterButtonDisabled();
  });

  test('Sign up - failed: invalid data', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('Офту', 'Вщу', 'jdaaaa.com', '12345678', '12345678');
    await page.keyboard.press('Tab'); // to switch the focus to trigger validation

    const expectedErrors = {
      name: 'Name is invalid',
      lastName: 'Last name is invalid',
      email: 'Email is incorrect',
      password: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
      repeatPassword: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    };

    await signupPage.verifyErrorMessages(expectedErrors);
    await signupPage.isRegisterButtonDisabled();
  });

  test('Sign up - failed: wrong length: too long', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('Janeqawsedrftgyhujiko', 'Doeqawsedrftgyhujikol', 'jd@aaaa.com', 'gZ4DQ{}8', 'gZ4DQ{}8');
    await page.keyboard.press('Tab'); // to switch the focus to trigger validation

    const expectedErrors = {
      name: 'Name has to be from 2 to 20 characters long',
      lastName: 'Last name has to be from 2 to 20 characters long',
    };

    await signupPage.verifyErrorMessages(expectedErrors);
    await signupPage.isRegisterButtonDisabled();
  });

  test('Sign up - failed: wrong length: too short', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('J', 'D', 'jd@aaaa.com', 'gZ4DQ{}8', 'gZ4DQ{}8');
    await page.keyboard.press('Tab'); // to switch the focus to trigger validation

    const expectedErrors = {
      name: 'Name has to be from 2 to 20 characters long',
      lastName: 'Last name has to be from 2 to 20 characters long',
    };

    await signupPage.verifyErrorMessages(expectedErrors);
    await signupPage.isRegisterButtonDisabled();
  });

  test('Sign up - failed: passwords dont match', async () => {
    await signupPage.clickSignUp();
    await signupPage.waitForModal();

    await signupPage.fillForm('Jane', 'Doe', 'jd@aaaa.com', 'gZ4DQ{}417', 'gZ4DQ{}418');
    await page.keyboard.press('Tab'); // to switch the focus to trigger validation

    await signupPage.verifyPasswordMismatchError();
    await signupPage.isRegisterButtonDisabled();
  });
});