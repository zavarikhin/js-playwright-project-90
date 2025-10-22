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

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.showBtn = page.getByRole("link", { name: "Show" });
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
