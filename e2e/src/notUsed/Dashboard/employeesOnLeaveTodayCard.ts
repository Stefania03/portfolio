import { Page } from '@playwright/test';

class employeesOnLeaveTodayCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
export default employeesOnLeaveTodayCard;