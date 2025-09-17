import { test, expect, Page, BrowserContext } from '@playwright/test';
import Login from '../src/login';
import Dashboard from '../src/pannel/options/dashboardPage';
import LeftPannel from '../src/pannel/leftPannelComponents';
import PIMPage from '../src/pannel/options/pimPage';

let page: Page;
let context: BrowserContext;
let dashboard: Dashboard;
let login: Login;
let leftPannel: LeftPannel;

test.describe('Dashboard suite', () => {
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        login = new Login(page);
        dashboard = new Dashboard(page);
        leftPannel = new LeftPannel(page);

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login.loginWithValidCredentials();
        await dashboard.goTo();
        await expect(page.locator('h6')).toHaveText(/Dashboard/i);
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Dashboard title visible', async () => {
        await expect(page.locator('h6')).toHaveText('Dashboard');
    });

    test('"Admin" tab exists in sidebar', async () => {
        const adminTab = page.locator('span.oxd-text:has-text("Admin")');
        await expect(adminTab).toBeVisible();
    });

    test('Search input in navbar is present', async () => {
        const searchInput = page.locator('input[placeholder="Search"]');
        await expect(searchInput).toBeVisible();
    });

    test('Page title contains "OrangeHRM"', async () => {
        const title = await page.title();
        expect(title).toContain('OrangeHRM');
    });

    test('"Directory" tab exists in sidebar', async () => {
        const directoryTab = page.locator('span.oxd-text:has-text("Directory")');
        await expect(directoryTab).toBeVisible();
    });

    test('Click "PIM" tab and verify URL', async () => {
        await page.click('span.oxd-text:has-text("PIM")');
        await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
    });

    test('"Buzz" module tab exists', async () => {
        const buzzTab = page.locator('span.oxd-text:has-text("Buzz")');
        await expect(buzzTab).toBeVisible();
    });

    test('"My Info" tab exists in sidebar', async () => {
        const myInfoTab = page.locator('span.oxd-text:has-text("My Info")');
        await expect(myInfoTab).toBeVisible();
    });

    test('Open profile dropdown and "Logout" option exists', async () => {
        await page.click('p.oxd-userdropdown-name');
        await expect(page.locator('a:has-text("Logout")')).toBeVisible();
    });
});

