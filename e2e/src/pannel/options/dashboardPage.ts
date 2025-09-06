import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class Dashboard extends LeftPannel {
  private readonly dashboardTitle: string = 'h6.oxd-text--h6';
  private readonly usernameInput: string = 'input[name="username"]';
  private readonly dashboardUrl: string = '/dashboard';
  private readonly loginUrl: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async isLoaded(): Promise<boolean> {
    return this.page.url().includes(this.dashboardUrl);
  }

  async getDashboardTitle(): Promise<string> {
    return this.page.locator(this.dashboardTitle).innerText();
  }

  async isDisplayed(): Promise<boolean> {
    return this.page.isVisible(this.usernameInput);
  }

  async goTo() {
    await this.page.goto(this.loginUrl);
  }
}
