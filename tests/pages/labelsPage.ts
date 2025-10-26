import { Page, Locator, expect } from "@playwright/test";
import MainPage from "./basePage";
import FormWidget from "../widgets/FormWidget";
import TableWidget from "../widgets/TableWidget";

type Label = {
  name: string;
};

export default class LablesPage extends MainPage {
  readonly form: FormWidget;
  readonly table: TableWidget;
  readonly createBtnOnEmptyScreen: Locator;

  constructor(page: Page) {
    super(page);
    this.form = new FormWidget(page, "//form");
    this.table = new TableWidget(page, "//table");
    this.createBtnOnEmptyScreen = page.getByRole("link", { name: "Create" });
  }

  async checkNewLabel({ name }: Label) {
    expect(this.page.getByText(`Name${name}`)).toBeVisible();
  }

  async checkLabelInTable({ name }: Label, position: number = 0) {
    const row = this.table.row.nth(position);
    expect(row.getByText(`${name}`));
  }
}
