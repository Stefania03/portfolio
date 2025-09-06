import { Page, Locator } from '@playwright/test';

export class MenuItem {
  private locator: Locator;

  constructor(page: Page, selector: string) {
    this.locator = page.locator(selector);
  }

  async click() {
    await this.locator.click();
  }

  async isVisible(): Promise<boolean> {
    return this.locator.isVisible();
  }
}
