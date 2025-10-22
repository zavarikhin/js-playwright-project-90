import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.signInBtn = page.getByRole("button", { name: "Sign in" });
  }

  async goto() {
    await this.page.goto("http://localhost:5173");
  }

  async login() {
    await this.usernameInput.fill("test");
    await this.passwordInput.fill("12345");
    await this.signInBtn.click();
  }
}
