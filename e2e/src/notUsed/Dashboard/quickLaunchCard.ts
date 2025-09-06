import { Page } from '@playwright/test';

class quickLaunchCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
export default quickLaunchCard;