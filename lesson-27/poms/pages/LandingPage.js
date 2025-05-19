import  BasePage  from '../basePoms/BasePage';
import  SignInModal  from '../modals/SignInModal';
import { expect } from '@playwright/test';

export default class LandingPage extends BasePage {
  constructor(page) {
    super(page, '');
  }

  selectors = {
    signInButton: this.page.getByRole('button', { name: 'Sign In' })
  };

  async clickSignInButton(){
    await expect(this.selectors.signInButton).toBeVisible();
    await this.selectors.signInButton.click();
    return new SignInModal(this.page);
  }
}