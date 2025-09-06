import { Page } from '@playwright/test';
import LeftPannel from '../leftPannelComponents';

export default class AdminPage extends LeftPannel {
    page: Page;

    private readonly addButton = 'button:has-text("Add")';
    private readonly systemUsers = 'h6:has-text("System Users")';
    private readonly addUsers = 'h6:has-text("Add User")';
    private readonly userRoleDropdown = '.oxd-form-row >> nth=0 >> .oxd-select-text';
    private readonly statusDropdown = '.oxd-form-row >> nth=1 >> .oxd-select-text';
    private readonly roleOption = (role: string) => `div[role="option"]:has-text("${role}")`;
    private readonly statusOption = (status: string) => `div[role="option"]:has-text("${status}")`;
    private readonly employeeNameInput = 'input[placeholder="Type for hints..."]';
    private readonly suggestionOption = 'div[role="option"]';
    private readonly usernameInput = 'input.oxd-input >> nth=1';
    private readonly passwordInput = 'input[type="password"] >> nth=0';
    private readonly confirmPasswordInput = 'input[type="password"] >> nth=1';
    private readonly saveButton = 'button:has-text("Save")';
    private readonly successMessage = 'div:has-text("Successfully Saved")';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async waitForLoaded() {
        await this.page.waitForSelector(this.systemUsers);
    }

    async isAddButtonVisible(): Promise<boolean> {
        return this.page.isVisible(this.addButton);
    }

    async clickAddButton() {
        await this.page.click(this.addButton);
        await this.page.waitForSelector(this.addUsers);
    }

    async selectUserRole(role: 'Admin' | 'ESS') {
        await this.page.locator(this.userRoleDropdown).click();
        await this.page.locator(this.roleOption(role)).click();
    }

    async selectStatus(status: 'Enabled' | 'Disabled') {
        await this.page.locator(this.statusDropdown).click();
        await this.page.locator(this.statusOption(status)).click();
    }

    async enterEmployeeName(name: string) {
        const input = this.page.locator(this.employeeNameInput);
        await input.fill(name);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.suggestionOption).first().click();
    }

    async enterUsername(username: string) {
        await this.page.locator(this.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.passwordInput).fill(password);
    }

    async confirmPassword(password: string) {
        await this.page.locator(this.confirmPasswordInput).fill(password);
    }

    async clickSaveButton() {
        await this.page.click(this.saveButton);
        await this.page.waitForSelector(this.successMessage, { timeout: 5000 });
    }

    async createAdminUser(employeeName: string, username: string, password: string) {
        await this.clickAddButton();
        await this.selectUserRole('Admin');
        await this.selectStatus('Enabled');
        await this.enterEmployeeName(employeeName);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.confirmPassword(password);
        await this.clickSaveButton();
    }
}
