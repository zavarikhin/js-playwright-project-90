import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage"
import MainPage from "../pages/mainPage";
import UsersPage from "../pages/usersPage";
import StatusesPage from "../pages/statusesPage";

export const test = base.extend<{
  loginPage: LoginPage;
  mainPage: MainPage;
  usersPage: UsersPage;
  statusesPage: StatusesPage
  autoLogin: boolean
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
  statusesPage: async ({page}, use) => {
    await use(new StatusesPage(page));
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