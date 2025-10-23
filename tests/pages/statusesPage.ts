import { Page, Locator, expect } from "@playwright/test";
import MainPage from "./mainPage";

type TaskStatus = {
  name: string;
  slug: string;
};

export default class StatusesPage extends MainPage {
  readonly nameInput: Locator;
  readonly slugInput: Locator;
  readonly saveBtn: Locator;
  readonly showBtn: Locator;
  readonly table: Locator;
  readonly headOfTable: Locator;
  readonly bodyOftable: Locator;
  readonly statusRow: Locator;
  readonly selectAllCheckbox: Locator;
  readonly rowCheckbox: Locator;
  readonly actionsToolbar: Locator;
  readonly deleteBtn: Locator;
  readonly createBtnOnEmptyScreen: Locator;
  readonly nameInRow: Locator;

  constructor(page: Page) {
    super(page);
    // Форма создания статуса
    this.nameInput = page.getByRole("textbox", { name: "Name" });
    this.slugInput = page.getByRole("textbox", { name: "Slug" });
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.showBtn = page.getByRole("link", { name: "Show" });

    // Таблица со статусами
    this.table = page.locator("//table");
    this.headOfTable = this.table.locator("//thead");
    this.bodyOftable = this.table.locator("//tbody");
    this.statusRow = this.bodyOftable.locator("//tr");
    this.selectAllCheckbox = page.getByRole("checkbox", { name: "Select all" });
    this.rowCheckbox = this.statusRow.locator('//*[@type="checkbox"]');
    this.nameInRow = this.statusRow.locator("");

    // Тулбар, всплывающий при выборе элемнтов
    this.actionsToolbar = page.locator(
      '//*[@data-test="bulk-actions-toolbar"]'
    );
    this.deleteBtn = this.actionsToolbar.getByRole("button", {
      name: "Delete",
    });
    // Пустой экран статусов
    this.createBtnOnEmptyScreen = page.getByRole("link", { name: "Create" });
  }

  /**
   * Проверяет, что на странице /show отображается статус с именем, который мы передаем в метод.
   *
   * @param statuses Объект статуса, содержащий name - имя статуса
   * @param status.name Имя статуса.
   *
   * @example
   * await page.checkNewStatus({
   *   name: "Name",
   *   slug: "slug"
   * });
   */
  async checkNewStatus({ name }: TaskStatus) {
    expect(this.page.getByText(`Name${name}`)).toBeVisible();
  }

  /**
   * Проверяет, что в таблице статусов отображается статус с нужным именем.
   *
   * Ищет строку таблицы по позиции и убеждается, что в ней видны переданные
   * значения `name` и `slug`.
   *
   * @param {TaskStatus} params - Объект со свойствами статуса.
   * @param {string} params.name - Имя статуса.
   * @param {string} params.slug - Слаг (техническое имя) статуса.
   * @param {number} [position=0] - Индекс строки в таблице (по умолчанию 0 — первая строка).
   */
  async checkStatusInTable({ name, slug }: TaskStatus, position: number = 0) {
    const row = this.statusRow.nth(position);
    expect(row.getByText(`${name}`));
    expect(row.getByText(`${slug}`));
  }
}
