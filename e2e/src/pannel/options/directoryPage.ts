import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class DirectoryPage extends LeftPannel {
    private readonly directoryHeader: string = 'h5:has-text("Directory")';
    private readonly nameInput: string = 'input[placeholder="Type for hints..."]';
    private readonly jobTitleDropdown: string = '.oxd-select-text';
    private readonly searchButton: string = 'button:has-text("Search")';
    private readonly resultCard: string = '.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white';


    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.directoryHeader);
    }

    async enterName(name: string) {
        await this.page.locator(this.nameInput).fill(name);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async selectJobTitle(title: string) {
        await this.page.locator(this.jobTitleDropdown).first().click();
        await this.page.locator(`div[role="option"]:has-text("${title}")`).click();
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async isResultVisible(): Promise<boolean> {
        return this.page.locator(this.resultCard).first().isVisible();
    }

    async searchPerson(name: string, jobTitle?: string): Promise<boolean> {
        await this.enterName(name);
        if (jobTitle) {
            await this.selectJobTitle(jobTitle);
        }
        await this.clickSearch();
        return this.isResultVisible();
    }
}