test.describe('PIM Page test', () => {
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        login = new Login(page);
        leftPannel = new LeftPannel(page);

        await login.goTo();
        await login.loginWithValidCredentials();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Adăugare angajat nou', async () => {
        // 1. Navighează la pagina PIM
        await page.click('span.oxd-text:has-text("PIM")');
        await expect(page).toHaveURL(/pim\/viewEmployeeList/);

        // 2. Click pe butonul + Add
        await page.click('button:has(.oxd-icon.bi-plus)');
        await expect(page.locator('h6.oxd-text.oxd-text--h6.orangehrm-main-title'))
            .toHaveText(/Add Employee/);

        // 3. Completează First name = "Popescu"
        await page.fill('input[name="firstName"]', 'Popescu');
        await expect(page.locator('input[name="firstName"]')).toHaveValue('Popescu');

        // 4. Completează Middle name = "Andrei"
        await page.fill('input[name="middleName"]', 'Andrei');
        await expect(page.locator('input[name="middleName"]')).toHaveValue('Andrei');

        // 5. Completează Last name = "Ionut"
        await page.fill('input[name="lastName"]', 'Ionut');
        await expect(page.locator('input[name="lastName"]')).toHaveValue('Ionut');

        //6.1 Găsește input-ul pe baza label-ului "Employee Id"
        const employeeIdField = page.locator('//*[@class="oxd-label" and text()="Employee Id"]/ancestor::div[contains(@class,"oxd-input-group")]//input');

        //6.2 așteaptă să fie vizibil și editabil
        await expect(employeeIdField).toBeVisible();
        await expect(employeeIdField).toBeEditable();

        //6.3 generează un număr random (ex: între 10000 și 99999)
        const randomId = Math.floor(10000 + Math.random() * 90000);

        //6.4 șterge valoarea existentă
        await employeeIdField.fill('');

        //6.5 adaugă valoarea random (direct number, Playwright îl transformă intern)
        await employeeIdField.fill(`${randomId}`);

        //6.6 verifică valoarea
        await expect(employeeIdField).toHaveValue(`${randomId}`);
        console.log(`Employee ID folosit în test: ${randomId}`);
 //
        // 7. Click Save
        await page.click('button:has-text("Save")');

    });
});
test.describe('Admin Page test', () => {
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        login = new Login(page);
        leftPannel = new LeftPannel(page);

        await login.goTo();
        await login.loginWithValidCredentials();
    });


    test('Deschide Admin și dă click pe Add', async () => {
        await page.locator('aside a.oxd-main-menu-item[href*="/admin"]').click();
        await page.waitForURL(/\/admin\/viewSystemUsers/i, { timeout: 15000 });
        await page.locator('button:has(.oxd-icon.bi-plus.oxd-button-icon)').click();
    })
    test('Selectează User Role = Admin și Status = Enabled', async () => {
        await page.waitForURL(/\/admin\/saveSystemUser/i, { timeout: 15000 });
        const addForm = page.locator('form').first();

        const userRole = addForm.locator('.oxd-select-text').nth(0);
        await userRole.click();
        await page.locator('.oxd-select-dropdown .oxd-select-option:has-text("Admin")').click();
        await expect(userRole.locator('.oxd-select-text-input')).toHaveText(/Admin/i, { timeout: 10000 });

        const status = addForm.locator('.oxd-select-text').nth(1);
        await status.click();
        await page.locator('.oxd-select-dropdown .oxd-select-option:has-text("Enabled")').click();
        await expect(status.locator('.oxd-select-text-input')).toHaveText(/Enabled/i, { timeout: 10000 });
    });

    test('Selectează Employee Name din dropdown și setează Username random', async () => {
        await page.waitForURL(/\/admin\/saveSystemUser/i, { timeout: 15000 });
        const addForm = page.locator('form').first();

        const empNameInput = addForm.locator('.oxd-autocomplete-wrapper input');
        await empNameInput.click();
        let options = page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option');
        if (await options.count() === 0) {
            await empNameInput.type('a');
            await options.first().waitFor({ state: 'visible', timeout: 10000 });
        }
        await options.first().click();
        await expect(empNameInput).toHaveValue(/.+/, { timeout: 10000 });

        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const rand = (n = 10) => Array.from({ length: n }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        const usernameInput = addForm.locator('//label[normalize-space()="Username"]/ancestor::div[contains(@class,"oxd-input-group")]//input');
        const username = rand(10);
        await usernameInput.fill(username);
        await expect(usernameInput).toHaveValue(username, { timeout: 10000 });
    });


    test('Setează Password și Confirm Password (puternică)', async () => {
        await page.waitForURL(/\/admin\/saveSystemUser/i, { timeout: 15000 });
        const addForm = page.locator('form').first();
        const pwd = 'Str0ng!Pass#2025';
        const passInputs = addForm.locator('input[type="password"]');
        await passInputs.nth(0).fill(pwd);
        await passInputs.nth(1).fill(pwd);
        await expect(passInputs.nth(0)).toHaveValue(pwd, { timeout: 10000 });
        await expect(passInputs.nth(1)).toHaveValue(pwd, { timeout: 10000 });
    });
    test('Click Save button', async () => {
        await page.waitForURL(/\/admin\/saveSystemUser/i, { timeout: 15000 });
        const saveBtn = page.locator('form button[type="submit"]');
        await expect(saveBtn).toBeVisible({ timeout: 10000 });
        await expect(saveBtn).toBeEnabled({ timeout: 10000 });
        await saveBtn.click();
    });


});
