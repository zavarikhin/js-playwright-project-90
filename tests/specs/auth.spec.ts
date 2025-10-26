import { test, expect } from "../fixtures/base";

test.describe("Авторизация", () => {
  test.use({ autoLogin: false });

  test("Авторизация", async ({ loginPage, mainPage }) => {
    await loginPage.goto();
    await loginPage.login();
    await expect(mainPage.profileBtn).toBeVisible();
  });
});

test.describe("Разлогин", () => {
  test("Разлогин", async ({ loginPage, mainPage }) => {
    await mainPage.logout();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInBtn).toBeVisible();
  });
});
