class ProfilePage {
  constructor(page) {
    this.page = page;  
  }

  async open() {
    await this.page.goto('https://qauto.forstudy.space/panel/profile'); 
  }

  
  async waitForLoadState(state) {
    await this.page.waitForLoadState(state);
  }

  async isPageLoaded() {
    try {
      // Expects while tag <body> is visible
      await this.page.waitForSelector('body', { state: 'visible', timeout: 5000 });
      return true;  //If there is no handling of the response, it's undefined
    } catch (error) {
      return false;  
    }
  }

}


export default ProfilePage; 
