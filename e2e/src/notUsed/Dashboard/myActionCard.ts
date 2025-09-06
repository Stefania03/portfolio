import { Page } from '@playwright/test';


class myActionCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
export default myActionCard;