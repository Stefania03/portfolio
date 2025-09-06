import { Page } from '@playwright/test';

class employeeDistributionByLocationCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
export default employeeDistributionByLocationCard;