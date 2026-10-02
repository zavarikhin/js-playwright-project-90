import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./basePage";
import TableWidget from "../widgets/TableWidget";
import FormWidget from "../widgets/FormWidget";

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export default class UsersPage extends BasePage {
  readonly form: FormWidget;
  readonly table: TableWidget;
  readonly createBtnOnEmptyScreen: Locator;

  constructor(page: Page) {
    super(page);
    this.form = new FormWidget(page, "//form");
    this.table = new TableWidget(page, "//table");
    this.createBtnOnEmptyScreen = page.getByRole("link", { name: "Create" });
  }

  async checkNewUser({ email, firstName, lastName }: User) {
    await expect(this.page.getByText(`Email${email}`)).toBeVisible();
    await expect(
      this.page.getByText(`First name${firstName}`)
    ).toBeVisible();
    await expect(
      this.page.getByText(`Last name${lastName}`)
    ).toBeVisible();
  }

  async checkUserInTable(
    { email, firstName, lastName }: User,
    position: number = 0
  ) {
    const row = this.table.row.nth(position);
    await expect(row.getByText(`${email}`)).toBeVisible();
    await expect(row.getByText(`${firstName}`)).toBeVisible();
    await expect(row.getByText(`${lastName}`)).toBeVisible();
  }
}
