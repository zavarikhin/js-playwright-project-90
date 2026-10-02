import { test, expect } from "../fixtures/base";

test.describe("Авторизация", () => {
  test.use({ autoLogin: false });

  test("Авторизация", async ({ loginPage, basePage }) => {
    await loginPage.goto();
    await loginPage.login();
    await expect(basePage.profileBtn).toBeVisible();
  });
});

test.describe("Разлогин", () => {
  test("Разлогин", async ({ loginPage, basePage }) => {
    await basePage.logout();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInBtn).toBeVisible();
  });
});
