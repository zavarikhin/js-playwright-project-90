import { Page, Locator } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly profileBtn: Locator;
  readonly logoutBtn: Locator;
  readonly createBtn: Locator;
  readonly usersMenuItem: Locator;
  readonly alert: Locator;
  readonly exportBtn: Locator;
  readonly statusesMenuItem: Locator;
  readonly elementUpdatedAlert: Locator;
  readonly elementsDeletedAlert: Locator;
  readonly undo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileBtn = page.getByRole("button", { name: "Profile" });
    this.logoutBtn = page.getByRole("menuitem", { name: "Logout" });
    this.createBtn = page.getByRole("link", { name: "Create" });
    this.exportBtn = page.getByRole("button", { name: "Export" });
    this.usersMenuItem = page.getByRole("menuitem", { name: "Users" });
    this.statusesMenuItem = page.getByRole("menuitem", {
      name: "Task statuses",
    });
    this.alert = page.getByRole("alert");
    this.elementUpdatedAlert = page.getByText("Element updatedUndo");
    this.elementsDeletedAlert = page.getByText('deleted')
    this.undo = page.getByRole("button", { name: "Undo" });
  }

  async logout() {
    await this.profileBtn.click();
    await this.logoutBtn.click();
  }
}
