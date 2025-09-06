import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class PerformancePage extends LeftPannel {
    page: Page;
    private locator: string;

    private readonly performanceHeader: string = 'h6:has-text("Performance")';
    private readonly searchInput: string = 'input[placeholder="Type for hints..."]';
    private readonly searchButton: string = 'button:has-text("Search")';
    private readonly resultRow: string = '.oxd-table-body .oxd-table-row';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;
        this.locator = locator;
        this.element = locator;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.performanceHeader);
    }

    async searchEmployee(name: string) {
        await this.page.locator(this.searchInput).fill(name);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async isResultVisible(): Promise<boolean> {
        const row = this.page.locator(this.resultRow);
        return (await row.count()) > 0;
    }

    async searchPerformanceByName(name: string): Promise<boolean> {
        await this.searchEmployee(name);
        await this.clickSearch();
        return this.isResultVisible();
    }
}
