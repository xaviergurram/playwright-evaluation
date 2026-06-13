import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import EmployeeListPage from '../pages/EmployeeListPage';

test.describe('Employee list', () => {
  test('search employee using autocomplete and collect names', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    const dashboard: DashboardPage = new DashboardPage(page);
    await dashboard.gotoPIM();

    const employeeList: EmployeeListPage = new EmployeeListPage(page);
    await employeeList.typeSequentially('joy');
    await employeeList.clickSearch();
    await employeeList.waitForResults();

    const names: string[] = await employeeList.collectNames();
    expect(names).toHaveLength(names.filter(n => n.trim()).length);
    expect(names.length).toBeGreaterThan(0);
  });
});
