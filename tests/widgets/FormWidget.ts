import { Page, Locator } from "@playwright/test";

export default class FormWidget {
  readonly form: Locator;
  readonly showBtn: Locator;
  readonly saveBtn: Locator;
  readonly deleteBtn: Locator;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly statusNameInput: Locator;
  readonly statusSlugInput: Locator;
  readonly labelNameInput: Locator;

  constructor(page: Page, formSelector: string) {
    this.form = page.locator(formSelector);
    // кнопки
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.showBtn = page.getByRole("link", { name: "Show" });
    this.deleteBtn = page.getByRole("button", { name: "Delete" });
    // форма создания пользователя
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    // форма создания статуса
    this.statusNameInput = page.getByRole("textbox", { name: "Name" });
    this.statusSlugInput = page.getByRole("textbox", { name: "Slug" });
    // форма создания лейбла
    this.labelNameInput = page.getByRole("textbox", { name: "Name" });
  }
}
