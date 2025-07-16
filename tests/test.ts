import { test, expect } from '@playwright/test';
import { HelpFramework } from '../help/helpFramework';


test('Open a web page', async ({ page }) => {
    const helper = new HelpFramework(page);
    await helper.goTo('https://www.disneyplus.com/identity/login/enter-email');

    await expect(page).toHaveTitle(/Login to Disney+/);
})

test('Fill email field', async ({ page }) => {
    const helper = new HelpFramework(page);
    await helper.goTo('https://www.disneyplus.com/identity/login/enter-email');
    await page.fill('#email', 'stefaniaelena_v@yahoo.com');
    const emailValue = await page.inputValue('stefaniaelena_v@yahoo.com');

    expect(emailValue).toBe('stefaniaelena_v@yahoo.com');
})
