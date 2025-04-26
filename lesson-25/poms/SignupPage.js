import { expect } from '@playwright/test';

export default class SignupPage {
    constructor(page) {
      this.page = page;
      // this.signUpButton = page.locator('button', { name: 'Sign up' });
      this.signUpButton = page.getByRole('button', { name: 'Sign up' })
      this.modalContent = page.locator('.modal-content');
      this.registrationHeading = page.locator('h1', { name: 'Registration' });
      this.nameInput = page.locator('form input[name="name"]');
      this.lastNameInput = page.locator('form input[name="lastName"]');
      this.emailInput = page.locator('form input[name="email"]');
      this.passwordInput = page.locator('form input[name="password"]');
      this.repeatPasswordInput = page.locator('form input[name="repeatPassword"]');
      this.registerButton = page.locator('button:has-text("Register")');
    }
  
    // Expects modal window
    async waitForModal() {
      await this.modalContent.waitFor({ state: 'visible' });
      await this.registrationHeading.waitFor();
    }
  
    // Fills registartion form
    async fillForm(name, lastName, email, password, repeatPassword) {
      await this.nameInput.fill(name);
      await this.lastNameInput.fill(lastName);
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.repeatPasswordInput.fill(repeatPassword);
    }
  
    // Clicks button "Register"
    async clickRegister() {
      await this.registerButton.click();
    }
  
    // Clicks button "Sign Up"
    async clickSignUp() {
      await this.signUpButton.click();
    }
  
    // Verifies if "Register" button is disabled
    async isRegisterButtonDisabled() {
      await expect(this.registerButton).toBeDisabled();
    }
  
    // Verifies errors messages
    async verifyErrorMessages(expectedErrors) {
      for (const [field, errorMessage] of Object.entries(expectedErrors)) {
        const fieldLocator = this.page.locator(`form input[name="${field}"]`);
        const errorLocator = fieldLocator.locator('+ .invalid-feedback');
        await expect(fieldLocator).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(errorLocator).toHaveText(errorMessage);
      }
    }
  
    // Veirfies passwords values match
    async verifyPasswordMismatchError() {
      const repeatPasswordLocator = this.repeatPasswordInput;
      await expect(repeatPasswordLocator).toHaveCSS('border-color', 'rgb(220, 53, 69)');
      await expect(repeatPasswordLocator.locator('+ .invalid-feedback')).toContainText('Passwords do not match');
    }
  }