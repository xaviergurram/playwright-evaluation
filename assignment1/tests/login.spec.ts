import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

test.describe('Login flows', () => {
  test('successful login navigates to dashboard', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    const dashboard: DashboardPage = new DashboardPage(page);
    await dashboard.isAt();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('failed login shows error message', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    const err: string = await loginPage.getErrorMessage();
    expect(err.toLowerCase()).toContain('invalid');
  });
});
