import { Page, Locator } from "@playwright/test";

export default class TableWidget {
  readonly itself: Locator;
  readonly headOfTable: Locator;
  readonly bodyOftable: Locator;
  readonly row: Locator;
  readonly selectAllCheckbox: Locator;
  readonly rowCheckbox: Locator;
  readonly actionsToolbar: Record<string, Locator>;

  constructor(page: Page, tableSelector: string) {
    // Таблица
    this.itself = page.locator(tableSelector);
    this.headOfTable = this.itself.locator("//thead");
    this.bodyOftable = this.itself.locator("//tbody");
    this.row = this.bodyOftable.locator("//tr");
    this.selectAllCheckbox = page.getByRole("checkbox", { name: "Select all" });
    this.rowCheckbox = this.row.locator('//*[@type="checkbox"]');

    // Тулбар при выборе чекбоксом
    this.actionsToolbar = {
      itself: page.locator('//*[@data-test="bulk-actions-toolbar"]'),
      deleteBtn: page.getByRole("button", {
        name: "Delete",
      }),
      closeBtn: page.getByRole('button', { name: 'Unselect' })
    };
  }
}
