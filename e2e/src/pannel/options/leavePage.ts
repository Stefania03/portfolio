import { Locator, Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class LeavePage extends LeftPannel {
    page: Page;
    private locator: string;

    private readonly leaveListHeader: string = 'h5:has-text("Leave List")';
    private readonly fromDateInput: string = '.oxd-date-input >> nth=0 >> input';
    private readonly toDateInput: string = '.oxd-date-input >> nth=1 >> input';
    private readonly searchButton: string = 'button:has-text("Search")';
    private readonly resultsRow: string = '.oxd-table-body .oxd-table-row';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;
        this.locator = locator;
        this.element = locator;
    }
    
    
    async waitForLoaded() {
        await this.page.waitForSelector(this.leaveListHeader);
    }

    async enterFromDate(date: string) {
        const fromInput = this.page.locator(this.fromDateInput);
        await fromInput.waitFor({ state: 'visible' });
        await fromInput.fill(date);
    }

    async enterToDate(date: string) {
        const toInput = this.page.locator(this.toDateInput);
        await toInput.waitFor({ state: 'visible' });
        await toInput.fill(date);
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async isResultVisible(): Promise<boolean> {
        const resultRow = this.page.locator(this.resultsRow);
        return (await resultRow.count()) > 0;
    }

    async searchLeaveByDateRange(from: string, to: string): Promise<boolean> {
        await this.enterFromDate(from);
        await this.enterToDate(to);
        await this.clickSearch();
        await this.page.waitForTimeout(1000);
        return this.isResultVisible();
    }
}
