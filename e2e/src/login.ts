import { Page } from '@playwright/test';

class Login {
  private page: Page;
  private readonly baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
  }

  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly loginTitle = 'h5.oxd-text--h5';
  private readonly loginLayoutContainer = '.orangehrm-login-slot-wrapper';

  public async goTo() {
    await this.page.goto(this.baseUrl);
  }

  public async enterUsername(username: string): Promise<void> {
    await this.page.locator(this.usernameInput).waitFor({ state: 'visible' });
    await this.page.fill(this.usernameInput, username);
  }

  public async enterPassword(password: string): Promise<void> {
    await this.page.locator(this.passwordInput).waitFor({ state: 'visible' });
    await this.page.fill(this.passwordInput, password);
  }

  public async clickLoginButton(): Promise<void> {
    await this.page.locator(this.loginButton).waitFor({ state: 'visible' });
    await this.page.click(this.loginButton);
  }

  public async getTitle(): Promise<string | null> {
    return await this.page.locator(this.loginTitle).textContent();
  }

  public async userNameIsDisplayed(): Promise<boolean> {
    await this.page.locator(this.loginLayoutContainer).waitFor({ state: 'visible' });
    return await this.page.locator(this.loginLayoutContainer).isVisible();
  }

  public async loginWithValidCredentials() {
    await this.enterUsername('Admin');
    await this.enterPassword('admin123');
    await this.clickLoginButton();
    await this.page.waitForURL('**/dashboard/**');
  }

  public async isDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.usernameInput);
  }
}

export default Login;
