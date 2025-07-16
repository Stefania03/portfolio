import { Page } from '@playwright/test';

export class HelpFramework {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goTo(url: string) {
        await this.page.goto(url);
    }
}