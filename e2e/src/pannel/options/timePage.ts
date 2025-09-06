import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class TimePage extends LeftPannel {
    page: Page;
    private locator: string;

    private readonly timeHeader: string = 'h5:has-text("Timesheets")';
    private readonly employeeNameInput: string = 'input[placeholder="Type for hints..."]';
    private readonly viewButton: string = 'button:has-text("View")';
    private readonly timesheetTable: string = '.oxd-table-body .oxd-table-row';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;
        this.locator = locator;
        this.element = locator;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.timeHeader);
    }

    async enterEmployeeName(name: string) {
        await this.page.locator(this.employeeNameInput).fill(name);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async clickView() {
        await this.page.click(this.viewButton);
    }

    async isTimesheetVisible(): Promise<boolean> {
        const row = this.page.locator(this.timesheetTable);
        return (await row.count()) > 0;
    }

    async viewTimesheetFor(name: string): Promise<boolean> {
        await this.enterEmployeeName(name);
        await this.clickView();
        return this.isTimesheetVisible();
    }
}
