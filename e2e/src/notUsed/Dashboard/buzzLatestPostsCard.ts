import { Page } from '@playwright/test';

class buzZLatestPostsCard {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //frame selector
    private readonly frame: string = 'oxd-sheet oxd-sheet--rounded oxd-sheet--white orangehrm-dashboard-widget emp-leave-chart';

    //selectors
    private readonly cardImageIcon: string = 'oxd-icon bi-camera-fill orangehrm-dashboard-widget-icon';
    private readonly cardTitle: string = '//*[@class="oxd-text oxd-text--p" and text()="Time at Work"]';

    //Q: Pentru primul widget cum identific profile picture, First name...
    // div[class*='oxd-layout-context'] div[class='oxd-grid-item oxd-grid-item--gutters orangehrm-dashboard-widget']:nth-child(1)

    //methods

    public async getTitle(): Promise<string | null> {
        const frame = this.page.locator(this.frame).contentFrame();
        return await frame.getByTestId(this.cardTitle).textContent();
    }
    public async getImageIcon(): Promise<string | null> {
        const frame = this.page.locator(this.frame).contentFrame();
        return await frame.getByTestId(this.cardImageIcon).textContent();
    }

}
export default buzZLatestPostsCard;
//Exportă implicit (default) variabila, funcția sau componenta numită buzZLatestPostsCard din fișierul curent, pentru a putea fi importată în alt fișier.