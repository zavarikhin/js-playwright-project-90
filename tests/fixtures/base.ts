import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import BasePage from "../pages/basePage";
import UsersPage from "../pages/usersPage";
import StatusesPage from "../pages/statusesPage";
import LablesPage from "../pages/labelsPage";
import TasksPages from "../pages/tasksPage";

export const test = base.extend<{
  loginPage: LoginPage;
  basePage: BasePage;
  usersPage: UsersPage;
  statusesPage: StatusesPage;
  labelsPage: LablesPage;
  tasksPage: TasksPages;
  autoLogin: boolean;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
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
  tasksPage: async ({ page }, use) => {
    await use(new TasksPages(page));
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
