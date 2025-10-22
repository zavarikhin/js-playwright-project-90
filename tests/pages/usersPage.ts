import { Page, Locator, expect } from "@playwright/test";
import MainPage from "./mainPage";

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export default class UsersPage extends MainPage {
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveBtn: Locator;
  readonly showBtn: Locator;
  readonly table: Locator;
  readonly headOfTable: Locator;
  readonly bodyOftable: Locator;
  readonly userRow: Locator;
  readonly selectAllCheckbox: Locator;
  readonly rowCheckbox: Locator;
  readonly actionsToolbar: Locator;
  readonly deleteBtn: Locator;
  readonly createBtnOnEmptyScreen: Locator;

  constructor(page: Page) {
    super(page);
    // Экран создания пользователя
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.showBtn = page.getByRole("link", { name: "Show" });

    // Экран со списком всех польтзователей
    this.table = page.locator("//table");
    this.headOfTable = this.table.locator("//thead");
    this.bodyOftable = this.table.locator("//tbody");
    this.userRow = this.bodyOftable.locator("//tr");
    this.selectAllCheckbox = page.getByRole("checkbox", { name: "Select all" });
    this.rowCheckbox = this.userRow.locator('//*[@type="checkbox"]');
    this.actionsToolbar = page.locator(
      '//*[@data-test="bulk-actions-toolbar"]'
    );
    this.deleteBtn = this.actionsToolbar.getByRole("button", {
      name: "Delete",
    });
    // Пустой экран пользователей
    this.createBtnOnEmptyScreen = page.getByRole('link', { name: 'Create' })
  }

  /**
   * Проверяет, что на странице отображаются данные нового пользователя.
   *
   * Метод ищет текстовые элементы с указанными значениями `email`, `firstName` и `lastName`
   * и ожидает, что они будут видимы на странице.
   *
   * @param user Объект пользователя, содержащий email, имя и фамилию.
   * @param user.email Электронная почта пользователя.
   * @param user.firstName Имя пользователя.
   * @param user.lastName Фамилия пользователя.
   *
   * @example
   * await page.checkNewUser({
   *   email: "user@example.com",
   *   firstName: "John",
   *   lastName: "Doe",
   * });
   */
  async checkNewUser({ email, firstName, lastName }: User) {
    expect(this.page.getByText(`Email${email}`)).toBeVisible();
    expect(this.page.getByText(`First name${firstName}`)).toBeVisible();
    expect(this.page.getByText(`Last name${lastName}`)).toBeVisible();
  }
}
