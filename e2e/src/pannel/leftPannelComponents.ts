import { Page } from '@playwright/test';
import type AdminPage from './options/adminPage';
import type LeavePage from './options/leavePage';
import type PIMPage from './options/pimPage';
import type TimePage from './options/timePage';
import type RecruitmentPage from './options/recruitmentPage';
import type MyInfoPage from './options/myInfoPage';
import type PerformancePage from './options/performancePage';
import type DashboardPage from './options/dashboardPage';
import type DirectoryPage from './options/directoryPage';

export default class LeftPannel {
    page: Page;
    protected element: string;

    private readonly selectorAdmin = 'span.oxd-text:has-text("Admin")';
    private readonly selectorLeave = 'span.oxd-text:has-text("Leave")';
    private readonly selectorPIM = 'span.oxd-text:has-text("PIM")';
    private readonly selectorTime = 'span.oxd-text:has-text("Time")';
    private readonly selectorRecruitment = 'span.oxd-text:has-text("Recruitment")';
    private readonly selectorMyInfo = 'span.oxd-text:has-text("My Info")';
    private readonly selectorPerformance = 'span.oxd-text:has-text("Performance")';
    private readonly selectorDashboard = 'span.oxd-text:has-text("Dashboard")';
    private readonly selectorDirectory = 'span.oxd-text:has-text("Directory")';
    private readonly selectorBuzz = 'span.oxd-text:has-text("Buzz")';
    private readonly sidePanelSelector = 'aside.oxd-sidepanel';
    private readonly sidePanelOptions = 'aside.oxd-sidepanel span.oxd-text';

    constructor(page: Page) {
        this.page = page;
    }

    async click() {
        const element = this.page.locator(this.element);
        return element.click();
    }

    async isDisplayed() {
        const element = this.page.locator(this.element);
        return element.isVisible({ timeout: 15000 });
    }

    async goToAdmin(): Promise<AdminPage> {
        await this.page.click(this.selectorAdmin);
        const { default: AdminPage } = await import('./options/adminPage');
        return new AdminPage(this.page);
    }

    async goToPIM(): Promise<PIMPage> {
        await this.page.click(this.selectorPIM);
        const { default: PIMPage } = await import('./options/pimPage');
        return new PIMPage(this.page, this.selectorPIM);
    }

    async goToLeave(): Promise<LeavePage> {
        await this.page.click(this.selectorLeave);
        const { default: LeavePage } = await import('./options/leavePage');
        return new LeavePage(this.page, this.selectorLeave);
    }

    async goToTime(): Promise<TimePage> {
        await this.page.click(this.selectorTime);
        const { default: TimePage } = await import('./options/timePage');
        return new TimePage(this.page, this.selectorTime);
    }

    async goToRecruitment(): Promise<RecruitmentPage> {
        await this.page.click(this.selectorRecruitment);
        const { default: RecruitmentPage } = await import('./options/recruitmentPage');
        return new RecruitmentPage(this.page, this.selectorRecruitment);
    }

    async goToMyInfo(): Promise<MyInfoPage> {
        await this.page.click(this.selectorMyInfo);
        const { default: MyInfoPage } = await import('./options/myInfoPage');
        return new MyInfoPage(this.page, this.selectorMyInfo);
    }

    async goToPerformance(): Promise<PerformancePage> {
        await this.page.click(this.selectorPerformance);
        const { default: PerformancePage } = await import('./options/performancePage');
        return new PerformancePage(this.page, this.selectorPerformance);
    }

    async goToDashboard(): Promise<DashboardPage> {
        await this.page.click(this.selectorDashboard);
        const { default: DashboardPage } = await import('./options/dashboardPage');
        return new DashboardPage(this.page);
    }

    async goToDirectory(): Promise<DirectoryPage> {
        await this.page.click(this.selectorDirectory);
        const { default: DirectoryPage } = await import('./options/directoryPage');
        return new DirectoryPage(this.page);
    }

    async goToBuzz() {
        await this.page.click(this.selectorBuzz);
    }

    async isOptionVisible(optionName: string): Promise<boolean> {
        return this.page.isVisible(`span.oxd-text:has-text("${optionName}")`);
    }

    async clickMenuOption(optionName: string) {
        await this.page.click(`span.oxd-text:has-text("${optionName}")`);
    }

    async isVisible(): Promise<boolean> {
        return this.page.isVisible(this.sidePanelSelector);
    }

    async getAllOptions(): Promise<string[]> {
        const items = await this.page.locator(this.sidePanelOptions).allInnerTexts();
        return items.map(t => t.trim()).filter(Boolean);
    }
}
