import { Page, Locator } from '@playwright/test';

export default class EmployeeListPage {
  readonly page: Page;
  public readonly nameAutocomplete: Locator;
  private readonly searchButton: Locator;
  private readonly resultsRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameAutocomplete = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resultsRows = page.locator('div.oxd-table-body div.oxd-table-card');
  }

  public async typeSequentially(text: string): Promise<void> {
    await this.nameAutocomplete.click();
    // Type characters sequentially to exercise autocomplete
    for (const ch of text) {
      await this.nameAutocomplete.pressSequentially(ch, { delay: 120 });
    }
  }

  public async clickSearch(): Promise<void> {
    await this.searchButton.click();
  }

  public async waitForResults(): Promise<void> {
    await this.resultsRows.first().waitFor({ state: 'visible', timeout: 5000 });
  }

  public async collectNames(): Promise<string[]> {
    const count: number = await this.resultsRows.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text: string = await this.resultsRows.nth(i).innerText();
      const cleaned: string = text.split('\n').map(s => s.trim()).filter(Boolean).join(' ');
      names.push(cleaned);
    }
    return names;
  }
}
