import { Page, Locator } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly profileBtn: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileBtn = page.getByRole('button', { name: 'Profile' });
    this.logoutBtn = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await this.profileBtn.click();
    await this.logoutBtn.click();
  }
}
