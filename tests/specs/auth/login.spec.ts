import { test, expect } from "../../fixtures/base";

test.use({ autoLogin: false });

test("Авторизация", async ({ loginPage, mainPage }) => {
  await loginPage.goto();
  await loginPage.login();
  await expect(mainPage.profileBtn).toBeVisible();
});
