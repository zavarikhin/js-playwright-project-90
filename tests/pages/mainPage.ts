import { Page, Locator } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly profileBtn: Locator;
  readonly logoutBtn: Locator;
  readonly createBtn: Locator;
  readonly usersMenuItem: Locator;
  readonly alert: Locator;
  readonly exportBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileBtn = page.getByRole("button", { name: "Profile" });
    this.logoutBtn = page.getByRole("menuitem", { name: "Logout" });
    this.createBtn = page.getByRole("link", { name: "Create" });
    this.exportBtn = page.getByRole("link", { name: "Create" });
    this.usersMenuItem = page.getByRole("menuitem", { name: "Users" });
    this.alert = page.getByRole("alert");
  }

  async logout() {
    await this.profileBtn.click();
    await this.logoutBtn.click();
  }
}
