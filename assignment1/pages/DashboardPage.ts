import { Page, Locator } from '@playwright/test';

export default class DashboardPage {
  readonly page: Page;
  private readonly pimNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimNav = page.getByRole('link', { name: 'PIM' });
  }

  public async isAt(): Promise<void> {
    await this.page.waitForURL(/.*dashboard/);
  }

  public async gotoPIM(): Promise<void> {
    await this.pimNav.click();
    await this.page.waitForLoadState('networkidle');
  }
}
