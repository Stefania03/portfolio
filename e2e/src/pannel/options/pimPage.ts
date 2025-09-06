import { Page, expect } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class PIMPage extends LeftPannel {
    page: Page;

    private readonly employeeInfoHeader: string = 'h5:has-text("Employee Information")';
    private readonly employeeNameInput: string = 'input[placeholder="Type for hints..."]';
    private readonly suggestionOption: string = 'div[role="option"]';
    private readonly employeeIdInput: string = '.oxd-input';
    private readonly searchButton: string = 'button:has-text("Search")';
    private readonly resultRow: string = '.oxd-table-row';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;

    }
    async waitForLoaded() {
        await this.page.waitForSelector(this.employeeInfoHeader);
    }

    async enterEmployeeName(name: string) {
        await this.page.locator(this.employeeNameInput).first().fill(name);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.suggestionOption).first().click();
    }

    async enterEmployeeId(id: string) {
        await this.page.locator(this.employeeIdInput).nth(1).fill(id);
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async isResultVisible(): Promise<boolean> {
        return this.page.locator(this.resultRow).nth(1).isVisible();
    }

    async searchEmployeeByName(name: string): Promise<boolean> {
        await this.enterEmployeeName(name);
        await this.clickSearch();
        return this.isResultVisible();
    }
}
