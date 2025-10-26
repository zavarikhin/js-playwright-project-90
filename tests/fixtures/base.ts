import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import MainPage from "../pages/basePage";
import UsersPage from "../pages/usersPage";
import StatusesPage from "../pages/statusesPage";
import LablesPage from "../pages/labelsPage";

export const test = base.extend<{
  loginPage: LoginPage;
  mainPage: MainPage;
  usersPage: UsersPage;
  statusesPage: StatusesPage;
  labelsPage: LablesPage;
  autoLogin: boolean;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
  statusesPage: async ({ page }, use) => {
    await use(new StatusesPage(page));
  },
  labelsPage: async ({ page }, use) => {
    await use(new LablesPage(page));
  },

  autoLogin: [
    async ({ loginPage }, use) => {
      await loginPage.goto();
      await loginPage.login();
      await use(true);
    },
    { auto: true }, // эта строчка делает выполнение автоматическим перед каждым тестом
  ],
});

export { expect } from "@playwright/test";
