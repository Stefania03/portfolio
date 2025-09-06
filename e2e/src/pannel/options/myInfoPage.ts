import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class MyInfoPage extends LeftPannel {
    page: Page;
    private locator: string;

    private readonly personalDetailsHeader: string = 'h6:has-text("Personal Details")';
    private readonly firstNameInput: string = 'input[name="firstName"]';
    private readonly lastNameInput: string = 'input[name="lastName"]';
    private readonly saveButton: string = 'button:has-text("Save")';
    private readonly successToast: string = 'div:has-text("Successfully Updated")';

    constructor(page: Page, locator: string) {
        super(page);
        this.page = page;
        this.locator = locator;
        this.element = locator;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.personalDetailsHeader);
    }

    async updateFirstAndLastName(firstName: string, lastName: string) {
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
    }

    async clickSave() {
        await this.page.click(this.saveButton);
        await this.page.waitForSelector(this.successToast, { timeout: 5000 });
    }

    async updatePersonalInfo(firstName: string, lastName: string): Promise<void> {
        await this.waitForLoaded();
        await this.updateFirstAndLastName(firstName, lastName);
        await this.clickSave();
    }
}
