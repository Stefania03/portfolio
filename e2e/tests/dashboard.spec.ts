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

        // 7. Click Save
        await page.click('button:has-text("Save")');

    });
});

