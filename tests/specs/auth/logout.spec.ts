import { test, expect } from "../../fixtures/base";

test("Разлогин", async ({ loginPage, mainPage }) => {
  await mainPage.logout();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInBtn).toBeVisible();
});
