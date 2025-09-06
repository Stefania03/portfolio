import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class RecruitmentPage extends LeftPannel {
    page: Page;
    private locator: string;

    private readonly recruitmentHeader: string = 'h5:has-text("Candidates")';
    private readonly candidateNameInput: string = 'input[placeholder="Type for hints..."]';
    private readonly searchButton: string = 'button:has-text("Search")';
    private readonly resultRow: string = '.oxd-table-body .oxd-table-row';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;
        this.locator = locator;
        this.element = locator;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.recruitmentHeader);
    }

    async enterCandidateName(name: string) {
        await this.page.locator(this.candidateNameInput).fill(name);
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

    async searchCandidate(name: string): Promise<boolean> {
        await this.enterCandidateName(name);
        await this.clickSearch();
        return this.isResultVisible();
    }
}
