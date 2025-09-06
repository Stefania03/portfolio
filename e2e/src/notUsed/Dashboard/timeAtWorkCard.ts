import { Page } from '@playwright/test';

class timeAtWorkCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
export default timeAtWorkCard;